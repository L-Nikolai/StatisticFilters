import { resolveSoa } from "dns";
import React from "react";
import reportWebVitals from "../reportWebVitals";
import Chance from "chance";
import Row, { DataItem } from "./Row";

const get2DData = (colums: number, rows: number): DataItem[][] => {
  const date: DataItem[][] = [];

  for (let rowIndex = 0; rowIndex < colums; rowIndex++) {
    date[rowIndex] = [];
    for (let columIndex = 0; columIndex < rows; columIndex++) {
      const randomNum: number = chance.integer({ min: -100, max: 100 });
      date[rowIndex][columIndex] = { value: randomNum, highlight: false };
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
  data
    .sort((a, b) => (a.value < b.value ? 1 : -1))
    .forEach((item, index) => {
      if (index + 1 <= topN) {
        item.highlight = true;
      } else {
        item.highlight = false;
      }
    });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.innerText;
    const numValue = parseInt(value, 10);
    let indexTopN = 0;

    for (let i = 0; i < data.length; i++) {
      if (numValue === data[i].value) {
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
            return <Row key={index} data={rowData} handleClick={handleClick} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default View;
