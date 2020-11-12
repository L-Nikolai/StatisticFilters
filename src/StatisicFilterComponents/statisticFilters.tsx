import React, { useCallback, useState } from "react";
import Check from "./chek";
import TopN from "./topN";

interface StatisticFilters {
  changeTopN: (value:number) => void
  topN : number
}
const StatisticFilters = (prop : StatisticFilters) => {
  const [percentile, setPercentile] = useState(true);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      if (value === "Percentile") {
        setPercentile(true);
      } else setPercentile(false);
    },
    []
  );

  return (
    <>
      <select
        onChange={handleChange}
        defaultValue="Percentile"
        aria-label="select"
      >
        <option value="Percentile" aria-label="percentile">
          Percentile
        </option>
        <option value="TopN" aria-label="topn">
          TopN
        </option>
      </select>
      <Check percentile={percentile} topN={prop.topN} changeTopN={prop.changeTopN} />
    </>
  );
};

export default StatisticFilters;
