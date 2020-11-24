import { resolveSoa } from "dns";
import React, { useCallback, useEffect, useState } from "react";
import reportWebVitals from "../reportWebVitals";
import Row, { DataItem } from "./Row";
import { get2DData, getHighlightArray, getTopN } from "./utils";

interface View {
  topN: number;
  changeTopN: (value: number) => void;
}

const View = (props: View) => {
  const topN = props.topN;
  const changeTopN = props.changeTopN;

  const [data2D] = useState(get2DData(10, 10));
  const highlightData = getHighlightArray(data2D, topN);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.innerText;
    const numValue = parseInt(value, 10);
    changeTopN(getTopN(data2D, numValue));
  }, []);

  return (
    <>
      <table title="table">
        <tbody>
          {highlightData.map((rowData, index) => {
            return <Row key={index} data={rowData} handleClick={handleClick} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default View;
