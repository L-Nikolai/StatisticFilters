import React, {useCallback, useState} from 'react';
import Check from './chek'



const App = ()=>{
  
  const [percentile, setPercentile] = useState(true)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement> ) =>{
      const { value } = event.target
      
        if (value === "Percentile"){  
          setPercentile(true)
        } else setPercentile(false)
    }, []
  )


   

  return(

    <>
  
      <select 
      onChange={handleChange}
      defaultValue="Percentile"
      > 
        <option  value="Percentile"> Percentile </option>
        <option  value="TopN"> TopN </option>
      </select>
        <Check
        percentile={percentile}
       
        />
   </>
  
  )
}

export default App;
