import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatisticFilters from "./statisticFilters";

const setStatisticFilter = jest.fn();

describe("StatisticFilters components", () => {
  test("should  render topn", () => {
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
});
