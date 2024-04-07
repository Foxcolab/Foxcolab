import { format } from 'date-fns'
import React from 'react'


const DATE_FORMAT = "MMMM dd, yyyy";

function Dividor2({timeStamp}:{timeStamp:string}) {
  return (
    <>
    
    <div className="dividor2">
                  <span >
                   
                  
                    {format(new Date(timeStamp), DATE_FORMAT)}
                  </span>
                </div>
    
    </>
  )
}

export default Dividor2