import React, { useCallback } from "react";
import TopN from "./topN";
import Percentile from "./percentile";
import Range from "./range";
import { State, Action } from "../Reducer";

interface StatisticFilters {
  minRange: number;
  maxRange: number;
  state: State;
  dispath: (value: Action) => void;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
