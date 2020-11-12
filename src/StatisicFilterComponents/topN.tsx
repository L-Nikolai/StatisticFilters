import React, { useCallback, useState } from "react";
import Input from "./input";
interface TopN {
  
  changeTopN : (value:number) => void
}

const TopN = (prop: TopN) => {
  const [isValid, changeIsValid] = useState(true);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    prop.changeTopN (parseInt(value, 10))
    if (parseInt(value, 10) >= 1) {
      changeIsValid(true);
    } else {
      changeIsValid(false);
    }
  }, []);

  return (
    <Input
      isValid={isValid}
      onChange={onChange}
      defaultValue={1}
      label="topn"
    />
  );
};

export default TopN;
