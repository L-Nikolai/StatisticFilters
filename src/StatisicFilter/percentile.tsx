import React, { useCallback } from "react";
import Input from "./input";

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
      />
      <Input
        isValid={isValid}
        value={secondPercentileValue}
        onChange={onSecondChange}
        label="inputsecond"
      />
    </>
  );
};

export default Percentile;
