import React, { useCallback } from "react";
import Input from "./input";
import { getValue } from "./percentile";

interface Range {
  minRange: number;
  maxRange: number;
  changeRange: (value: [number, number]) => void;
  minValue : number;
  maxValue : number;
}
const inRange = (minV:number,maxV:number,value:number)=> value>=minV && value<=maxV


const Range = ({ minRange, maxRange, changeRange,minValue,maxValue }: Range) => {
  let isValid = minRange < maxRange;
  const changeMinRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);
      const isRange =inRange(minValue,maxValue,numValue)
      console.log(isRange)
      if (isRange)  { 
      changeRange([numValue, maxRange]);
      } else {
        isValid = false
      }
    },
    [minRange, maxRange]
  );

  const changeMaxRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = getValue(event);
      const isRange =inRange(minValue,maxValue,numValue)
      console.log(isRange)
      if (isRange) { 
        changeRange([minRange, numValue]);
      }
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
