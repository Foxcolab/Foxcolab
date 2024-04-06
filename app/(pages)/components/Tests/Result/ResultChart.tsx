import React, { useEffect } from 'react'
import { FaClock, FaRegCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'
import { Doughnut } from "react-chartjs-2";
import { Progress } from "@/components/ui/progress"
import {Chart, ArcElement} from 'chart.js'
import { useTheme } from 'next-themes';
Chart.register(ArcElement);

interface Props {
    totalTime:number
    startingTime:Date
    submitTime:Date
    attempt:number
    isPass:boolean
    totalQuestion:number
    totalRight:number
    obtainMarks:number
    totalMarks:number
}

function ResultChart({totalTime, submitTime,startingTime, attempt,isPass, totalQuestion, totalRight, totalMarks, obtainMarks }:Props) {
    const percentage =Math.floor((obtainMarks/totalMarks)*100);
    const pt2 = 100-percentage;
  const xValues = ["Obtain Mark", "Full Marks"];
  const yValues = [percentage, 100-percentage];
  const barColors = ["#ff7100", "white"];
  const {resolvedTheme} = useTheme()

    useEffect(() => {
        if (typeof window !== 'undefined') {


          Chart.register(
            {
              id: 'doughnutCenterText',
              afterDraw: (chart) => {
                const ctx = chart.ctx;
                const width = chart.width;
                const height = chart.height;
    
                ctx.save();
    
                const text = `${percentage}%`;
                const fontSize = 30;
                const fontFamily = 'Arial';

                const fontColor = resolvedTheme==="dark"?'rgb(203 213 225)' : "#484a4d";
    
                ctx.fillStyle = fontColor;
                ctx.font = `${fontSize}px ${fontFamily}`;
                ctx.textBaseline = 'middle';
    
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2.5;
                ctx.fillText(text, textX, textY);

                const text2 = `${totalRight}/${totalQuestion} p`;
                const fontSize2 = 18;
                const fontFamily2 = 'Arial';
                const fontColor2 =resolvedTheme==="dark"? '#b7c3cc': "#808183";
      
                ctx.fillStyle = fontColor2;
                ctx.font = `${fontSize2}px ${fontFamily2}`;
                ctx.textBaseline = 'middle';
      
                const text2X = Math.round((width - ctx.measureText(text2).width) / 2);
                const text2Y = height / 2 + 15;
      
                ctx.fillText(text2, text2X, text2Y);



                ctx.restore();
              },
            },
          );
         
        }
      }, []);
    



    submitTime = new Date(submitTime);
    startingTime = new Date(startingTime);
    const gethhmm = startingTime.getHours() + ":" + startingTime.getMinutes();
    const endhhmm = submitTime.getHours() + ":" + submitTime.getMinutes();

    // diference 

    function calculateDuration(startTime:Date, endTime:Date) {
        let difference = endTime.getTime() - startTime.getTime();
        let hours = Math.floor(difference / (1000 * 60 * 60));
        difference %= 1000 * 60 * 60;
        let minutes = Math.floor(difference / (1000 * 60));
        difference %= 1000 * 60;
        let seconds = Math.floor(difference / 1000);
    
        const formattedHour= String(hours).padStart(2, '0');
        const formattedMin= String(minutes).padStart(2, '0');
        const formattedSec= String(seconds).padStart(2, '0');
        
        return `${formattedHour}:${formattedMin}:${formattedSec}`;
    }


    const diff = calculateDuration(startingTime, submitTime);

    function convertMinutesToHoursMinutesSeconds(minutes:number) {
        // Calculate hours
        const hours = Math.floor(minutes / 60);
        
        // Calculate remaining minutes
        const remainingMinutes = minutes % 60;
        
        // Calculate seconds
        const seconds = Math.floor((minutes - (hours * 60 + remainingMinutes)) * 60);
        const formattedHour= String(hours).padStart(2, '0');
        const formattedMin= String(remainingMinutes).padStart(2, '0');
        const formattedSec= String(seconds).padStart(2, '0');
        
        return `${formattedHour}:${formattedMin}:${formattedSec}`;
    }

     // 
     const day = startingTime.getDate(); // Get the day of the month (1-31)
const month = startingTime.getMonth() + 1; // Get the month (0-11), adding 1 to make it (1-12)
const year = startingTime.getFullYear(); // Get the year (e.g., 2024)

// To ensure two-digit format for day and month, add leading zeros if necessary
const formattedDay = String(day).padStart(2, '0');
const formattedMonth = String(month).padStart(2, '0');

const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;



// const options = {
//     cutoutPercentage: 70, // Adjust this value to change the size of the hole in the doughnut
//     animation: false, // Disable animation for better performance
//     tooltips: { enabled: false }, // Disable tooltips
//     legend: { display: false }, // Disable legend
//     plugins: {
//       doughnutCenterText: {
//         text: 'BLUEE', // Custom text to display in the center
//         color: 'white', // Color of the text
//         font: {
//           size: '20', // Font size of the text
//           weight: 'bold', // Font weight of the text
//         },
//       },
//     },
//   };

  return (
    <>
    <div className="flex w-full gap-4">
        <div className="respondent w-1/2">
            <label htmlFor="">RESULT</label>
            

            <div className='flex justify-between px-4'>
                <div className=''>
                {
                isPass ? <div className='flex items-center font-bold text-xl gap-1 pt-3 text-green-400'><FaRegCheckCircle/> Test Passed</div> : <div className='flex items-center font-bold text-xl gap-1 py-3 text-red-500'><RxCrossCircled/> Test Failed</div>
            }
                <div className='mt-4'>Respondent result is available</div>
                </div>
            <div className=''>
            <Doughnut
                className='donout-canvas chartjs-render-monitor'
                height={200}
                width={200}
                data={{
                    labels:xValues,
                    datasets:[
                        {
                            data:yValues,
                            backgroundColor:barColors,
                            // borderWidth: 1,
                            // borderRadius:10,
                            
                        }
                    ]
                }}
                options={{
                    cutout:80
                }}
            
            />
            </div>
              </div>

        </div>
        <div className="respondent w-1/2">
            <label htmlFor="">TIMER</label>
            <div className='flex items-center font-bold text-xl gap-1 py-3 '><FaClock/>Total Time</div>
            <div className='text-lg font-semibold'>{diff} / 
            <span className='text-gray-400'> {convertMinutesToHoursMinutesSeconds(totalTime)}</span> </div>
            <div className='mt-4'>
            <Progress color='red' className='progress_bar' value={33} />
            </div>
            <div className='flex w-full mt-4'>
            <div className='w-1/2'>
                <div className='pb-2'>Start Time: {gethhmm}</div>
                <div>End Time: {endhhmm}</div>
            </div>
            <div className='w-1/2'>
                <div className='pb-2'>Attempts: {attempt} </div>
                <div>Date: {formattedDate}</div>
            </div>
            </div>

        </div>
    </div>
    
    
    </>
  )
}

export default ResultChart