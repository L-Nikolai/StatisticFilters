import React, { useCallback, useState } from "react";
import Input from "./input";
import { getValue } from "./percentile";

interface Range {
  minRange: number
  maxRange: number
 changeRange: (value:[number, number]) => void;
}


const checkedRange = (numValue: number): boolean =>
  numValue >= -100 && numValue <= 100;

const Range = (prop : Range) => {
  const [isValid, changeIsValid] = useState(true);
  const minRange = prop.minRange
  const maxRange = prop.maxRange
  const changeRange = prop.changeRange

  const changeMinRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);
      const inRange = checkedRange(numValue);
      changeIsValid(inRange);

      if (numValue >= maxRange) {
        changeIsValid(false);
      }
      changeRange([numValue, maxRange]);
    },
    [minRange, maxRange]
  );

  const changeMaxRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);
      const inRange = checkedRange(numValue);
      changeIsValid(inRange);

      if (minRange >= numValue) {
        changeIsValid(false);
      }
      changeRange([minRange, numValue]);
    },
    [minRange, maxRange]
  );

  return (
    <>
      <Input
        defaultValue={-100}
        onChange={changeMinRange}
        isValid={isValid}
        label="firstInputRange"
      />
      <Input
        defaultValue={100}
        onChange={changeMaxRange}
        isValid={isValid}
        label="secondInputRange"
      />
    </>
  );
};

export default Range;
