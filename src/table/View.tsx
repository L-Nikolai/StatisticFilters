import React, { useCallback, useState } from "react";
import Row, { DataItem } from "./Row";
import { Filter } from "../StatisicFilter/statisticFilters";
import {
  get2DData,
  getHighlightTopN,
  getHighlightRange,
  getSortIndex,
  getHighlightPercentile,
  getReverseSortIndex,
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
        filter.option.min,
        filter.option.max
      );
    }
  };

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const shift = event.shiftKey;
      const value = event.currentTarget.innerText;
      const numValue = parseInt(value, 10);
      if (filter.type === "topN") {
        changeFilter({
          type: "topN",
          option: { value: getSortIndex(data2D, numValue) },
        });
      } else if (filter.type === "percentile") {
        if (shift) {
          changeFilter({
            type: "percentile",
            option: {
              min: getReverseSortIndex(data2D, numValue),
              max: filter.option.max,
            },
          });
        } else {
          changeFilter({
            type: "percentile",
            option: {
              min: filter.option.min,
              max: getReverseSortIndex(data2D, numValue),
            },
          });
        }
      } else if (filter.type === "range") {
        if (shift) {
          changeFilter({
            type: "range",
            option: {
              min: numValue,
              max: filter.option.max,
            },
          });
        } else {
          changeFilter({
            type: "range",
            option: {
              min: filter.option.min,
              max: numValue,
            },
          });
        }
      }
    },
    [filter, changeFilter, data2D]
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
