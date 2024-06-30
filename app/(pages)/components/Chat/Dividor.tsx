import { format } from 'date-fns'
import React, { useState } from 'react'
const DATE_FORMAT2 = "MMMM dd, yyyy";

interface DividorProps {
  timestamp:string,
  nextTime:string
}
// march 25, 2024

function Dividor({timestamp}:DividorProps) {
    
    
    function checkDate(dateToCheck:any) {
      let today = new Date();
      let yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
  
      let checkDate = new Date(dateToCheck);
  
      if (checkDate.toDateString() === today.toDateString()) {
          return 'Today';
      } else if (checkDate.toDateString() === yesterday.toDateString()) {
          return 'Yesterday';
      } else {
          return format(new Date(checkDate), DATE_FORMAT2);
      }
  }

  return (
    <>
    
    <div className="dividor">
                  <span >
                   
                  
                    {checkDate(timestamp)}
                  </span>
                </div>
    </>
  )
}

export default Dividor