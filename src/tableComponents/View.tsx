import { resolveSoa } from "dns";
import React, { useCallback, useEffect, useState } from "react";
import reportWebVitals from "../reportWebVitals";
import Row, { DataItem } from "./Row";
import {
  get2DData,
  getHighlightTopN,
  getHighlightRange,
  getTopN,
  getHighlightPercentile,
  getPercentile,
} from "./utils";

interface View {
  topN: number;
  changeTopN: (value: number) => void;
  minRange: number;
  maxRange: number;
  changeRange: (value: [number, number]) => void;
  statisticFilter: string;
  firstPercentileValue: number;
  secondPercentileValue: number;
  changePercentile: (value: [number, number]) => void;
}

const View = (props: View) => {
  const topN = props.topN;
  const changeTopN = props.changeTopN;
  const minRange = props.minRange;
  const maxRange = props.maxRange;
  const changeRange = props.changeRange;
  const statisticFilter = props.statisticFilter;
  const firstPercentileValue = props.firstPercentileValue;
  const secondPercentileValue = props.secondPercentileValue;
  const changePercentile = props.changePercentile;

  const [data2D] = useState(get2DData(10, 10));

  const getHighlightData = (): DataItem[][] => {
    if (statisticFilter === "topN") {
      return getHighlightTopN(data2D, topN);
    } else if (statisticFilter === "range") {
      return getHighlightRange(data2D, minRange, maxRange);
    } else {
      return getHighlightPercentile(
        data2D,
        getPercentile(data2D, firstPercentileValue, secondPercentileValue)
      );
    }
  };

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
