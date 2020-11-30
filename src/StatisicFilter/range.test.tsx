import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Range from "./range";

describe("Range first input component", () => {
  test("should be render  ", () => {
    render(<Range minRange={-100} maxRange={90} changeRange={() => {}} />);
    const rangeElement = screen.getByLabelText(/firstInputRange/i);

    expect(rangeElement).toBeInTheDocument();
    expect((rangeElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile")
    );
  });

  test("shoold be change value", () => {
    render(<Range minRange={-100} maxRange={90} changeRange={() => {}} />);
    const rangeElement = screen.getByLabelText(/firstInputRange/);

    fireEvent.change(rangeElement, { target: { value: "5" } });

    expect((rangeElement as HTMLInputElement).value).toEqual("5");
    expect((rangeElement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should be invalide state when value is negative", () => {
    render(<Range minRange={-100} maxRange={90} changeRange={() => {}} />);
    const rangeElement = screen.getByLabelText(/firstInputRange/i);

    fireEvent.change(rangeElement, { target: { value: "-101" } });

    expect((rangeElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });
});

describe("Range second input component", () => {
  test("should be render  ", () => {
    render(<Range minRange={-100} maxRange={90} changeRange={() => {}} />);
    const RangeElement = screen.getByLabelText(/secondInputRange/i);

    expect(RangeElement).toBeInTheDocument();
    expect((RangeElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile")
    );
  });

  test("shoold be change value", () => {
    render(<Range minRange={-100} maxRange={90} changeRange={() => {}} />);
    const rangeElement = screen.getByLabelText(/secondInputRange/);

    fireEvent.change(rangeElement, { target: { value: "50" } });

    expect((rangeElement as HTMLInputElement).value).toEqual("50");
    expect((rangeElement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should be invalide state when value is negative", () => {
    render(<Range minRange={-100} maxRange={90} changeRange={() => {}} />);
    const rangeElement = screen.getByLabelText(/secondInputRange/i);

    fireEvent.change(rangeElement, { target: { value: "101" } });

    expect((rangeElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });
});

describe("Checked inputs ", () => {
  test("shoold be ivalid then minRange > maxRange", () => {
    render(<Range minRange={50} maxRange={40} changeRange={() => {}} />);
    const rangeElementFirst = screen.getByLabelText(/firstInputRange/i);
    const rangeElementSecond = screen.getByLabelText(/secondInputRange/i);

    fireEvent.change(rangeElementFirst, { target: { value: "50" } });
    fireEvent.change(rangeElementSecond, { target: { value: "40" } });

    expect((rangeElementFirst as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });
});
