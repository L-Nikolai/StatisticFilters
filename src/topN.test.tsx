import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TopN from "./topN";

describe("Top N component", () => {
  test("should be rendered", () => {
    render(<TopN />);
    const topNelement = screen.getByLabelText(/topn/i);

    expect(topNelement).toBeInTheDocument();
    expect((topNelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("top")
    );
  });

  test("should be 1 default value", () => {
    render(<TopN />);
    const topNelement = screen.getByLabelText(/topn/i);

    expect((topNelement as HTMLInputElement).value).toEqual("1");
  });

  test("should change value", () => {
    render(<TopN />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "12" } });

    expect((topNelement as HTMLInputElement).value).toEqual("12");
    expect((topNelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should invalid state when value is negative", () => {
    render(<TopN />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "-" } });
    fireEvent.change(topNelement, { target: { value: "-5" } });

    expect((topNelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should reset invalid state when value is valid", () => {
    render(<TopN />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "-5" } });
    fireEvent.change(topNelement, { target: { value: "5" } });

    expect((topNelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should be valid when valie is one", () => {
    render(<TopN />);
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "-1" } });
    fireEvent.change(topNelement, { target: { value: "1" } });

    expect((topNelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });
});
