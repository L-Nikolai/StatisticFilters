import React, { useCallback, useState } from "react";
import Row, { DataItem } from "./Row";
import { State, Action } from "../Reducer";
import {
  get2DData,
  getHighlightTopN,
  getHighlightRange,
  getSortIndex,
  getHighlightPercentile,
  getReverseSortIndex,
} from "./utils";

interface Table {
  state: State;
  dispath: (value: Action) => void;
}

const Table = ({ state, dispath }: Table) => {
  const [data2D] = useState(get2DData(10, 10));
  const getHighlightData = (): DataItem[][] => {
    if (state.type === "topN") {
      return getHighlightTopN(data2D, state.topN);
    } else if (state.type === "range") {
      return getHighlightRange(
        data2D,
        state.minRangeValue,
        state.maxRangeValue
      );
    } else {
      return getHighlightPercentile(
        data2D,
        state.minPercentileValue,
        state.maxPercentileValue
      );
    }
  };

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const shift = event.shiftKey;
      const value = event.currentTarget.innerText;
      const numValue = parseInt(value, 10);
      if (state.type === "topN") {
        dispath({
          type: "changeTopN",
          payload: getSortIndex(data2D, numValue),
        });
      } else if (state.type === "percentile") {
        if (shift) {
          dispath({
            type: "changeValues",
            payload: [
              getReverseSortIndex(data2D, numValue),
              state.maxPercentileValue,
            ],
          });
        } else {
          dispath({
            type: "changeValues",
            payload: [
              state.minPercentileValue,
              getReverseSortIndex(data2D, numValue),
            ],
          });
        }
      } else if (state.type === "range") {
        if (shift) {
          dispath({
            type: "changeValues",
            payload: [numValue, state.maxRangeValue],
          });
        } else {
          dispath({
            type: "changeValues",
            payload: [state.maxRangeValue, numValue],
          });
        }
      }
    },
    [
      state.type,
      state.maxPercentileValue,
      state.minPercentileValue,
      state.maxRangeValue,
      dispath,
      data2D,
    ]
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

export default Table;
