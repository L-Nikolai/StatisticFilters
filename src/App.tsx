import React, { useReducer } from "react";
import { reducer, State } from "./Reducer";
import StatisticFilters from "./StatisicFilter";
import View from "./table";

const App = () => {
  const minRange = -100;
  const maxRange = 100;

  const initialState: State = {
    type: "percentile",
    topN: 0,
    minRangeValue: -100,
    maxRangeValue: 100,
    minPercentileValue: 0,
    maxPercentileValue: 100,
  };
  
  const [state, dispath] = useReducer(reducer, initialState);
  return (
    <>
      <View state={state} dispath={dispath} />
      <StatisticFilters
        minRange={minRange}
        maxRange={maxRange}
        state={state}
        dispath={dispath}
      />
    </>
  );
};

export default App;
