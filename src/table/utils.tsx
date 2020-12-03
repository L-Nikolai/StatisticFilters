import { DataItem } from "./Row";
import Chance from "chance";

const chance = new Chance();
const sortData = (data: DataItem[][]) => {
  return data.flat().sort((a, b) => (a.value < b.value ? 1 : -1));
};

const getHighlightArrayData = (data: DataItem[][]) => {
  const highlightArray: DataItem[][] = [];
  for (let i = 0; i < data.length; i++) {
    highlightArray[i] = [];
    for (let j = 0; j < data[i].length; j++) {
      highlightArray[i][j] = {
        value: data[i][j].value,
        highlight: false,
        id: data[i][j].id,
      };
    }
  }
  return highlightArray;
};

export const getHighlightTopN = (
  data: DataItem[][],
  topN: number
): DataItem[][] => {
  const data2D = getHighlightArrayData(data);
  const sortedTopNArray: DataItem[] = sortData(data).slice(0, topN);
  data2D.flat().forEach((item) => {
    if (sortedTopNArray.find((elem) => item.id === elem.id)) {
      item.highlight = true;
    }
  });

  return data2D;
};

export const getHighlightRange = (
  data: DataItem[][],
  minRange: number,
  maxRange: number
) => {
  const highlightArray = getHighlightArrayData(data);
  highlightArray.flat().forEach((item) => {
    if (item.value >= minRange && item.value <= maxRange) {
      item.highlight = true;
    }
  });

  return highlightArray;
};

export const getHighlightPercentile = (
  data: DataItem[][],
  firstPercentileValue: number,
  secondPercentileValue: number
) => {
  const sortedArray = getPercentile(
    data,
    firstPercentileValue,
    secondPercentileValue
  );
  const highlightArray = getHighlightArrayData(data);
  highlightArray.flat().forEach((item) => {
    if (sortedArray.find((elem) => item.id === elem.id)) {
      item.highlight = true;
    }
  });
  return highlightArray;
};

const getPercentile = (
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
