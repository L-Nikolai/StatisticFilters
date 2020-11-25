import React, { useCallback } from "react";
import TopN from "./topN";
import Percentile from "./percentile";
import Range from "./range";

export type statisticFilterType = "percentile" | "topN" | "range";
interface StatisticFilters {
  changeTopN: (value: number) => void;
  topN: number;
  statisticFilter: string;
  setStatisticFilter: (value: statisticFilterType) => void;
  minRange: number
   maxRange: number
  changeRange: (value:[number, number]) => void;
}

const StatisticFilters = (prop: StatisticFilters) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      if (value === "percentile") {
        prop.setStatisticFilter("percentile");
      } else if (value === "topN") {
        prop.setStatisticFilter("topN");
      } else {
        prop.setStatisticFilter("range");
      }
    },
    []
  );

  return (
    <>
      <select
        onChange={handleChange}
        defaultValue="percentile"
        aria-label="select"
      >
        <option value="percentile" aria-label="percentile">
          Percentile
        </option>
        <option value="topN" aria-label="topN">
          TopN
        </option>
        <option value="range" aria-label="range">
          Range
        </option>
      </select>{" "}
      {prop.statisticFilter === "percentile" ? (
        <Percentile />
      ) : prop.statisticFilter === "topN" ? (
        <TopN value={prop.topN} changeValue={prop.changeTopN} />
      ) : (
        <Range 
        minRange={prop.minRange}
        maxRange={prop.maxRange}
        changeRange={prop.changeRange} />
      )}
    </>
  );
};

export default StatisticFilters;
