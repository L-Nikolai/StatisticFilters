import { resolveSoa } from "dns";
import React from "react";
import reportWebVitals from "../reportWebVitals";
import Chance from "chance";
import Row from "./Row";

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
}

const chance = new Chance();

const data2D = get2DData(10, 10);

const View = (props: View) => {
  const topN = props.topN;
  const topNSort = data2D
    .flat()
    .sort((a, b) => b - a)
    .slice(0, topN);
  return (
    <>
      <table>
        {data2D.map((rowData, index) => {
          return <Row key={index} data={rowData} topNSort={topNSort} />;
        })}
      </table>
      <h1>{topNSort.join(" ")}</h1>
    </>
  );
};

export default View;
