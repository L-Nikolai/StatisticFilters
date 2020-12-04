import { reducer, State } from "./Reducer";

const defaultState: State = {
  type: "percentile",
  topN: 0,
  minRange: 0,
  maxRange: 100,
  minPercentile: 0,
  maxPercentile: 100,
};

describe("App reducer", () => {
  test("should change type to topn", () => {
    const state = reducer(defaultState, {
      type: "changeType",
      payload: "topN",
    });
    expect(state).toEqual({ ...defaultState, type: "topN" });
  });

  test("should change min and max percentile values", () => {
    const state = reducer(
      { ...defaultState, type: "percentile" },
      { type: "changeValues", payload: [10, 90] }
    );
    expect(state).toEqual({
      ...defaultState,
      type: "percentile",
      minPercentile: 10,
      maxPercentile: 90,
    });
  });

  test("should change min and max range values", () => {
    const state = reducer(
      { ...defaultState, type: "range" },
      { type: "changeValues", payload: [10, 90] }
    );
    expect(state).toEqual({
      ...defaultState,
      type: "range",
      minRange: 10,
      maxRange: 90,
    });
  });

  test("should change topN value", () => {
    const state = reducer(
      { ...defaultState, type: "topN" },
      { type: "changeTopN", payload: 80 }
    );
    expect(state).toEqual({ ...defaultState, type: "topN", topN: 80 });
  });
});
