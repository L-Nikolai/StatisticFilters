import React, { useCallback } from "react";
import Input from "./input";
import { getValue } from "./percentile";

interface Range {
  minRange: number;
  maxRange: number;
  changeRange: (value: [number, number]) => void;
  minValue: number;
  maxValue: number;
}
const inRange = (minV: number, maxV: number, minR: number, maxR: number) =>
  minV >= minR && maxV <= maxR;

const Range = ({
  minRange,
  maxRange,
  changeRange,
  minValue,
  maxValue,
}: Range) => {
  const isValid =
    minValue < maxValue && inRange(minValue, maxValue, minRange, maxRange);

  const changeMinRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);
      changeRange([numValue, maxValue]);
    },
    [changeRange, maxValue]
  );

  const changeMaxRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);
      changeRange([minValue, numValue]);
    },
    [changeRange, minValue]
  );

  return (
    <>
      <Input
        value={minValue}
        onChange={changeMinRange}
        isValid={isValid}
        label="firstInputRange"
      />
      <Input
        value={maxValue}
        onChange={changeMaxRange}
        isValid={isValid}
        label="secondInputRange"
      />
    </>
  );
};

export default Range;
