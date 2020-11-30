import React, { useState } from "react";
import StatisticFilters, {
  statisticFilterType,
  Filter,
} from "./StatisicFilterComponents/statisticFilters";
import View from "./tableComponents/View";

const App = () => {
  const [filter, changeFilter] = useState<Filter>({
    type: "percentile",
    option: { min: 0, max: 100 },
  });

  const topN = filter.type === "topN" ? filter.option.value : 0;
  const minRange = filter.type === "range" ? filter.option.min : 0;
  const maxRange = filter.type === "range" ? filter.option.max : 0;
  const firstPercentileValue =
    filter.type === "percentile" ? filter.option.min : 0;
  const secondPercentileValue =
    filter.type === "percentile" ? filter.option.max : 0;

  return (
    <>
      <View
        topN={topN}
        changeTopN={() => {}}
        minRange={minRange}
        maxRange={maxRange}
        changeRange={() => {}}
        statisticFilter={filter.type}
        firstPercentileValue={firstPercentileValue}
        secondPercentileValue={secondPercentileValue}
        changePercentile={() => {}}
      />
      <StatisticFilters filter={filter} changeFilter={changeFilter} />
    </>
  );
};

export default App;
