import React, { useCallback, useState } from "react";
import Input from "./input";
interface TopN {
  
  changeValue : (value:number) => void
  value:number
}

const TopN = (prop: TopN) => {
  const [isValid, changeIsValid] = useState(true);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    prop.changeValue (parseInt(value, 10))
    if (parseInt(value, 10) >= 1) {
      changeIsValid(true)
    } else {
      changeIsValid(false);
    }
  }, []);

  return (
    <Input
      isValid={isValid}
      onChange={onChange}
      label="topn"
      value={prop.value}
    />
  );
};

export default TopN;
