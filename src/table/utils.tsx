import { DataItem } from "./Row";
import Chance from "chance";

const chance = new Chance();
const sortData = (data: DataItem[][]) => {
  return data.flat().sort((a, b) => (a.value < b.value ? 1 : -1));
};
export const getHighlightTopN = (
  data: DataItem[][],
  topN: number
): DataItem[][] => {
  const highlightArray: DataItem[][] = [];
  const sortedTopNArray: DataItem[] = sortData(data).slice(0, topN);
  for (let i = 0; i < data.length; i++) {
    highlightArray[i] = [];
    for (let j = 0; j < data[i].length; j++) {
      highlightArray[i][j] = {
        value: data[i][j].value,
        highlight: false,
        id: data[i][j].id,
      };
      for (let k = 0; k < sortedTopNArray.length; k++) {
        if (data[i][j].id === sortedTopNArray[k].id) {
          highlightArray[i][j].highlight = true;
        }
      }
    }
  }
  return highlightArray;
};
export const getHighlightRange = (
  data: DataItem[][],
  minRange: number,
  maxRange: number
) => {
  const highlightArray: DataItem[][] = [];
  for (let i = 0; i < data.length; i++) {
    highlightArray[i] = [];
    for (let j = 0; j < data[i].length; j++) {
      highlightArray[i][j] = {
        value: data[i][j].value,
        highlight: false,
        id: data[i][j].id,
      };
      if (
        highlightArray[i][j].value >= minRange &&
        highlightArray[i][j].value <= maxRange
      )
        highlightArray[i][j].highlight = true;
    }
  }

  return highlightArray;
};

export const getHighlightPercentile = (
  data: DataItem[][],
  sortedArray: DataItem[]
) => {
  const highlightArray: DataItem[][] = [];
  for (let i = 0; i < data.length; i++) {
    highlightArray[i] = [];
    for (let j = 0; j < data[i].length; j++) {
      highlightArray[i][j] = {
        value: data[i][j].value,
        highlight: false,
        id: data[i][j].id,
      };
      for (let k = 0; k < sortedArray.length; k++) {
        if (data[i][j].id === sortedArray[k].id) {
          highlightArray[i][j].highlight = true;
        }
      }
    }
  }
  return highlightArray;
};

export const getPercentile = (
  data: DataItem[][],
  firstPercentileValue: number,
  secondPercentileValue: number
): DataItem[] => {
  const dataArr = sortData(data);
  const array = dataArr.reverse();
  let min = Math.floor((array.length / 100) * firstPercentileValue);
  let max = Math.ceil((array.length / 100) * secondPercentileValue);

  return array.slice(min, max);
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
        id: rowIndex + "" + columIndex,
      };
    }
  }
  return date;
};

export const getTopN = (data: DataItem[][], dataElem: number) => {
  const date = sortData(data);
  let indexTopN = 0;
  for (let i = 0; i < date.length; i++) {
    if (dataElem === date[i].value) {
      indexTopN = i + 1;
    }
  }
  return indexTopN;
};
