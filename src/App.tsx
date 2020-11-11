import React, { useState } from "react";
import StatisticFilters from "./statistic-filter";
import View from "./View";

const App = () => {
  const [topN] = useState(10);
  return (
    <>
      <View topN={topN} />
      <StatisticFilters />
    </>
  );
};

export default App;
