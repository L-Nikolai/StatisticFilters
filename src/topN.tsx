import React, { useCallback, useState } from "react";
import Input from "./input";

const TopN = () => {
  const [isValid, changeIsValid] = useState(true);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

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
