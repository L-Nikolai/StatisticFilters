import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table topN", () => {
  test("should be rendered table", () => {
    render(
      <Table
        state={{
          type: "topN",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
      />
    );

    const tableElement = screen.getByTitle(/table/);

    expect(tableElement).toBeInTheDocument();
  });

  test("should be rendered table 10x10", () => {
    render(
      <Table
        state={{
          type: "topN",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
      />
    );

    const tableElements = screen.getAllByRole(/cell/);

    expect(tableElements.length).toEqual(100);
  });

  test("should be 10 elements is grey then topN = 90", () => {
    render(
      <Table
        state={{
          type: "topN",
          topN: 90,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
      />
    );
    const tableElements = screen.getAllByRole(/cell/);

    expect(
      tableElements.filter((elem) => elem.style.color === "grey").length
    ).toEqual(10);
  });

  test("should be 3 elements is blye then topN =3", () => {
    render(
      <Table
        state={{
          type: "topN",
          topN: 3,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
      />
    );
    const tableElements = screen.getAllByRole(/cell/);

    expect(
      tableElements.filter((elem) => elem.style.color === "blue").length
    ).toEqual(3);
  });

  test("should trigger changeFilter then click on cell", () => {
    const handleClick = jest.fn();
    render(
      <Table
        state={{
          type: "topN",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={handleClick}
      />
    );
    const tableElement = screen.getAllByLabelText(/cell/)[0];

    fireEvent.click(tableElement, { currentTarget: { innerText: "1" } });

    expect(handleClick.mock.calls.length).toEqual(1);
    expect(handleClick.mock.calls[0][0]).toEqual({
      type: "changeTopN",
      payload: 0,
    });
  });
});
describe("Table  range", () => {
  test("should be render highlighted table at Range", () => {
    render(
      <Table
        state={{
          type: "range",
          topN: 0,
          minRangeValue: -100,
          maxRangeValue: 100,
          minPercentileValue: 0,
          maxPercentileValue: 0,
        }}
        dispath={() => {}}
      />
    );
    const tableElement = screen.getAllByRole(/cell/);

    expect(
      tableElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(100);
  });
});

describe("Table  percentile", () => {
  test("should be render table at percentile", () => {
    render(
      <Table
        state={{
          type: "percentile",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 0,
          maxPercentileValue: 100,
        }}
        dispath={() => {}}
      />
    );
    const tableElement = screen.getAllByRole(/cell/);

    expect(
      tableElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(100);
  });

  test("should be colored one element then percentile(99,100)", () => {
    render(
      <Table
        state={{
          type: "percentile",
          topN: 0,
          minRangeValue: 0,
          maxRangeValue: 0,
          minPercentileValue: 99,
          maxPercentileValue: 100,
        }}
        dispath={() => {}}
      />
    );
    const tableElements = screen.getAllByRole(/cell/);

    expect(
      tableElements.filter((elem) => elem.style.color === "blue").length
    ).toEqual(1);
  });
});
