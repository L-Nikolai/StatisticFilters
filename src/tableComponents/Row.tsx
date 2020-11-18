import React, { MouseEventHandler } from "react";
import styles from "../style.module.css";

export type DataItem = {
  value: number;
  highlight: boolean;
};
export interface RowInterface {
  data: DataItem[];
  handleClick: MouseEventHandler;
}

const Row = (props: RowInterface): React.ReactElement => {
  const data = props.data;

  const renderCells = data.map((item, index) => (
    <td
      style={{ color: item.highlight ? "blue" : "grey" }}
      className={styles.cell}
      key={index}
      onClick={props.handleClick}
      aria-label="cell"
    >
      {item.value}
    </td>
  ));
  return (
    <tr aria-label="row" className={styles.row}>
      {renderCells}
    </tr>
  );
};

export default Row;
