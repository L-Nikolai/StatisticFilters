import { resolveSoa } from "dns";
import React from "react";

const View = () => {
  const getData = (colums: number)=> {
      const date = [];
      
      for (let i=0; i<colums; i++){
          date.push(i+1)
      
      }

        return date
  };
 

  const CellsList = (props: { data: number[]}): React.ReactElement => {
    const data = props.data;
    const renderCell = data.map((item: number)=> (
      <td key = {item}>{item}</td>
    ));
    return <tr>{renderCell}</tr>;
  };

  const Board = () => {
    return (
      <>
        {getData(6).map(() => {
          return <CellsList  data={getData(5)} />;
        })}
      </>
    );
  };

  return (
    <table>
      <Board />
    </table>
  );
};

export default View;
