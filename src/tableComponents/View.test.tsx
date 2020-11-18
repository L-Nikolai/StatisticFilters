import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import View from "./View";

describe("View", () => {
  test("should be rendered table", () => {
    render(<View topN={1} changeTopN={() => {}} />);

    const viewElement = screen.getByTitle(/table/);

    expect(viewElement).toBeInTheDocument();
  });

  test("should be rendered table 10x10", () => {
    render(<View topN={1} changeTopN={() => {}} />);

    const viewElement = screen.getAllByRole(/cell/);

    expect(viewElement.length).toEqual(100);
  });

  test("All elements is grey", () => {
    render(<View topN={0} changeTopN={() => {}} />);
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "grey").length
    ).toEqual(100);
  });

  test("10 elements is blye", () => {
    render(<View topN={10} changeTopN={() => {}} />);
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(10);
  });
});
