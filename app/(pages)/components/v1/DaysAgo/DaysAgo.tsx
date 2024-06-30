import React from 'react'


interface Props {
    date: any
}
function DaysAgo({date}:Props) {

    const CalculateDays=(dt:any)=>{
        dt = new Date(date);
        const currentDate = new Date();
        let pastDateString = '2023-01-15';

        let timeDifference = currentDate.getTime() - dt.getTime();

        // Convert milliseconds to days
        let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        console.log(daysDifference)
        return daysDifference;
    }

  return (

    <div>
        {CalculateDays(date)===0 ? "Today" : `${CalculateDays(date)} days ago`} 
    </div>
    
  )
}

export default DaysAgo