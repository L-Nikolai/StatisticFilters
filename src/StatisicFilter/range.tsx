import React, { useCallback} from "react";
import Input from "./input";
import { getValue } from "./percentile";

interface Range {
  minRange: number;
  maxRange: number;
  changeRange: (value: [number, number]) => void;
}


const Range = ({ minRange, maxRange, changeRange }: Range) => {
  const isValid = minRange<maxRange
  const changeMinRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);

      changeRange([numValue, maxRange]);
    },
    [minRange, maxRange]
  );

  const changeMaxRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);
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
