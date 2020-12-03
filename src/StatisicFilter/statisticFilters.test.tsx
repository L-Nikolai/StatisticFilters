import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatisticFilters from "./statisticFilters";

describe("StatisticFilters component. TopN behavier", () => {
  test("should be selected topN", () => {
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: 0 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );
    const selectElement = screen.getByLabelText(/select/i);

    expect((selectElement as HTMLInputElement).value).toEqual("topN");
  });

  test("should be rendered", () => {
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: 0 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );
    const topNElement = screen.getByLabelText(/topN/i);

    expect(topNElement).toBeInTheDocument();
    expect((topNElement as HTMLInputElement).value).toEqual("0");
    expect((topNElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile")
    );
  });

  test("should be invalid when value is negativ", () => {
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: -5 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );
    const topNElement = screen.getByLabelText(/topN/i);

    expect((topNElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should change value", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: 1 } }}
        changeFilter={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "12" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "topN",
      option: { value: 12 },
    });
  });
});

describe("StatisticFilters component. Percentile behavier", () => {
  test("should be invalid then value < min && value >max", () => {
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: -1, max: 110 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );
    const rangeFirstElement = screen.getByLabelText(/inputfirst/i);
    const rangeSecondElement = screen.getByLabelText(/inputsecond/i);

    expect((rangeFirstElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
    expect((rangeSecondElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should be rendered", () => {
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: 0, max: 100 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );
    const firstPercentileElement = screen.getByLabelText(/inputfirst/i);
    const secondPercentileElement = screen.getByLabelText(/inputsecond/i);

    expect(firstPercentileElement).toBeInTheDocument();
    expect(secondPercentileElement).toBeInTheDocument();
    expect((firstPercentileElement as HTMLInputElement).value).toEqual("0");
    expect((secondPercentileElement as HTMLInputElement).value).toEqual("100");
    expect((firstPercentileElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile ")
    );
    expect((secondPercentileElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile ")
    );
  });

  test("should be change value", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: 0, max: 100 } }}
        changeFilter={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const percentileFirstElement = screen.getByLabelText(/inputfirst/i);
    const percentileSecondElement = screen.getByLabelText(/inputsecond/i);

    fireEvent.change(percentileFirstElement, { target: { value: "10" } });
    fireEvent.change(percentileSecondElement, { target: { value: "90" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "percentile",
      option: { min: 10, max: 100 },
    });
    expect(changeFilter.mock.calls[1][0]).toEqual({
      type: "percentile",
      option: { min: 0, max: 90 },
    });
  });

  test("shoold be is ivalid when input1 > input2", () => {
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: 91, max: 88 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );
    const firstPercentileElement = screen.getByLabelText(/inputfirst/i);

    expect((firstPercentileElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });
});

describe("StatisticFilters component. Range behavier", () => {
  test("should  render range", () => {
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: -100, max: 100 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );
    const rangeElement = screen.getByLabelText(/firstInputRange/i);

    expect(rangeElement).toBeInTheDocument();
    expect((rangeElement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("shoold be change value", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: -100, max: 100 } }}
        changeFilter={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const rangeMinElement = screen.getByLabelText(/firstInputRange/);
    const rangeMaxElement = screen.getByLabelText(/secondInputRange/);

    fireEvent.change(rangeMinElement, { target: { value: "-50" } });
    fireEvent.change(rangeMaxElement, { target: { value: "50" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "range",
      option: { min: -50, max: 100 },
    });
    expect(changeFilter.mock.calls[1][0]).toEqual({
      type: "range",
      option: { min: -100, max: 50 },
    });
  });

  test("shoold be ivalid then minRange > maxRange", () => {
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: 90, max: 80 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );

    const rangeElementFirst = screen.getByLabelText(/firstInputRange/i);

    expect((rangeElementFirst as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should be invalid then value < min && value >max", () => {
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: -101, max: 120 } }}
        changeFilter={() => {}}
        minRange={-100}
        maxRange={100}
      />
    );
    const rangeFirstElement = screen.getByLabelText(/firstInputRange/i);
    const rangeSecondElement = screen.getByLabelText(/secondInputRange/i);

    expect((rangeFirstElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
    expect((rangeSecondElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });
});

describe("StatisticFilters component", () => {
  test("should be render topN when value = topN", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: 0, max: 100 } }}
        changeFilter={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const selectElement = screen.getByLabelText(/select/i);

    fireEvent.change(selectElement, { target: { value: "topN" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "topN",
      option: { value: 0 },
    });
  });

  test("should be render topN when value === range", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: -100, max: 100 } }}
        changeFilter={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const selectElement = screen.getByLabelText(/select/i);

    fireEvent.change(selectElement, { target: { value: "range" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "range",
      option: { min: -100, max: 100 },
    });
  });

  test("should be render topN when value === percentile", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: 0, max: 100 } }}
        changeFilter={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const selectElement = screen.getByLabelText(/select/i);

    fireEvent.change(selectElement, { target: { value: "percentile" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "percentile",
      option: { min: 0, max: 100 },
    });
  });
});
