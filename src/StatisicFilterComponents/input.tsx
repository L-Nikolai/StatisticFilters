import React from "react";
import styles from "../style.module.css";
interface Input {
  isValid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  topN?: number;
  defaultValue?: number
}
const Input = ({ isValid, label, onChange ,topN, defaultValue}: Input) => {
  return (
    <input
      className={styles.input_stile + " " + (isValid ? "" : styles.invalid)}
      type="number"
      aria-label={label}
      onChange={onChange}
      defaultValue={defaultValue}
      value = {topN}
    />
  );
};

export default Input;
