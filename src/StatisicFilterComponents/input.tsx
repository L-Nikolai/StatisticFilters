import React from "react";
import styles from "../style.module.css";
interface Input {
  isValid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value?: number;
  defaultValue?: number
}
const Input = ({ isValid, label, onChange ,value, defaultValue}: Input) => {
  return (
    <input
      className={styles.input_stile + " " + (isValid ? "" : styles.invalid)}
      type="number"
      aria-label={label}
      onChange={onChange}
      defaultValue={defaultValue}
      value = {value}
    />
  );
};

export default Input;
