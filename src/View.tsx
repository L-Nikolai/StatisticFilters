import { resolveSoa } from "dns";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import Chance from "chance";

const chance = new Chance();

const Row = (props: { data: number[] }): React.ReactElement => {
  const data = props.data;
  const renderCell = data.map((item, index) => <td key={index}>{item}</td>);
  return <tr>{renderCell}</tr>;
};

const View = () => {
  const getData = (colums: number, rows: number): number[][] => {
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

  const data = getData(10, 10);
  return (
    <table>
      {data.map((item, index) => {
        return <Row key={index} data={item} />;
      })}
    </table>
  );
};

export default View;
