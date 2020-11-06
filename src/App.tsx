import React, { useCallback, useState } from "react";
import Check from "./chek";

const App = () => {
  const [percentile, setPercentile] = useState(true);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      

      if (value === "Percentile") {
        setPercentile(true);
      } else setPercentile(false);
    },
    []
  );

  return (
    <>
      <select
        onChange={handleChange}
        defaultValue="Percentile"
        aria-label="select"
      >
        <option value="Percentile" aria-label="percentile">
          Percentile
        </option>
        <option value="TopN" aria-label="topn">
          TopN
        </option>
      </select>
      <Check percentile={percentile} />
    </>
  );
};

export default App;
