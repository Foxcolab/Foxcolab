import React, { useEffect, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ReloadIcon } from '@radix-ui/react-icons'

interface Props {
    marks: number
    time:number
    testName:string
    submitting:boolean
    submitTest:any
    length: number
    createdAt:any
}


function RightHeader({marks, time, testName,  submitting, submitTest, length, createdAt}:Props) {
    const [open, setOpen] = useState(false);
    let testDuration = time*60;
    const [timeRemaining, setTimeRemaining] = useState(testDuration);
    let startTime = Math.floor(new Date(createdAt).getTime()/1000);


    useEffect(() => {
      const interval = setInterval(() => {
          if(timeRemaining<0) return;
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const elapsedTime = currentTime - startTime;
        const remainingTime = testDuration - elapsedTime;
        
        setTimeRemaining(remainingTime);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [startTime, testDuration]);

    useEffect(() => {
      if (timeRemaining <= 0) {
        submitTest(); // Call your function to submit the test automatically
      }
    }, [timeRemaining]);

    const formatTime = (seconds:number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


  return (
    <>
    
    <div className="question_r_header py-2 px-4  " style={{borderBottom:"1px solid #656c64"}}>
        <div className="flex justify-between items-center">
            <div className='flex items-center gap-4'>
                <div className='text-sm font-bold'> Marks: 0{marks}</div>
                <div className='cursor-pointer' onClick={()=>setOpen(true)}><FaInfoCircle/></div>
            </div>
            <div className='flex items-center gap-4 question_ri_btns'>
                
                  {submitting ? 
                  <>
                  <span className='text-sm flex items-center gap-1'> Submitting <ReloadIcon className="mr-2  w-4 animate-spin " /></span>
                  </>
                   : 
                  <>
                  <div className='time'>
                  {formatTime(timeRemaining)}
                  </div>
                  <div className='submit bg-green-500 text-white hover:bg-green-600'><button onClick={submitTest}>Submit</button></div>
                   </> 
                  }
               
                
            </div>
        </div>
    </div>


    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-gray-800 text-gray-300">
        <DialogHeader>
          <DialogTitle>Instruction</DialogTitle>
        </DialogHeader>

        <div className="test_ins">
        <div className="font-bold text-xl">{testName}</div>
        <div className='text-lg'>{length} questions,  {time} minutes</div>
        <div className='py-0 px-4 bg-gray-700 rounded'>
        <ul className='list-disc p-4 '>
            <li><div className='pb-2'>Test duration is <span className='font-bold'>{time} minutes</span>  </div></li>
            <li><div className='pb-2'>If test is completed before time, click on <span className='font-bold'>"Submit"</span> to submit it.</div></li>
            <li><div className='pb-2'>You can jump any question by the questions dropdown.</div></li>
            <li><div className='pb-2'>Your responses will be autosaved.</div></li>
            <li><div className='pb-2'>The timer gets over, your responses at that time will get auto-submited</div></li>
        </ul>
        
        </div>
        
        
        
        </div>
       
      </DialogContent>
    </Dialog>


    </>
  )
}

export default RightHeader