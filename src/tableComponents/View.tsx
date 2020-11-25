import { resolveSoa } from "dns";
import React, { useCallback, useEffect, useState } from "react";
import reportWebVitals from "../reportWebVitals";
import Row, { DataItem } from "./Row";
import { get2DData, getHighlightTopN, getHighlightRange, getTopN, getRange } from "./utils";

interface View {
  topN: number;
  changeTopN: (value: number) => void;
  minRange: number;
  maxRange: number;
  changeRange: (value: [number, number]) => void;
  statisticFilter : string
}

const View = (props: View) => {
  const topN = props.topN;
  const changeTopN = props.changeTopN;
  const minRange = props.minRange;
  const maxRange = props.maxRange;
  const changeRange = props.changeRange;
  const statisticFilter = props.statisticFilter

  const [data2D] = useState(get2DData(10, 10));
  
  const getHighlightData = ():DataItem[][] => {
    if (statisticFilter === 'topN'){
     return  getHighlightTopN(data2D, topN);
    } else {
     return getHighlightRange(data2D, getRange(data2D,minRange,maxRange))
    }
  }


  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.innerText;
    const numValue = parseInt(value, 10);
    changeTopN(getTopN(data2D, numValue));
  }, []);

  return (
    <>
      <table title="table">
        <tbody>
          {getHighlightData().map((rowData, index) => {
            return <Row key={index} data={rowData} handleClick={handleClick} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default View;
