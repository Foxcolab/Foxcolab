import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
  import { CalendarIcon } from "@radix-ui/react-icons"
  import { format } from "date-fns"
   
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  import { Calendar } from "@/components/ui/calendar"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { GoClockFill } from 'react-icons/go'
import { time } from 'console'
import Loader from '../../Loaders/Loader'



const times = [
    {
        name:"12:00AM",
        value:"00:00"
    },
    {
        name:"12:30AM",
        value:"00:30"
    },
    {
        name:"01:00AM",
        value:"01:00"
    },
    {
        name:"01:30AM",
        value:"01:30"
    },
    {
        name:"02:00AM",
        value:"02:00"
    },
    {
        name:"02:30AM",
        value:"02:30"
    },
    {
        name:"03:00AM",
        value:"03:00"
    },
    {
        name:"03:30AM",
        value:"03:30"
    },
    {
        name:"04:00AM",
        value:"04:00"
    },
    {
        name:"04:30AM",
        value:"04:30"
    },
    {
        name:"05:00AM",
        value:"05:00"
    },
    {
        name:"05:30AM",
        value:"05:30"
    },
    {
        name:"06:00AM",
        value:"06:00"
    },
    {
        name:"06:30AM",
        value:"06:30"
    },
    {
        name:"07:00AM",
        value:"07:00"
    },
    {
        name:"07:30AM",
        value:"07:30"
    },
    {
        name:"08:00AM",
        value:"08:00"
    },
    {
        name:"08:30AM",
        value:"08:30"
    },
    {
        name:"09:00AM",
        value:"09:00"
    },
    {
        name:"09:30AM",
        value:"09:30"
    },
    {
        name:"10:00AM",
        value:"10:00"
    },
    {
        name:"10:30AM",
        value:"10:30"
    },
    {
        name:"11:00AM",
        value:"11:00"
    },
    {
        name:"11:30AM",
        value:"11:30"
    },
    {
        name:"12:00PM",
        value:"12:00"
    },
    {
        name:"12:30PM",
        value:"12:30"
    },
    {
        name:"01:00PM",
        value:"13:00"
    },
    {
        name:"01:30PM",
        value:"13:30"
    },
    {
        name:"02:00PM",
        value:"14:00"
    },
    {
        name:"02:30PM",
        value:"14:30"
    },
    {
        name:"03:00PM",
        value:"15:00"
    },
    {
        name:"03:30PM",
        value:"15:30"
    },
    {
        name:"04:00PM",
        value:"16:00"
    },
    {
        name:"04:30PM",
        value:"16:30"
    },
    {
        name:"05:00PM",
        value:"17:00"
    },
    {
        name:"05:30PM",
        value:"17:30"
    },
    {
        name:"06:00PM",
        value:"18:00"
    },
    {
        name:"06:30PM",
        value:"18:30"
    },
    {
        name:"07:00PM",
        value:"19:00"
    },
    {
        name:"07:30PM",
        value:"19:30"
    },
    {
        name:"08:00PM",
        value:"20:00"
    },
    {
        name:"08:30PM",
        value:"20:30"
    },
    {
        name:"09:00PM",
        value:"21:00"
    },
    {
        name:"09:30PM",
        value:"21:30"
    },
    {
        name:"10:00PM",
        value:"22:00"
    },
    {
        name:"10:30PM",
        value:"22:30"
    },
    {
        name:"11:00PM",
        value:"23:00"
    },
    {
        name:"11:30PM",
        value:"23:30"
    }
    
]

interface Props {
    open:boolean
    setOpen:any
    setScheduleTime:any
    onSubmit:any
    form:any
    loading:boolean
}

function Schedule({open, setOpen, setScheduleTime, onSubmit, form, loading}:Props) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [hhmm, setHhmm] = useState('00:00');
    
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);

    const disabledDays = [
        {from:new Date(1947,8, 15 ),  to: prev_date }
      ];

    useEffect(()=>{
        const currentTime = new Date();
        const hh = currentTime.getHours();
        const mm = currentTime.getMinutes();
        const currentHHMM = `${hh}:${mm}`;

        console.log(currentHHMM);
        let i=0;
        while(times[i].value<currentHHMM){
            console.log(times[i].value, currentHHMM)
            i++;
        }
        setHhmm(times[i].value);
    }, [])  
    const TimeDisable =(value:string)=>{
        let [hour, minute] = value.split(':');
        const yy = date?.getFullYear();
        const mm = date?.getMonth() + 1;
        const dd = date?.getDate();
        let dtt = (`${yy}-${mm}-${dd}, ${hour}:${minute}:00`);
        const selectedDate = new Date(dtt);
        let currentDate = new Date();
        if(selectedDate<=currentDate){
            return true;
        }else {
            return false;
        }

    }   

    const ScheduleHandler =async()=>{
        const [hour, tm] = hhmm.split(':');
        const yy = date?.getFullYear();
        const mm = date?.getMonth() + 1;
        const dd = date?.getDate();
        let dtt = (`${yy}-${mm}-${dd}, ${hour}:${tm}:00`);
        const neDt = new Date(dtt);
        
        setScheduleTime(neDt)
        console.log("SCheul", form.getValues("content"));
        const content=form.getValues("content");
        const contentText=form.getValues("contentText");
        const fileUrl=form.getValues("fileUrl");
        const sttt=neDt;
        console.log(sttt);
        await onSubmit({content, contentText, fileUrl, scheduleTime:neDt});
        setOpen(false)
    }

    // const selectedCheck =()=>{
       
    // }

    // selectedCheck()


  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            
        </DialogTrigger>
  <DialogContent className='max-w-[560px]'>
    <DialogHeader>
      <DialogTitle>Schedule a message</DialogTitle>
      
    </DialogHeader>
    <hr />
    <div className='my-4'>
        <div className='flex items-center justify-between'>

        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={disabledDays}
        />
      </PopoverContent>
    </Popover>
        

        <div className='inline-flex items-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 pr-2 pl-4 w-[240px] justify-start text-left font-normal'>
            <div className='text-lg'><GoClockFill/> </div>
            <select name="" id="" className='px-1 py-2 w-full bg-transparent outline-none border-none' onChange={(e)=>setHhmm(e.target.value)}>
                {times.map((time)=>(
                    <option value={time.value} selected={hhmm===time.value} disabled={TimeDisable(time.value)}>{time.name}</option>
                ))}
            </select>
        </div>



        </div>
    </div>
    <DialogFooter className='mt-2'>
        {
            loading ? <Loader/> : <>
            <Button className='bg-transparent hover:bg-transparent border text-black dark:text-white' onClick={()=>setOpen(false)}>Cancel</Button>
        <Button className='bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2' onClick={ScheduleHandler}>Schedule Message</Button>
            </>
        }
        
    </DialogFooter>
  </DialogContent>
</Dialog>
    
    </>
  )
}

export default Schedule