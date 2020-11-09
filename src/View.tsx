import { resolveSoa } from "dns";
import React from "react";
import reportWebVitals from "./reportWebVitals";

const Row = (props: { data: number[]}): React.ReactElement => {
    
  const data = props.data;
  const renderCell = data.map((item: number)=> (
    <td key = {item}>{item}</td>
  ));
  return <tr>{renderCell}</tr>;
};

const View = () => {
  const getData = (colums: number, rows:number): number[][]=> {
      const date: number[][] = []
      
            
      for (let rowIndex=0; rowIndex<colums; rowIndex++){
          date[rowIndex] = []
            for (let columIndex=0; columIndex<rows; columIndex++ ){

          date[rowIndex][columIndex] = (rowIndex*10)+(columIndex+1)
       }
      } 
       
        return date
  };
 
  const data = getData(10,10)
  return (
    <table>
       {data.map((item:number[]) => {
        return <Row data={item}/>
        })}
    </table>
  );
};

export default View;
