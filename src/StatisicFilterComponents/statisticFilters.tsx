import React, { useCallback } from "react";
import TopN from "./topN";
import Percentile from "./percentile";

export type statisticFilterType = "percentile" | "topN";
interface StatisticFilters {
  changeTopN: (value: number) => void;
  topN: number;
  statisticFilter: string;
  setStatisticFilter: (value: statisticFilterType) => void;
}

const StatisticFilters = (prop: StatisticFilters) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      if (value === "percentile") {
        prop.setStatisticFilter("percentile");
      } else prop.setStatisticFilter("topN");
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
        <option value="topN" aria-label="topn">
          TopN
        </option>
      </select>{" "}
      {prop.statisticFilter === "percentile" ? (
        <Percentile />
      ) : (
        <TopN value={prop.topN} changeValue={prop.changeTopN} />
      )}
    </>
  );
};

export default StatisticFilters;
