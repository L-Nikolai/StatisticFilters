import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Percentile from "./percentile";

describe("Percentile first component", () => {
  test("should be rendered", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputfirst/i);

    expect(percentileelement).toBeInTheDocument();
    expect((percentileelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile ")
    );
  });

  test("should change value", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputfirst/i);

    fireEvent.change(percentileelement, { target: { value: "10" } });

    expect((percentileelement as HTMLInputElement).value).toEqual("10");
    expect((percentileelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should invalide state when value isnegative", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputfirst/i);

    fireEvent.change(percentileelement, { target: { value: "-6" } });

    expect((percentileelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should reset invalid state when value is valid", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputfirst/i);

    fireEvent.change(percentileelement, { target: { value: "-5" } });
    fireEvent.change(percentileelement, { target: { value: "6" } });

    expect((percentileelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });
});

describe("Percentile second component", () => {
  test("should be rendered", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputsecond/i);

    expect(percentileelement).toBeInTheDocument();
    expect((percentileelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile ")
    );
  });

  test("should change value", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputsecond/i);

    fireEvent.change(percentileelement, { target: { value: "10" } });

    expect((percentileelement as HTMLInputElement).value).toEqual("10");
    expect((percentileelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should invalide state when value isnegative", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputsecond/i);

    fireEvent.change(percentileelement, { target: { value: "-6" } });

    expect((percentileelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should reset invalid state when value is valid", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputsecond/i);

    fireEvent.change(percentileelement, { target: { value: "-5" } });
    fireEvent.change(percentileelement, { target: { value: "6" } });

    expect((percentileelement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });
});

describe("Checked inputs ", () => {
  test("input1 > input2 ?", () => {
    render(<Percentile />);
    const percentileelement = screen.getByLabelText(/inputfirst/i);
    const percentileelementsecond = screen.getByLabelText(/inputsecond/i);

    fireEvent.change(percentileelement, { target: { value: "91" } });
    fireEvent.change(percentileelementsecond, { target: { value: "88" } });

    expect((percentileelement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });
});
