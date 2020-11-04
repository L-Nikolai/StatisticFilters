import React, { useState } from "react";
import styles from "./percentile.module.css";

const Percentile = () => {
  

  const [isValid, changeIsValid] = useState(true);

  const onFirstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (parseFloat(value) >= 0 && parseFloat(value) < 100) {
    changeIsValid(true) }
    else {
         changeIsValid(false)
    }
    
  };

  const onSecondChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    
    if (parseFloat(value) >= 0 && parseFloat(value) <= 100) {
     changeIsValid(true) 
    } else{
     changeIsValid(false) 
    }
  };

  if (onFirstChange >= onSecondChange){
     changeIsValid(false) 
  }

 
  return (
    <>
      <input
        className={styles.percentile + " " + (isValid ? "" : styles.invalid)}
        type="number"
        defaultValue={0}
        onChange={onFirstChange}
        aria-label="inputone"
      />
      <input
        className={styles.percentile + " " + (isValid ? "" : styles.invalid)}
        defaultValue={90}
        onChange={onSecondChange}
        aria-label="inputsecond"
      />
    </>
  );
};

export default Percentile;
