import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TopN from "./topN";

const changeValue = jest.fn();

describe("Top N component", () => {
  test("should be rendered", () => {
    render(<TopN value={12} changeValue={() => {}} />);
    const topNelement = screen.getByLabelText(/topn/i);

    expect(topNelement).toBeInTheDocument();
    expect((topNelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile")
    );
  });

  test("should be 1 default value", () => {
    render(<TopN value={1} changeValue={() => {}} />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "-5" } });

    expect((topNelement as HTMLInputElement).value).toEqual("1");
  });

  test("should change value", () => {
    render(<TopN value={10} changeValue={changeValue} />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "12" } });
    fireEvent.change(topNelement, { target: { value: "4" } });

    expect(changeValue.mock.calls[0][0]).toEqual(12);
    expect(changeValue.mock.calls[1][0]).toEqual(4);
    expect((topNelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should invalid state when value is negative", () => {
    render(<TopN value={10} changeValue={changeValue} />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "-5" } });

    expect(changeValue.mock.calls[0][0]).toEqual(-5);
    expect((topNelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should reset invalid state when value is valid", () => {
    render(<TopN value={10} changeValue={changeValue} />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "-5" } });
    fireEvent.change(topNelement, { target: { value: "5" } });

    expect(changeValue.mock.calls[0][0]).toEqual(-5);
    expect(changeValue.mock.calls[1][0]).toEqual(5);
    expect((topNelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should be valid when valie is one", () => {
    render(<TopN value={10} changeValue={() => {}} />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "-1" } });
    fireEvent.change(topNelement, { target: { value: "1" } });

    expect((topNelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });
});
