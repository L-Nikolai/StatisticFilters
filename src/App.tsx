import React, { useState } from "react";
import StatisticFilters, { Filter } from "./StatisicFilter";
import View from "./table";

const App = () => {
  const minRange = -100;
  const maxRange = 100;
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
        minRange={minRange}
        maxRange={maxRange}
      />
    </>
  );
};

export default App;
