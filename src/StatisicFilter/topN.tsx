import React, { useCallback, useContext } from "react";
import Input from "./input";
import { DisableContext } from "../App";

interface TopN {
  changeValue: (value: number) => void;
  value: number;
}

const TopN = ({ value, changeValue }: TopN) => {
  const { disabled } = useContext(DisableContext);

  const isValid = value >= 1;
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      changeValue(parseInt(value, 10));
    },
    [changeValue]
  );

  return (
    <Input
      isValid={isValid}
      onChange={onChange}
      label="topn"
      value={value}
      disabled={disabled}
    />
  );
};

export default TopN;
