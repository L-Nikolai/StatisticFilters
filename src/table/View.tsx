import { resolveSoa } from "dns";
import React, { useCallback, useEffect, useState } from "react";
import reportWebVitals from "../reportWebVitals";
import Row, { DataItem } from "./Row";
import { Filter } from "../StatisicFilter/statisticFilters";
import {
  get2DData,
  getHighlightTopN,
  getHighlightRange,
  getTopN,
  getHighlightPercentile,
  getPercentile,
} from "./utils";

interface View {
  filter: Filter;
  changeFilter: (value: Filter) => void;
}

const View = ({ filter, changeFilter }: View) => {
  const [data2D] = useState(get2DData(10, 10));

  const getHighlightData = (): DataItem[][] => {
    if (filter.type === "topN") {
      return getHighlightTopN(data2D, filter.option.value);
    } else if (filter.type === "range") {
      return getHighlightRange(data2D, filter.option.min, filter.option.max);
    } else {
      return getHighlightPercentile(
        data2D,
        getPercentile(data2D, filter.option.min, filter.option.max)
      );
    }
  };

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const value = event.currentTarget.innerText;
      const numValue = parseInt(value, 10);

      if (filter.type === "topN") {
        changeFilter({
          type: "topN",
          option: { value: getTopN(data2D, numValue) },
        });
      }
    },
    [filter.type, changeFilter]
  );

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
