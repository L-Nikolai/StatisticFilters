import React from "react";
import { render, screen} from "@testing-library/react";
import View from "./View";

describe("View topN", () => {
  test("should be rendered table", () => {
    render(
      <View
        filter={{ type: "topN", option: { value: 0 } }}
        changeFilter={() => {}}
      />
    );

    const viewElement = screen.getByTitle(/table/);

    expect(viewElement).toBeInTheDocument();
  });

  test("should be rendered table 10x10", () => {
    render(
      <View
        filter={{ type: "topN", option: { value: 0 } }}
        changeFilter={() => {}}
      />
    );

    const viewElement = screen.getAllByRole(/cell/);

    expect(viewElement.length).toEqual(100);
  });

  test("should be 10 elements is grey then topN = 90", () => {
    render(
      <View
        filter={{ type: "topN", option: { value: 90 } }}
        changeFilter={() => {}}
      />
    );
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "grey").length
    ).toEqual(10);
  });

  test("should be 3 elements is blye then topN =3", () => {
    render(
      <View
        filter={{ type: "topN", option: { value: 3 } }}
        changeFilter={() => {}}
      />
    );
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(3);
  });
});
describe("View  range", () => {
  test("should be render highlighted table at Range", () => {
    render(
      <View
        filter={{ type: "range", option: { min: -100, max: 100 } }}
        changeFilter={() => {}}
      />
    );
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(100);
  });
});

describe("View  percentile", () => {
  test("should be render table at percentile", () => {
    render(
      <View
        filter={{ type: "percentile", option: { min: 0, max: 100 } }}
        changeFilter={() => {}}
      />
    );
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(100);
  });
});
