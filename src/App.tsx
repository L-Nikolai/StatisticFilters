import React, { useState } from "react";
import StatisticFilters from "./StatisicFilterComponents/statisticFilters";
import View from "./tableComponents/View";

const App = () => {
  const [topN,changeTopN] = useState(10);

  return (
    <>
      <View topN={topN} />
      <StatisticFilters changeTopN={changeTopN} />
    </>
  );
};

export default App;
