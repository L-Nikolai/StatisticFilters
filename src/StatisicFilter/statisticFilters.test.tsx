import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatisticFilters from "./statisticFilters";

describe("StatisticFilters component. TopN behavier", () => {
  test("should be rendered", () => {
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: 0 } }}
        changeFilter={() => {}}
      />
    );
    const topNElement = screen.getByLabelText(/topN/i);

    expect(topNElement).toBeInTheDocument();
    expect((topNElement as HTMLInputElement).value).toEqual("0");
    expect((topNElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile")
    );
  });

  test("should be invalid when value is negativ ", () => {
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: -5 } }}
        changeFilter={() => {}}
      />
    );
    const topNElement = screen.getByLabelText(/topN/i);

    expect((topNElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("should change value", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: 1 } }}
        changeFilter={changeFilter}
      />
    );
    const topNelement = screen.getByLabelText(/topn/i);

    fireEvent.change(topNelement, { target: { value: "12" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "topN",
      option: { value: 12 },
    });
  });
});

describe("StatisticFilters component. Percentile behavier",()=>{
  test("should be rendered", () => {
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: 0, max: 100 } }}
        changeFilter={() => {}}
      />
    );
    const firstPercentileElement = screen.getByLabelText(/inputfirst/i);
    const secondPercentileElement = screen.getByLabelText(/inputsecond/i);

    expect(firstPercentileElement).toBeInTheDocument();
    expect(secondPercentileElement).toBeInTheDocument();
    expect((firstPercentileElement as HTMLInputElement).value).toEqual("0");
    expect((secondPercentileElement as HTMLInputElement).value).toEqual("100");
    expect((firstPercentileElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile ")
    );
    expect((secondPercentileElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("input_stile ")
    );
  });

  test("should be change value", () => {// вопросик!!!
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: {min:0,max:100} }}
        changeFilter={changeFilter}
      />
    );
    const percentileFirstElement = screen.getByLabelText(/inputfirst/i);
    const percentileSecondElement = screen.getByLabelText(/inputsecond/i);


    fireEvent.change(percentileFirstElement, { target: { value: "10" } });
    fireEvent.change(percentileSecondElement, { target: { value: "90" } });


    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "percentile",
      option: {min:10,max:100},
    });
    expect(changeFilter.mock.calls[1][0]).toEqual({
      type: "percentile",
      option: {min:0,max:90},
    });

  });

  test("shoold be is ivalid when input1 > input2 ", () => {
    render(
      <StatisticFilters
        filter={{ type: "percentile", option: { min: 91, max: 88 } }}
        changeFilter={() => {}}
      />
    );
    const firstPercentileElement = screen.getByLabelText(/inputfirst/i);

    expect((firstPercentileElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });

})

describe("StatisticFilters component. Range behavier",()=>{
  test("should  render range", () => {
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: 0, max: 100 } }}
        changeFilter={()=>{}}
      />
    );
    const rangeElement = screen.getByLabelText(/select/i);

    expect(rangeElement).toBeInTheDocument();
    expect((rangeElement as HTMLInputElement).className).not.toEqual(
      expect.stringContaining("invalid")
    );
  });

  test("shoold be change value", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: -100, max: 100 } }}
        changeFilter={changeFilter}
      />
    );
    const rangeMinElement = screen.getByLabelText(/firstInputRange/);
    const rangeMaxElement = screen.getByLabelText(/secondInputRange/);


    fireEvent.change(rangeMinElement, { target: { value: "-50" } });
    fireEvent.change(rangeMaxElement, { target: { value: "50" } });


    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "range",
      option: {min:-50,max:100},
    }); 
    expect(changeFilter.mock.calls[1][0]).toEqual({
      type: "range",
      option: {min:-100,max:50},
    }); 
  });

  test("shoold be ivalid then minRange > maxRange", () => {
    render(
      <StatisticFilters
        filter={{ type: "range", option: { min: 90, max: 80 } }}
        changeFilter={()=>{}}
      />
    );

    const rangeElementFirst = screen.getByLabelText(/firstInputRange/i);

    expect((rangeElementFirst as HTMLInputElement).className).toEqual(
      expect.stringContaining("invalid")
    );
  });
})

describe("StatisticFilters components", () => {
  

  test("should be trigger changeFilter", () => {
    const changeFilter = jest.fn();
    render(
      <StatisticFilters
        filter={{ type: "topN", option: { value: 0 } }}
        changeFilter={changeFilter}
      />
    );
    const topNElement = screen.getByLabelText(/topN/i);

    fireEvent.change(topNElement, { target: { value: "10" } });

    expect(changeFilter.mock.calls[0][0]).toEqual({
      type: "topN",
      option: { value: 10 },
    });
  });

  
});
