import { resolveSoa } from "dns";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import Chance from "chance";
import styles from "./input.module.css";


interface View {
  topN : number
}
const chance = new Chance();


const Row = (props: { data: number[] }): React.ReactElement => {
  const data = props.data;
  const renderCell = data.map((item, index) => <td className ={styles.cell} key={index}>
    {item }</td>);
  return <tr>{renderCell}</tr>;
};

const View = (props: View) => {
  const topN = props.topN
  
  const getData = (colums: number, rows: number): number[][] => {
    const date: number[][] = [];

    for (let rowIndex = 0; rowIndex < colums; rowIndex++) {
      date[rowIndex] = [];
      for (let columIndex = 0; columIndex < rows; columIndex++) {
        const randomNum: number = chance.integer({ min: -100, max: 100 });
        date[rowIndex][columIndex] = randomNum;
      }
    }

    return date;
  };

  const data = getData(10, 10);
  const topNSort = data.flat().sort((a,b)=>b-a).slice(0,topN)

  const sortN = () => {
    const flatData =data.flat()
    const sorted = []
    
      for (let i=0; i<=flatData.length; i++) {
       
         if (flatData[i]>10){
            sorted.push(flatData[i])
         }
        
      }
      return sorted
  }
  console.log(sortN())
  const selectedItems = [[3,4]]

  return (
    <>
    <table>
      {data.map((item, index) => {
        return <Row key={index} data={item} />;
      })}
    </table>
    <h1>{topNSort.join(' ')}</h1>
    </>
  
  );


};

export default View;
