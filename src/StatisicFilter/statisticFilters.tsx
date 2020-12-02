import React, { useCallback } from "react";
import TopN from "./topN";
import Percentile from "./percentile";
import Range from "./range";

type PercentileFilter = {
  type: "percentile";
  option: { min: number; max: number };
};
type RangeFilter = { type: "range"; option: { min: number; max: number } };
type TopNFilter = { type: "topN"; option: { value: number } };
export type Filter = PercentileFilter | TopNFilter | RangeFilter;

interface StatisticFilters {
  filter: Filter;
  changeFilter: (value: Filter) => void;
  minRange: number;
  maxRange: number;
}

const StatisticFilters = ({
  filter,
  changeFilter,
  minRange,
  maxRange,
}: StatisticFilters) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      if (value === "percentile") {
        changeFilter({ type: "percentile", option: { min: 0, max: 100 } });
      } else if (value === "topN") {
        changeFilter({ type: "topN", option: { value: 0 } });
      } else {
        changeFilter({ type: "range", option: { min: -100, max: 100 } });
      }
    },
    []
  );

  return (
    <>
      <select onChange={handleChange} value={filter.type} aria-label="select">
        <option value="percentile">Percentile</option>
        <option value="topN">TopN</option>
        <option value="range">Range</option>
      </select>{" "}
      {filter.type === "percentile" ? (
        <Percentile
          firstPercentileValue={filter.option.min}
          secondPercentileValue={filter.option.max}
          changePercentile={([min, max]) => {
            changeFilter({ type: "percentile", option: { min, max } });
          }}
        />
      ) : filter.type === "topN" ? (
        <TopN
          value={filter.option.value}
          changeValue={(value) => {
            changeFilter({ type: "topN", option: { value } });
          }}
        />
      ) : (
        <Range
          minValue={filter.option.min}
          maxValue={filter.option.max}
          changeRange={([min, max]) => {
            changeFilter({ type: "range", option: { min, max } });
          }}
          minRange={minRange}
          maxRange={maxRange}
        />
      )}
    </>
  );
};

export default StatisticFilters;
