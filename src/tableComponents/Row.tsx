import React, { MouseEventHandler } from "react";
import styles from "../style.module.css";

const sortN = (firstData:number[], secondData:number[]):boolean[] => {
    const sorted = [];
  
    for (let i = 0; i <firstData.length; i++) {
      let havedEquelsvalue = false;
      for (let j = 0; j < secondData.length; j++){
      if (firstData[i] === secondData[j]) {
         havedEquelsvalue = true;
        }
    }
    sorted.push(havedEquelsvalue);
  } 
    
    return sorted
  };

  
    
interface Row {
    topNSort: number [];
    data : number[];
    handleClick : MouseEventHandler
    
  }

const Row = (props: Row ): React.ReactElement => {
    
    const data = props.data;
    const topNSort = props.topNSort;
    const colored = sortN(data.flat(),topNSort)
    
    const renderCell = data.map((item, index) => (  
      <td 
      style={{ color: colored[index] ? "blue" : "grey" }} 
      className={styles.cell} 
      key={index}
      onClick={props.handleClick}>
        {item}
      </td>
    ));
    return <tr>{renderCell}</tr>;
  };
  
  
    
 export default Row   