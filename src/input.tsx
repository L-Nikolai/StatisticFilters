import React from "react";
import styles from './input.module.css'

const Input = (isValid:boolean) => {
    return (
        <input
      className={styles.input_stile + " " + (isValid ? "" : styles.invalid)}
      type="number"
        />
    )
}

export default Input