import React, { useContext } from "react";
import { DisableContext } from "./App";

const DesableButton = () => {
  const { disabled, changeDisabled } = useContext(DisableContext);
  const handleClick = () => {
    changeDisabled(!disabled);
  };

  return <button onClick={handleClick}>Desable!</button>;
};

export default DesableButton;
