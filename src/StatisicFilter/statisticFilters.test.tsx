import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatisticFilters from "./statisticFilters";

describe("StatisticFilters component. TopN behavier", () => {
  test("should be selected topN", () => {
    render(
      <StatisticFilters
        state={{
          type: "topN",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
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
        state={{
          type: "topN",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
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
        state={{
          type: "topN",
          topN: -1,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
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
        state={{
          type: "topN",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "12" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "changeTopN",
      payload: 12,
    });
  });
});

describe("StatisticFilters component. Percentile behavier", () => {
  test("should be invalid then value < min && value >max", () => {
    render(
      <StatisticFilters
        state={{
          type: "percentile",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
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
        state={{
          type: "percentile",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 100,
        }}
        dispath={() => {}}
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
        state={{
          type: "percentile",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const percentileFirstElement = screen.getByLabelText(/inputfirst/i);
    const percentileSecondElement = screen.getByLabelText(/inputsecond/i);

    fireEvent.change(percentileFirstElement, { target: { value: "10" } });
    fireEvent.change(percentileSecondElement, { target: { value: "90" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "changeValues",
      payload: [10, 0],
    });
    expect(changeFilter.mock.calls[1][0]).toEqual({
      type: "changeValues",
      payload: [0, 90],
    });
  });

  test("shoold be is ivalid when input1 > input2", () => {
    render(
      <StatisticFilters
        state={{
          type: "percentile",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 1,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
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
        state={{
          type: "range",
          topN: 0,
          minRangeValue: -100,
          maxRangeValue: 100,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
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
        state={{
          type: "range",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const rangeMinElement = screen.getByLabelText(/firstInputRange/);
    const rangeMaxElement = screen.getByLabelText(/secondInputRange/);

    fireEvent.change(rangeMinElement, { target: { value: "-50" } });
    fireEvent.change(rangeMaxElement, { target: { value: "50" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "changeValues",
      payload: [-50, 0],
    });
    expect(changeFilter.mock.calls[1][0]).toEqual({
      type: "changeValues",
      payload: [0, 50],
    });
  });

  test("shoold be ivalid then minRange > maxRange", () => {
    render(
      <StatisticFilters
        state={{
          type: "range",
          topN: 0,
          minRangeValue: 10,
          maxRangeValue: 9,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
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
        state={{
          type: "range",
          topN: 0,
          minRangeValue: -101,
          maxRangeValue: 105,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
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
  test("should be render TopN when value = topN", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        state={{
          type: "range",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const selectElement = screen.getByLabelText(/select/i);

    fireEvent.change(selectElement, { target: { value: "topN" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "changeType",
      payload: "topN",
    });
  });

  test("should be render Range when value === range", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        state={{
          type: "topN",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const selectElement = screen.getByLabelText(/select/i);

    fireEvent.change(selectElement, { target: { value: "range" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "changeType",
      payload: "range",
    });
  });

  test("should be render Percentile when value === percentile", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        state={{
          type: "topN",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={changeFilter}
        minRange={-100}
        maxRange={100}
      />
    );
    const selectElement = screen.getByLabelText(/select/i);

    fireEvent.change(selectElement, { target: { value: "percentile" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "changeType",
      payload: "percentile",
    });
  });
});
