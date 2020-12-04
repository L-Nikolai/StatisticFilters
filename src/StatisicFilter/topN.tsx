import React, { useCallback, useState } from "react";
import Input from "./input";
interface TopN {
  changeValue: (value: number) => void;
  value: number;
}

const TopN = ({ value, changeValue }: TopN) => {
  const isValid = value >= 1;
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      changeValue(parseInt(value, 10));
    },
    [changeValue]
  );

  return (
    <Input isValid={isValid} onChange={onChange} label="topn" value={value} />
  );
};

export default TopN;
