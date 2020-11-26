import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import View from "./View";

describe("View topN", () => {
  test("should be rendered table", () => {
    render(
      <View
        topN={1}
        changeTopN={() => {}}
        minRange={-100}
        maxRange={100}
        changeRange={() => {}}
        statisticFilter={"topN"}
        firstPercentileValue={0}
        secondPercentileValue={100}
        changePercentile={() => {}}
      />
    );

    const viewElement = screen.getByTitle(/table/);

    expect(viewElement).toBeInTheDocument();
  });

  test("should be rendered table 10x10", () => {
    render(
      <View
        topN={1}
        changeTopN={() => {}}
        minRange={-100}
        maxRange={100}
        changeRange={() => {}}
        statisticFilter={"topN"}
        firstPercentileValue={0}
        secondPercentileValue={100}
        changePercentile={() => {}}
      />
    );

    const viewElement = screen.getAllByRole(/cell/);

    expect(viewElement.length).toEqual(100);
  });

  test("should be 10 elements is grey then topN = 90", () => {
    render(
      <View
        topN={90}
        changeTopN={() => {}}
        minRange={-100}
        maxRange={100}
        changeRange={() => {}}
        statisticFilter={"topN"}
        firstPercentileValue={0}
        secondPercentileValue={100}
        changePercentile={() => {}}
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
        topN={3}
        changeTopN={() => {}}
        minRange={-100}
        maxRange={100}
        changeRange={() => {}}
        statisticFilter={"topN"}
        firstPercentileValue={0}
        secondPercentileValue={100}
        changePercentile={() => {}}
      />
    );
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(3);
  });
});
describe("View  range", () => {
  test("should be render highlighted table at Range ", () => {
    render(
      <View
        topN={90}
        changeTopN={() => {}}
        minRange={-100}
        maxRange={100}
        changeRange={() => {}}
        statisticFilter={"range"}
        firstPercentileValue={0}
        secondPercentileValue={100}
        changePercentile={() => {}}
      />
    );
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(100);
  });
});

describe("View  percentile", () => {
  test("should be render table at percentile ", () => {
    render(
      <View
        topN={90}
        changeTopN={() => {}}
        minRange={-100}
        maxRange={100}
        changeRange={() => {}}
        statisticFilter={"percentile"}
        firstPercentileValue={0}
        secondPercentileValue={100}
        changePercentile={() => {}}
      />
    );
    const viewElement = screen.getAllByRole(/cell/);

    expect(
      viewElement.filter((elem) => elem.style.color === "blue").length
    ).toEqual(100);
  });
});
