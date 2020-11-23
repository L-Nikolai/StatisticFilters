import { getColoring, get2DData, getTopN } from "./utils";
import Chance from "chance";
import { DataItem } from "./Row";
jest.mock("chance", () => {
  const mockInteger = jest.fn();

  return jest.fn().mockImplementation(() => {
    return { integer: mockInteger };
  });
});
describe("utils", () => {
  let chanceInstance = { integer: jest.fn() };
  beforeAll(() => {
    chanceInstance = new Chance();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe("get2DData utils", () => {
    test("shoold be accept data and issue an array ", () => {
      chanceInstance.integer.mockReturnValue(2);
      const result = get2DData(2, 2);

      expect(result).toEqual([
        [
          { value: 2, highlight: false, id: "00" },
          { value: 2, highlight: false, id: "01" },
        ],
        [
          { value: 2, highlight: false, id: "10" },
          { value: 2, highlight: false, id: "11" },
        ],
      ]);
    });
  });
  const getHilitedArray = (array: DataItem[][], topN: number): DataItem[][] => {
    const sortedArray: DataItem[] = array
      .slice()
      .flat()
      .sort((a, b) => (a.value < b.value ? 1 : -1))
      .slice(0, topN);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        for (let k = 0; k < sortedArray.length; k++) {
          if (array[i][j].id === sortedArray[k].id) {
            array[i][j] = {
              value: array[i][j].value,
              highlight: true,
              id: array[i][j].id,
            };
          }
        }
      }
    }
    return array;
  };

  describe("getHilitedArray utils ", () => {
    test("shoold return array", () => {
      const array = get2DData(1, 1);
      const result = getHilitedArray(array, 0);

      expect(result.length).toEqual(1);
      expect(result[0]).toHaveLength(1);
    });

    test("shoold return highlight is true", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(2, 2);
      const result = getHilitedArray(array, 2);
      expect(result[1][0].highlight).toEqual(true);
      expect(result[1][1].highlight).toEqual(true);
    });

    test("shoold be retrun with values", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(1, 1);
      const result = getHilitedArray(array, 1);

      expect(result).toEqual([[{ value: 1, highlight: true, id: "00" }]]);
    });

    test("shoold be change values  ​​depending on TopN", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(1, 2);
      const result = getHilitedArray(array, 1);

      expect(result).toEqual([
        [
          { value: 1, highlight: false, id: "00" },
          { value: 2, highlight: true, id: "01" },
        ],
      ]);
    });
  });

  //   describe("getTopN utils", () => {
  //     test("shoold be calculate topN", () => {
  //       const array = get2DData(2, 2);
  //       const result = getTopN(array, array[0][0].value);
  //       expect(result).toEqual(2);
  //     });
  //   });
});
