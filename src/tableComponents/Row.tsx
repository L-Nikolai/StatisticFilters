import React, { MouseEventHandler } from "react";
import styles from "../style.module.css";

export interface RowInterface {
  data: number[];
  handleClick: MouseEventHandler;
  colored: boolean[];
}

const Row = (props: RowInterface): React.ReactElement => {
  const data = props.data;
  const colored = props.colored;

  const renderCells = data.map((item, index) => (
    <td
      style={{ color: colored[index] ? "blue" : "grey" }}
      className={styles.cell}
      key={index}
      onClick={props.handleClick}
      aria-label="cell"
    >
      {item}
    </td>
  ));
  return (
    <tr aria-label="row" className={styles.row}>
      {renderCells}
    </tr>
  );
};

export default Row;
