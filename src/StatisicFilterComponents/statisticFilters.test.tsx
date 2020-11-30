import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatisticFilters from "./statisticFilters";

const setStatisticFilter = jest.fn();

describe("StatisticFilters components", () => {
  test("should be render topN", () => {
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: 0 } }}
        changeFilter={() => {}}
      />
    );
    const topNElement = screen.getByLabelText(/topN/i);

    expect(topNElement).toBeInTheDocument();
    expect((topNElement as HTMLInputElement).value).toEqual("0");
  });

  test("should be render percentile", () => {
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: 0, max: 100 } }}
        changeFilter={() => {}}
      />
    );
    const firstPercentileElement = screen.getByLabelText(/inputfirst/i);
    const secondPercentileElement = screen.getByLabelText(/inputsecond/i);

    expect(firstPercentileElement).toBeInTheDocument();
    expect(secondPercentileElement).toBeInTheDocument();
    expect((firstPercentileElement as HTMLInputElement).value).toEqual("0");
    expect((secondPercentileElement as HTMLInputElement).value).toEqual("100");
  });

  test("should be trigger changeFilter", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: 0 } }}
        changeFilter={changeFilter}
      />
    );
    const topNElement = screen.getByLabelText(/topN/i);

    fireEvent.change(topNElement, { target: { value: "10" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "topN",
      option: { value: 10 },
    });
  });

  test("should  render range", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: 0, max: 100 } }}
        changeFilter={changeFilter}
      />
    );
    const rangeElement = screen.getByLabelText(/select/i);

    fireEvent.change(rangeElement, { target: { value: "range" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "range",
      option: { min: 0, max: 100 },
    });
  });
});
