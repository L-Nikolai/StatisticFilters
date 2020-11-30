import React, { useState } from "react";
import StatisticFilters, {
  statisticFilterType,
  Filter,
} from "./StatisicFilterComponents/statisticFilters";
import View from "./tableComponents/View";

const App = () => {
  const [topN, changeTopN] = useState(0);
  const [statisticFilter, setStatisticFilter] = useState<statisticFilterType>(
    "percentile"
  );
  const [[minRange, maxRange], changeRange] = useState([-100, 100]);
  const [
    [firstPercentileValue, secondPercentileValue],
    changePercentile,
  ] = useState([0, 100]);

  const [filter, changeFilter] = useState<Filter>({
    type: "percentile",
    option: { min: 0, max: 100 },
  });

  return (
    <>
      <View
        topN={topN}
        changeTopN={changeTopN}
        minRange={minRange}
        maxRange={maxRange}
        changeRange={changeRange}
        statisticFilter={statisticFilter}
        firstPercentileValue={firstPercentileValue}
        secondPercentileValue={secondPercentileValue}
        changePercentile={changePercentile}
      />
      <StatisticFilters filter={filter} changeFilter={changeFilter} />
    </>
  );
};

export default App;
