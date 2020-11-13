import React from "react";
import Percentile from "./percentile";
import TopN from "./topN";

interface Check {
  percentile:  boolean
  changeTopN : (value:number) => void
  topN: number
}

const Check = (prop: Check ) => {
  return prop.percentile ? 
  <Percentile  /> : <TopN value={prop.topN} changeValue={prop.changeTopN} />;
};

export default Check;
