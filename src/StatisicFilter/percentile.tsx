import React, { useState, useCallback } from "react";
import Input from "./input";

interface Percentile {
  firstPercentileValue: number;
  secondPercentileValue: number;
  changePercentile: (value: [number, number]) => void;
}
const checkRange = (numValue: number): boolean =>
  numValue >= 0 && numValue <= 100;
export const getValue = (
  event: React.ChangeEvent<HTMLInputElement>
): number => {
  const { value } = event.target;
  const numValue = parseFloat(value);
  return numValue;
};

const Percentile = ({firstPercentileValue,secondPercentileValue,changePercentile}: Percentile) => {
  const [isValid, changeIsValid] = useState(true);

  const onFirstChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);

      const inRange = checkRange(numValue);
      changeIsValid(inRange);

      if (numValue >= secondPercentileValue) {
        changeIsValid(false);
      }
      changePercentile([numValue, secondPercentileValue]);
    },
    [firstPercentileValue, secondPercentileValue]
  );

  const onSecondChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);

      const inRange = checkRange(numValue);
      changeIsValid(inRange);

      if (firstPercentileValue >= numValue) {
        changeIsValid(false);
      }
      changePercentile([firstPercentileValue, numValue]);
    },
    [firstPercentileValue, secondPercentileValue]
  );

  return (
    <>
      <Input
        isValid={isValid}
        defaultValue={0}
        onChange={onFirstChange}
        label="inputfirst"
      />
      <Input
        isValid={isValid}
        defaultValue={100}
        onChange={onSecondChange}
        label="inputsecond"
      />
    </>
  );
};

export default Percentile;
