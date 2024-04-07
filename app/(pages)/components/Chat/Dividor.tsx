import { format } from 'date-fns'
import React, { useState } from 'react'
const DATE_FORMAT2 = "MMMM dd, yyyy";

interface DividorProps {
  timestamp:string,
  nextTime:string
}
// march 25, 2024

function Dividor({timestamp}:DividorProps) {
    
    // if(nextTime!==undefined){
    //   console.log(time1,format(new Date(nextTime), DATE_FORMAT2), time1===format(new Date(nextTime), DATE_FORMAT2) )

    // }
  return (
    <>
    
    <div className="dividor">
                  <span >
                   
                  
                    {format(new Date(timestamp), DATE_FORMAT2)}
                  </span>
                </div>
    </>
  )
}

export default Dividor