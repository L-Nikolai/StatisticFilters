import React, { useCallback } from "react";
import TopN from "./topN";
import Percentile from "./percentile";
import Range from "./range";
import { State, Action } from "../Reducer";

type PercentileFilter = {
  type: "percentile";
  option: { min: number; max: number };
};
type RangeFilter = { type: "range"; option: { min: number; max: number } };
type TopNFilter = { type: "topN"; option: { value: number } };
export type Filter = PercentileFilter | TopNFilter | RangeFilter;

interface StatisticFilters {
  minRange: number;
  maxRange: number;
  state: State;
  dispath: (value: Action) => void;
}

const StatisticFilters = ({
  minRange,
  maxRange,
  state,
  dispath,
}: StatisticFilters) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      if (value === "percentile") {
        dispath({ type: "changeType", payload: "percentile" });
      } else if (value === "topN") {
        dispath({ type: "changeType", payload: "topN" });
      } else {
        dispath({ type: "changeType", payload: "range" });
      }
    },
    [dispath]
  );

  return (
    <>
      <select onChange={handleChange} value={state.type} aria-label="select">
        <option value="percentile">Percentile</option>
        <option value="topN">TopN</option>
        <option value="range">Range</option>
      </select>{" "}
      {state.type === "percentile" ? (
        <Percentile
          firstPercentileValue={state.minPercentileValue}
          secondPercentileValue={state.maxPercentileValue}
          changePercentile={([min, max]) => {
            dispath({ type: "changeValues", payload: [min, max] });
          }}
        />
      ) : state.type === "topN" ? (
        <TopN
          value={state.topN}
          changeValue={(value) => {
            dispath({ type: "changeTopN", payload: value });
          }}
        />
      ) : (
        <Range
          minValue={state.minRangeValue}
          maxValue={state.maxRangeValue}
          changeRange={([min, max]) => {
            dispath({ type: "changeValues", payload: [min, max] });
          }}
          minRange={minRange}
          maxRange={maxRange}
        />
      )}
    </>
  );
};

export default StatisticFilters;
