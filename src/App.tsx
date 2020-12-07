import React, { useReducer, useState } from "react";
import DesableButton from "./desableButton";
import { reducer, State } from "./Reducer";
import StatisticFilters from "./StatisicFilter";
import Table from "./table";

type DisableContext = {
  disabled: boolean;
  changeDisabled: (value: boolean) => void;
};

export const DisableContext = React.createContext<DisableContext>(
  {} as DisableContext
);
const DisableProvider = ({ children }: { children: React.ReactNode }) => {
  const [disabled, changeDisabled] = useState(false);
  return (
    <DisableContext.Provider value={{ disabled, changeDisabled }}>
      {children}
    </DisableContext.Provider>
  );
};
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
const App = () => {
  const [state, dispath] = useReducer(reducer, initialState);
  return (
    <DisableProvider>
      <Table state={state} dispath={dispath} />
      <StatisticFilters
        minRange={minRange}
        maxRange={maxRange}
        state={state}
        dispath={dispath}
      />
      <DesableButton />
    </DisableProvider>
  );
};

export default App;
