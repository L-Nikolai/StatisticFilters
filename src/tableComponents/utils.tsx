import { DataItem } from "./Row";
import Chance from "chance";

const chance = new Chance();
export const getColoring = (data: DataItem[], topValue: number): void =>
  data.forEach((item, index) => {
    if (index + 1 <= topValue) {
      item.highlight = true;
    } else {
      item.highlight = false;
    }
  });

export const get2DData = (
  columCount: number,
  rowCount: number
): DataItem[][] => {
  const date: DataItem[][] = [];

  for (let rowIndex = 0; rowIndex < columCount; rowIndex++) {
    date[rowIndex] = [];
    for (let columIndex = 0; columIndex < rowCount; columIndex++) {
      const randomNum: number = chance.integer({ min: -100, max: 100 });
      date[rowIndex][columIndex] = {
        value: randomNum,
        highlight: false,
        id: rowIndex + "" + columIndex,
      };
    }
  }
  return date;
};

export const getTopN = (data: DataItem[][], dataElem: number) => {
  let indexTopN = 0;
  for (let i = 0; i < data.length; i++) {
    if (dataElem === data[i].value) {
      indexTopN = i + 1;
    }
  }
  return indexTopN;
};
