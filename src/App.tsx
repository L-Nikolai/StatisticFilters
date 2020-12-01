import React, { useState } from "react";
import StatisticFilters, { Filter } from "./StatisicFilter";
import View from "./table";

const App = () => {
  const minValue = -100
  const maxValue = 100
  const [filter, changeFilter] = useState<Filter>({
    type: "percentile",
    option: { min: 0, max: 100 },
  });
  return (
    <>
      <View filter={filter} changeFilter={changeFilter} />
      <StatisticFilters 
      filter={filter} 
      changeFilter={changeFilter} 
      minValue={minValue} 
      maxValue={maxValue} />
    </>
  );
};

export default App;
