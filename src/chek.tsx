import React  from 'react';
import Percentile from './percentile';
import TopN from './topN';

const Check = ({percentile}:{percentile:boolean}) => {

   

    return(
        
                percentile? <Percentile
                /> :
                <TopN
                />
       
    )
}

export default Check;