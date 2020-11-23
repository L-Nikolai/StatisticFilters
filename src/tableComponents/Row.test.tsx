import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BaseRow, { RowInterface } from "./Row";

const Row = (props: RowInterface): React.ReactElement => (
  <table>
    <tbody>
      <BaseRow {...props} />
    </tbody>
  </table>
);

describe("Row", () => {
  test("should be rendered", () => {
    render(
      <Row data={[{ value: 2, highlight: false }]} handleClick={() => {}} />
    );
    const rowElement = screen.getByText(/2/i);

    expect(rowElement).toBeInTheDocument();
    expect((rowElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("cell")
    );
  });

  test("should be color if highlight true or false", () => {
    render(
      <Row
        data={[
          { value: 90, highlight: true },
          { value: 10, highlight: false },
        ]}
        handleClick={() => {}}
      />
    );
    const rowElements = screen.queryAllByRole(/cell/i);

    expect((rowElements[0] as HTMLInputElement).style.color).toEqual("blue");
    expect((rowElements[1] as HTMLInputElement).style.color).toEqual("grey");
  });

  test("should be clicked with cell", () => {
    const handleClick = jest.fn();
    render(
      <Row data={[{ value: 2, highlight: false }]} handleClick={handleClick} />
    );
    const rowElement = screen.getByLabelText(/cell/i);

    fireEvent.click(rowElement);

    expect(handleClick.mock.calls.length).toEqual(1);
  });

  test("should be rendered Row", () => {
    render(
      <Row data={[{ value: 2, highlight: false }]} handleClick={() => {}} />
    );
    const renderCellElement = screen.getByLabelText(/row/i);

    expect(renderCellElement).toBeInTheDocument();
    expect((renderCellElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("row")
    );
  });
});
