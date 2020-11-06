import React from "react";

const View = () => {
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const CellsList = (props:{data:number[]}): React.ReactElement => {
    const data = props.data;
    const renderCell = data.map((cell: number) => 
      
      <td key={cell.toString()}>{cell}</td>
    )
        return <tr>{renderCell}</tr>;        
  };

               
  

  return (
    <>
      <CellsList data={data} />
    </>
  );
};

export default View;
