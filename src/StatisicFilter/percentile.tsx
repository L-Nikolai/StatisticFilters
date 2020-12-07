import React, { useCallback, useContext } from "react";
import Input from "./input";
import { DisableContext } from "../App";

interface Percentile {
  firstPercentileValue: number;
  secondPercentileValue: number;
  changePercentile: (value: [number, number]) => void;
}
export const getValue = (
  event: React.ChangeEvent<HTMLInputElement>
): number => {
  const { value } = event.target;
  const numValue = parseFloat(value);
  return numValue;
};
const checkRange = (firstV: number, secondV: number): boolean =>
  firstV >= 0 && secondV <= 100;

const Percentile = ({
  firstPercentileValue,
  secondPercentileValue,
  changePercentile,
}: Percentile) => {
  const { disabled } = useContext(DisableContext);

  const isValid =
    firstPercentileValue < secondPercentileValue &&
    checkRange(firstPercentileValue, secondPercentileValue);

  const onFirstChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);

      changePercentile([numValue, secondPercentileValue]);
    },
    [changePercentile, secondPercentileValue]
  );

  const onSecondChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);

      changePercentile([firstPercentileValue, numValue]);
    },
    [changePercentile, firstPercentileValue]
  );

  return (
    <>
      <Input
        isValid={isValid}
        value={firstPercentileValue}
        onChange={onFirstChange}
        label="inputfirst"
        disabled={disabled}
      />
      <Input
        isValid={isValid}
        value={secondPercentileValue}
        onChange={onSecondChange}
        label="inputsecond"
        disabled={disabled}
      />
    </>
  );
};

export default Percentile;
