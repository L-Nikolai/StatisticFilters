import { getHighlightArray, get2DData, getTopN } from "./utils";
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
  

  describe("getHighlightArray utils ", () => {
    test("shoold return array", () => {
      const array = get2DData(1, 1);
      const result = getHighlightArray(array, 0);

      expect(result.length).toEqual(1);
      expect(result[0]).toHaveLength(1);
    });

    test("shoold return highlight is true", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(2, 2);
      const result = getHighlightArray(array, 2);
      expect(result[1][0].highlight).toEqual(true);
      expect(result[1][1].highlight).toEqual(true);
    });

    test("shoold be retrun with values", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(1, 1);
      const result = getHighlightArray(array, 1);

      expect(result).toEqual([[{ value: 1, highlight: true, id: "00" }]]);
    });

    test("shoold be change values  ​​depending on TopN", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(1, 2);
      const result = getHighlightArray(array, 1);

      expect(result).toEqual([
        [
          { value: 1, highlight: false, id: "00" },
          { value: 2, highlight: true, id: "01" },
        ],
      ]);
    });
  });

    // describe("getTopN utils", () => {
    //   test("shoold be calculate topN", () => {
    //     let i = 0;
    //     chanceInstance.integer.mockImplementation(() => ++i);
    //     const array = get2DData(3, 3);
    //     console.log(array)
    //     const result = getTopN(array, array[0][0].value);
    //     expect(result).toEqual(2);
    //   });
    // });
});
