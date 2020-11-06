import React from "react";

const View = () => {
  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const CellsList = (props: { data: number[] }): React.ReactElement => {
    const data = props.data;
    const renderCell = data.map((cell: number) => (
      <td key={cell.toString()}>{cell}</td>
    ));
    return <tr>{renderCell}</tr>;
  };

  const Board = () => {
    return (
      <>
        {data.map(() => {
          return <CellsList data={data} />;
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
