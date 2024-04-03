import { format } from 'date-fns'
import React, { useState } from 'react'
const DATE_FORMAT2 = "d MMM yyyy";

interface DividorProps {
  timestamp:string,
  nextTime:string
}

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