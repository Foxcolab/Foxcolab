"use client";
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { RxCross2 } from 'react-icons/rx'
import { MdOutlineRadioButtonChecked } from 'react-icons/md'
import { IoCheckbox } from 'react-icons/io5'
import { GoClockFill, GoPlus } from 'react-icons/go'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import Loader from '../Loaders/Loader';

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
}

function PollDialog({open,setOpen}:Props) {
  const [inputFields, setInputFields] = useState(['']);
  const [type, setType] = useState('singleChoice');
  const [question, setQuestion] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  // const [expirtyDate, setExpiryDate] = useState<Date | null>(null)
  const [date, setDate] = React.useState<Date | null>(null);
  const [hhmm, setHhmm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  var prev_date = new Date();
  prev_date.setDate(prev_date.getDate() - 1);

  const disabledDays = [
      {from:new Date(1947,8, 15 ),  to: prev_date }
    ];


  const handleChangeInput = (index:number, event:any) => {
    const values = [...inputFields];
    values[index] = event;
    setInputFields(values);
  };

  const handleAddInput = () => {
    setInputFields([...inputFields, '']);
  };

  const handleRemoveInput = (index:number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const SubmitHandler =async()=>{
    try {
      let expiryDate = null;
      if(date!==null){
        expiryDate= TimeHandler();
      }
      console.log(question, inputFields, type, anonymous, expiryDate);
      setLoading(true);
      
      const res = await axios.post(`/api/socket/messages/polls/new?serverId=${params?.id}&channelId=${params?.channelId}`, {question, options:inputFields, answerType:type, anonymous, expiryDate:expiryDate});
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

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
  
  const TimeHandler =()=>{
    const [hour, tm] = hhmm?.split(':');
        const yy = date?.getFullYear();
        const mm = date?.getMonth() + 1;
        const dd = date?.getDate();
        let dtt = (`${yy}-${mm}-${dd}, ${hour}:${tm}:00`);
        const neDt = new Date(dtt);
        return neDt;
  }

  const CalenderHandler =(e:any)=>{
    // setDate
    console.log(e)
    setDate(e);
    console.log(hhmm);
    if(hhmm===null){
      setHhmm("00:00");
    }
    console.log(hhmm)
    
  }


  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild className='flex items-center gap-2'>
      {/* <span className="text-[1.2rem]"><CgPoll/></span>Create Polls */}
       
      </DialogTrigger>
      <DialogContent className="sm:max-w-[675px] sm:h-[600px] sm:max-h-[600px] sm:min-h-0  overflow-hidden px-0" >
      <DialogHeader className='px-4'>
          <DialogTitle>Create a Poll</DialogTitle>
          <hr />
        </DialogHeader>

        <div className='overflow-scroll px-8'>
            <div className="my-4  ">
                <label htmlFor="" className='text-sm font-bold mb-4'>Answer type:</label>
                <div className="mt-2">
                <Select onValueChange={(e)=>setType(e)} defaultValue={type}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent defaultValue={type}>
        <SelectGroup>
          <SelectItem value="singleChoice" className='' > 
          <div className='flex items-center gap-2'><span className='text-lg'><MdOutlineRadioButtonChecked/></span> Single Choice</div>
          </SelectItem>
          <SelectItem value="multipleChoice" className='flex items-center gap-4'> 
          <div className='flex items-center gap-2'>
          <span className='text-lg'><IoCheckbox/></span> Multiple Choice
            </div>
            </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="" className='text-sm font-bold'>Question:</label>
                <div className="mt-2">
                <Textarea className='resize-none' onChange={(e)=>setQuestion(e.target.value)} />
                </div>
            </div>
            {
              inputFields.map((inputField, i)=>(
                <>
                <div key={i}>
                <div className='mb-4'>
                <label htmlFor="" className='text-sm font-bold'>Option {i+1}</label>
                <div className="mt-2 flex items-center gap-4">
                <Input type='text' onChange={(e)=>handleChangeInput(i, e.target.value)}  />
                <button onClick={()=>handleRemoveInput(i)} className='bg-red-500 rounded p-1 text-xl text-white hover:bg-red-600'><RxCross2/></button>
                </div>
               
            </div>
                </div>
                </>
              ))
              }
            <div>
              <button onClick={handleAddInput} className='flex items-center gap-1 px-3 py-[0.35rem] text-white rounded bg-green-500 text-sm font-semibold hover:bg-green-600 mb-4'><span className='text-lg'><GoPlus/></span> Add Option</button>
            </div>
            <div className='mb-4 flex justify-between items-center'>
                <label htmlFor="" className='text-sm font-bold'>Anonymous Response:</label>
                <div className="mt-2 flex items-center">
                <Switch onCheckedChange={(e)=>setAnonymous(e)} defaultChecked={anonymous} />
                </div>
            </div>
            <div>
              <label htmlFor="" className='text-sm font-bold'>Expiry Date</label>
              <div>
              <div className='flex items-center gap-4 mt-4'>

<Popover>
<PopoverTrigger asChild>
<Button
  variant={"outline"}
  className={cn(
    "w-[180px] justify-start text-left font-normal",
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
  onSelect={CalenderHandler}
  initialFocus
  disabled={disabledDays}
/>
</PopoverContent>
</Popover>


{/* <div className='inline-flex items-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 pr-2 pl-4 w-[180px] justify-start text-left font-normal'>
    <div className='text-lg'><GoClockFill/> </div>
    <select name="" id="" className='px-1 py-2 w-full bg-transparent outline-none border-none' onChange={(e)=>setHhmm(e.target.value)}>
        {times.map((time, i)=>(
            <option key={i} value={time.value} selected={hhmm===time.value} disabled={TimeDisable(time.value)}>{time.name}</option>
        ))}
    </select>
</div> */}

<div className="">
                <Select onValueChange={(e)=>setHhmm(e)}  >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Time" />
      </SelectTrigger>
      <SelectContent className='w-[140px]'>
        <SelectGroup defaultValue={hhmm!==null ? hhmm : "Select Time"} >
        <SelectLabel>Select Time</SelectLabel>
          {
            times.map((time, i)=>(
              <SelectItem key={i} value={time.value} defaultChecked={hhmm===time.value} disabled={TimeDisable(time.value)}>{time.name}</SelectItem>
            ))
          }
          
        </SelectGroup>
      </SelectContent>
    </Select>
                </div>



</div>
              </div>
            </div>
           
        

      <DialogFooter className='mt-8'>
      {
        loading ? <Loader/> : <>
        <Button  type="submit" variant={"ghost"} className='h-9' onClick={()=>setOpen(false)}>Cancel</Button>
        <Button  type="submit" className='h-9' onClick={SubmitHandler}>Create Poll</Button>
        </>
      }
        
      </DialogFooter>
      </div>
      </DialogContent>
    </Dialog>
    
    
    
    </>
  )
}

export default PollDialog