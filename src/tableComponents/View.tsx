import { resolveSoa } from "dns";
import React from "react";
import reportWebVitals from "../reportWebVitals";
import Chance from "chance";
import Row from "./Row";

const sortN = (firstData: number[], secondData: number[]): boolean[] => {
  const sorted = [];

  for (let i = 0; i < firstData.length; i++) {
    let havedEquelsvalue = false;

    for (let j = 0; j < secondData.length; j++) {
      if (firstData[i] === secondData[j]) {
        havedEquelsvalue = true;
      }
    }
    sorted.push(havedEquelsvalue);
  }

  return sorted;
};
const get2DData = (colums: number, rows: number): number[][] => {
  const date: number[][] = [];

  for (let rowIndex = 0; rowIndex < colums; rowIndex++) {
    date[rowIndex] = [];
    for (let columIndex = 0; columIndex < rows; columIndex++) {
      const randomNum: number = chance.integer({ min: -100, max: 100 });
      date[rowIndex][columIndex] = randomNum;
    }
  }
  return date;
};

interface View {
  topN: number;
  changeTopN: (value: number) => void;
}

const chance = new Chance();
const data2D = get2DData(10, 10);

const View = (props: View) => {
  const topN = props.topN;
  const data = data2D.flat();
  const topNSort = data.slice().sort((a, b) => b - a);
  const sortedArr = topNSort.slice(0, topN);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.innerText;
    const numValue = parseInt(value, 10);
    let indexTopN = 0;

    for (let i = 0; i < topNSort.length; i++) {
      if (numValue === topNSort[i]) {
        indexTopN = i + 1;
      }
    }
    props.changeTopN(indexTopN);
  };

  return (
    <>
      <table title="table">
        <tbody>
          {data2D.map((rowData, index) => {
            return (
              <Row
                key={index}
                data={rowData}
                colored={sortN(rowData, sortedArr)}
                handleClick={handleClick}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default View;
