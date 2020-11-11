import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatisticFilters from "./statisticFilters";

describe("StatisticFilters components", () => {
  test("should  render topn", () => {
    render(<StatisticFilters />);
    const percentileelement = screen.getByLabelText(/select/i);

    fireEvent.change(percentileelement, { target: { value: "TopN" } });

    expect((percentileelement as HTMLInputElement).value).toEqual("TopN");
  });

  test("should  render percentile", () => {
    render(<StatisticFilters />);
    const percentileelement = screen.getByLabelText(/select/i);

    fireEvent.change(percentileelement, { target: { value: "Percentile" } });

    expect((percentileelement as HTMLInputElement).value).toEqual("Percentile");
  });
});
