import {
  getHighlightTopN,
  getHighlightRange,
  get2DData,
  getTopN,
  getHighlightPercentile,
} from "./utils";
import Chance from "chance";

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
    test("shoold be accept data and issue an array", () => {
      chanceInstance.integer.mockReturnValue(2);

      const result = get2DData(2, 2);

      expect(result).toEqual([
        [
          { value: 2, id: "00" },
          { value: 2, id: "01" },
        ],
        [
          { value: 2, id: "10" },
          { value: 2, id: "11" },
        ],
      ]);
    });
  });

  describe("getHighlightTopN utils", () => {
    test("shoold return array", () => {
      const array = get2DData(1, 1);

      const result = getHighlightTopN(array, 0);

      expect(result.length).toEqual(1);
      expect(result[0]).toHaveLength(1);
    });

    test("shoold return highlight is true", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(2, 2);

      const result = getHighlightTopN(array, 2);

      expect(result[1][0].highlight).toEqual(true);
      expect(result[1][1].highlight).toEqual(true);
    });

    test("shoold be retrun with values", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(1, 1);

      const result = getHighlightTopN(array, 1);

      expect(result).toEqual([[{ value: 1, highlight: true, id: "00" }]]);
    });

    test("shoold be change values  ​​depending on TopN", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(1, 2);

      const result = getHighlightTopN(array, 1);

      expect(result).toEqual([
        [
          { value: 1, highlight: false, id: "00" },
          { value: 2, highlight: true, id: "01" },
        ],
      ]);
    });
  });

  describe("getHighlightRange utils", () => {
    test("shoold return higlight array", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(2, 2);
      const result = getHighlightRange(array, 1, 1);

      expect(result).toEqual([
        [
          { highlight: true, id: "00", value: 1 },
          { highlight: false, id: "01", value: 2 },
        ],
        [
          { highlight: false, id: "10", value: 3 },
          { highlight: false, id: "11", value: 4 },
        ],
      ]);
    });
  });

  describe("getHighlightPercentile utils", () => {
    test("shoold return higlight array", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(2, 2);

      const result = getHighlightPercentile(array, 40, 60);

      expect(result).toEqual([
        [
          { highlight: false, id: "00", value: 1 },
          { highlight: true, id: "01", value: 2 },
        ],
        [
          { highlight: true, id: "10", value: 3 },
          { highlight: false, id: "11", value: 4 },
        ],
      ]);
    });

    test("shoold return higlight array with last highlight element", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(2, 2);

      const result = getHighlightPercentile(array, 99, 100);

      expect(result).toEqual([
        [
          { highlight: false, id: "00", value: 1 },
          { highlight: false, id: "01", value: 2 },
        ],
        [
          { highlight: false, id: "10", value: 3 },
          { highlight: true, id: "11", value: 4 },
        ],
      ]);
    });
  });

  describe("getTopN utils", () => {
    test("shoold be calculate topN", () => {
      let i = 0;
      chanceInstance.integer.mockImplementation(() => ++i);
      const array = get2DData(2, 2);

      const result = getTopN(array, array[0][1].value);

      expect(result).toEqual(3);
    });
  });
});
