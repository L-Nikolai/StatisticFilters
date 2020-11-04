import React, { useState }  from 'react';
import styles from './percentile.module.css';


const Percentile = () => {

     const [firstInput, setFirstInput] = useState(0)
     const [secondInput, setSecondInput] = useState(100)

     const [isValid, changeIsValid] = useState(true)
     
    

     const onFirstChange = (event:React.ChangeEvent<HTMLInputElement>) => {
          const  {value} =  event.target
          
          const numValue = parseFloat(value)
          
          
          if (numValue >0 && numValue <100){
           setFirstInput(numValue)
          } 
          if  (value === ""){
               setFirstInput(0)
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

     const CheckError = () => {
          if (firstInput > secondInput) {
               
            return <Error/>   
          } else {
               return <Success/>
          }
     }
     

    return ( 

          
            < >
               
                <input className = {styles.percentile + " " + (isValid?"":styles.invalid)} 
                    value={firstInput}
                    onChange = {onFirstChange}
                    aria-label="inputone"/>
                 <input className = {styles.percentile + " " + (isValid?"":styles.invalid)}
                    value={secondInput}
                    onChange = {onSecondChange}
                    aria-label="inputsecond"/>
                <CheckError/>  

                   
            </>   
   )
}

export default Percentile