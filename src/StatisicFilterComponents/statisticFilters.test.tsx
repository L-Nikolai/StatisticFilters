import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatisticFilters from "./statisticFilters";

const setStatisticFilter = jest.fn();

describe("StatisticFilters components", () => {
  test("should  render topN", () => {
    render(
      <StatisticFilters
        changeTopN={() => {}}
        topN={10}
        statisticFilter="topN"
        setStatisticFilter={setStatisticFilter}
      />
    );
    const percentileelement = screen.getByLabelText(/select/i);

    fireEvent.change(percentileelement, { target: { value: "topN" } });

    expect(setStatisticFilter.mock.calls[0][0]).toEqual("topN");
  });

  test("should  render percentile", () => {
    render(
      <StatisticFilters
        changeTopN={() => {}}
        topN={10}
        statisticFilter="percentile"
        setStatisticFilter={setStatisticFilter}
      />
    );
    const percentileelement = screen.getByLabelText(/select/i);

    fireEvent.change(percentileelement, { target: { value: "percentile" } });

    expect(setStatisticFilter.mock.calls[0][0]).toEqual("percentile");
  });

  test("should  render range", () => {
    render(
      <StatisticFilters
        changeTopN={() => {}}
        topN={10}
        statisticFilter="range"
        setStatisticFilter={setStatisticFilter}
      />
    );
    const percentileelement = screen.getByLabelText(/select/i);

    fireEvent.change(percentileelement, { target: { value: "range" } });

    expect(setStatisticFilter.mock.calls[0][0]).toEqual("range");
  });
});
