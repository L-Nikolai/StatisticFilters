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

  test("should be 10 elements is grey then topN = 90", () => {
    render(<View topN={90} changeTopN={() => {}} />);
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "grey").length
    ).toEqual(10);
  });

  test("should be 3 elements is blye then topN =3", () => {
    render(<View topN={3} changeTopN={() => {}} />);
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(3);
  });
});
