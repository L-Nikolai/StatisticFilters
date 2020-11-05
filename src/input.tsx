import React from "react";
import styles from "./input.module.css";
interface Input {
  isValid: boolean;
  defaultValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
const Input = ({ isValid, label, onChange, defaultValue }: Input) => {
  return (
    <input
      className={styles.input_stile + " " + (isValid ? "" : styles.invalid)}
      type="number"
      aria-label={label}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
