import React, { useState, useEffect, useCallback } from "react";
import Input from './input'

const checkRange = (numValue: number):boolean =>  numValue >= 0 && numValue <= 100

const Percentile = () => {
  const [isValid, changeIsValid] = useState(true);
  const [[firstValue, secondValue], changeValues] = useState([0, 100]);

  const onFirstChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const numValue = parseFloat(value);
      
      const inRange = checkRange(numValue)
      changeIsValid(inRange)

      if (numValue >= secondValue) {
        changeIsValid(false);
      } 
      changeValues([numValue, secondValue]);
    },
    [firstValue, secondValue]
  );

  const onSecondChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const numValue = parseFloat(value);

      const inRange = checkRange(numValue)
      changeIsValid(inRange)

      if (firstValue >= numValue) {
        changeIsValid(false);
      } 
      changeValues([firstValue, numValue]);
    },
    [firstValue, secondValue]
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
