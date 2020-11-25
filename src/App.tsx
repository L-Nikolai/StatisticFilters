import React, { useState } from "react";
import StatisticFilters, {
  statisticFilterType,
} from "./StatisicFilterComponents/statisticFilters";
import View from "./tableComponents/View";

const App = () => {
  const [topN, changeTopN] = useState(0);
  const [statisticFilter, setStatisticFilter] = useState<statisticFilterType>(
    "percentile"
  );
  const [[minRange, maxRange], changeRange] = useState([-100, 100]);

  return (
    <>
      <View
        topN={topN}
        changeTopN={changeTopN}
        minRange={minRange}
        maxRange={maxRange}
        changeRange={changeRange}
        statisticFilter={statisticFilter}
      />
      <StatisticFilters
        topN={topN}
        changeTopN={changeTopN}
        statisticFilter={statisticFilter}
        setStatisticFilter={setStatisticFilter}
        minRange={minRange}
        maxRange={maxRange}
        changeRange={changeRange}
      />
    </>
  );
};

export default App;
