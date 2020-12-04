import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

    const viewElements = screen.getAllByRole(/cell/);

    expect(viewElements.length).toEqual(100);
  });

  test("should be 10 elements is grey then topN = 90", () => {
    render(
      <View
        filter={{ type: "topN", option: { value: 90 } }}
        changeFilter={() => {}}
      />
    );
    const viewElements = screen.getAllByRole(/cell/);

    expect(
      viewElements.filter((elem) => elem.style.color === "grey").length
    ).toEqual(10);
  });

  test("should be 3 elements is blye then topN =3", () => {
    render(
      <View
        filter={{ type: "topN", option: { value: 3 } }}
        changeFilter={() => {}}
      />
    );
    const viewElements = screen.getAllByRole(/cell/);

    expect(
      viewElements.filter((elem) => elem.style.color === "blue").length
    ).toEqual(3);
  });

  test("should trigger changeFilter then click on cell", () => {
    const handleClick = jest.fn();
    render(
      <View
        filter={{ type: "topN", option: { value: 3 } }}
        changeFilter={handleClick}
      />
    );
    const viewElement = screen.getAllByLabelText(/cell/)[0];

    fireEvent.click(viewElement, { currentTarget: { innerText: "1" } });

    expect(handleClick.mock.calls.length).toEqual(1);
    expect(handleClick.mock.calls[0][0]).toEqual({
      type: "topN",
      option: { value: 0 },
    });
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

  test("should be colored one element then percentile(99,100)", () => {
    render(
      <View
        filter={{ type: "percentile", option: { min: 99, max: 100 } }}
        changeFilter={() => {}}
      />
    );
    const viewElements = screen.getAllByRole(/cell/);

    expect(
      viewElements.filter((elem) => elem.style.color === "blue").length
    ).toEqual(1);
  });
});
