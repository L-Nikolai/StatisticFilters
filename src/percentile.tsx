import React, { useState }  from 'react';
import styles from './percentile.module.css';


const Percentile = () => {

     
     const [secondInput, setSecondInput] = useState(100)

     const [isValid, changeIsValid] = useState(true)
     
    

     const onFirstChange = (event:React.ChangeEvent<HTMLInputElement>) => {
          const  {value} =  event.target
          
          const numValue = parseFloat(value)
          
          
          if (numValue >0 && numValue <100){
           
          } 
          if  (value === ""){
              
          }
     }

     const onSecondChange = (event:React.ChangeEvent<HTMLInputElement>) => {
          const  {value} =  event.target
          const numValue = parseFloat(value)
          
          
          if (numValue >0 && numValue <=100){
           setSecondInput(numValue)
          } 
          if  (value === ""){
               setSecondInput(0)
          }
     } 


     const Error = () => {
        return  <h1> Error </h1>
     } 
     
     const Success = () => {
         return <h2> Success</h2>  
     }

     
     

    return ( 

          
            < >
               
                <input className = {styles.percentile + " " + (isValid?"":styles.invalid)}
                    type='number' 
                    defaultValue={0}
                    onChange = {onFirstChange}
                    aria-label="inputone"/>
                 <input className = {styles.percentile + " " + (isValid?"":styles.invalid)}
                    value={secondInput}
                    onChange = {onSecondChange}
                    aria-label="inputsecond"/>
                 

                   
            </>   
   )
}

export default Percentile