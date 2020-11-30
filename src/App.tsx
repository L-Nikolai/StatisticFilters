import React, { useState } from "react";
import StatisticFilters, { Filter } from "./StatisicFilter";
import View from "./table";

const App = () => {
  const [filter, changeFilter] = useState<Filter>({
    type: "percentile",
    option: { min: 0, max: 100 },
  });
  return (
    <>
      <View filter={filter} changeFilter={changeFilter} />
      <StatisticFilters filter={filter} changeFilter={changeFilter} />
    </>
  );
};

export default App;
