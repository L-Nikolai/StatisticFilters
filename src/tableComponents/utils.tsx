import { DataItem } from "./Row";
import Chance from "chance";

const chance = new Chance();
export const getHighlightArray = (
  array: DataItem[][],
  topN: number
): DataItem[][] => {
  const highlightArray: DataItem[][] = [];
  const sortedArray: DataItem[] = array
    .flat()
    .sort((a, b) => (a.value < b.value ? 1 : -1))
    .slice(0, topN);
  for (let i = 0; i < array.length; i++) {
    highlightArray[i] = [];
    for (let j = 0; j < array[i].length; j++) {
      highlightArray[i][j] = {
        value: array[i][j].value,
        highlight: false,
        id: array[i][j].id,
      };
      for (let k = 0; k < sortedArray.length; k++) {
        if (array[i][j].id === sortedArray[k].id) {
          highlightArray[i][j].highlight = true;
        }
      }
    }
  }
  return highlightArray;
};

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
  const date = data.flat().sort((a, b) => (a.value < b.value ? 1 : -1));
  let indexTopN = 0;
  for (let i = 0; i < date.length; i++) {
    if (dataElem === date[i].value) {
      indexTopN = i + 1;
    }
  }
  return indexTopN;
};
