import React from "react";
import StatisticFilters from "./statistic-filter";
import View from "./View";

// const Table = () => {

//     const [cell, setCell] = useState([])

//     useEffect(()=>{
//         getData(),[]
//     })

//     const getData = () => {
//         setCell(chance.integer())
//     }

//     const renderTable = () => {

//     }
// }

const App = () => {
  return (
    <>
      <View />
      <StatisticFilters />
    </>
  );
};

export default App;
