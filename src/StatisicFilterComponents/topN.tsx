import React, { useCallback, useState } from "react";
import Input from "./input";
interface TopN {
  
  changeTopN : (value:number) => void
  topN:number
}

const TopN = (prop: TopN) => {
  const [isValid, changeIsValid] = useState(true);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    prop.changeTopN (parseInt(value, 10))
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
      topN={prop.topN}
    />
  );
};

export default TopN;
