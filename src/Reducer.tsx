type StatisticFilterType = "percentile" | "range" | "topN";

export type State = {
  type: StatisticFilterType;
  topN: number;
  minRangeValue: number;
  maxRangeValue: number;
  minPercentileValue: number;
  maxPercentileValue: number;
};
type ChangeTypeStatisticFilter = {
  type: "changeType";
  payload: StatisticFilterType;
};
type ChangeValues = {
  type: "changeValues";
  payload: [min: number, max: number];
};
type ChangeTopN = { type: "changeTopN"; payload: number };
export type Action = ChangeTypeStatisticFilter | ChangeValues | ChangeTopN;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "changeType":
      return { ...state, type: action.payload };
    case "changeValues":
      if (state.type === "percentile") {
        return {
          ...state,
          minPercentileValue: action.payload[0],
          maxPercentileValue: action.payload[1],
        };
      } else if (state.type === "range") {
        return {
          ...state,
          minRangeValue: action.payload[0],
          maxRangeValue: action.payload[1],
        };
      }
      break;
    case "changeTopN":
      return { ...state, topN: action.payload };
  }
  return state;
};
