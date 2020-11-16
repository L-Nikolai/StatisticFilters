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
  return (
    <>
      <View topN={topN} changeTopN={changeTopN} />
      <StatisticFilters
        topN={topN}
        changeTopN={changeTopN}
        statisticFilter={statisticFilter}
        setStatisticFilter={setStatisticFilter}
      />
    </>
  );
};

export default App;
