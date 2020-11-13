import React, { useCallback, useState } from "react";
import TopN from "./topN";
import Percentile from "./percentile";

interface StatisticFilters {
  changeTopN: (value: number) => void;
  topN: number;
}
type statisticFilterType = "percentile" | "topN";

const StatisticFilters = (prop: StatisticFilters) => {
  const [staticFilter, setStaticFilter] = useState<statisticFilterType>(
    "percentile"
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      if (value === "percentile") {
        setStaticFilter("percentile");
      } else setStaticFilter("topN");
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
      {staticFilter === "percentile" ? (
        <Percentile />
      ) : (
        <TopN value={prop.topN} changeValue={prop.changeTopN} />
      )}
    </>
  );
};

export default StatisticFilters;
