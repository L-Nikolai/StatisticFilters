import React, {useState}  from "react";
import  styles  from './topN.module.css';

const TopN = () => {

    const [isValid, changeIsValid] = useState(true)

   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const {value} = event.target

        if (parseInt(value,10) >= 1){
            changeIsValid(true)
            } else {
             changeIsValid(false)
         }
            
       
    }

    return(

        
            <input  className = {styles.top + " " + (isValid?"":styles.invalid)}
            type="number"
            onChange={onChange}
            defaultValue="1"
            aria-label="topn"
            />                   
        
    )
}

export default TopN;