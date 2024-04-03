"use client";
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Calendar } from '@/components/ui/calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
  interface Props {
    onFiltering:any

  }
function DateFilter({onFiltering }:Props) {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [dateType, setDateType] = useState('');
  const [endingDate, setEndingDate] = useState('');
  // const [title, setTitle] = useState('');
  const [calender, setCalender] = useState(false)

  const dateHandler =(e:string)=>{

    setDateType(e);
    if(e==="On" || e==="Before" || e==="After"){
      setDate(null)
      setEndingDate(null)
      setOpen(true)
      return;
    } else if(e==="Range"){
      // setTitle(e);
      setOpen2(true)
      return;
    }
    else if(e==="Any Time"){
      //  setDate('');
       onFiltering('', "date", "Any Time");
    }else if(e==="Today"){
      const dt = new Date();
       setDate(dt)
       onFiltering(dt, "date", "Today");
    }else if(e==="Yesterday"){
       let prev = new Date();
      prev.setDate(prev.getDate()-1);
      setDate(prev);
      onFiltering(prev, "date", "Yesterday");
    }else if(e==="Last 7 days"){
       let prev = new Date();
      prev.setDate(prev.getDate()-7);
      setDate(prev);
      setEndingDate(new Date());
      onFiltering(prev, "date", "Last 7 days");
    }else if(e==="Last 30 days"){
      let prev = new Date();
      prev.setDate(prev.getDate()-30);
      setDate(prev);
      setEndingDate(new Date());
      onFiltering(prev, "date", "Last 30 days");
    }else if(e==="Last 12 months"){
      let prev = new Date();
      prev.setMonth(prev.getMonth()-12);
      setDate(prev);
      setEndingDate(new Date());
      onFiltering(prev, "date", "Last 12 months");
    }


  }
  const calenderHandler =(date:Date)=>{
    date = new Date(date);
    const calDate = document.getElementById('calDate');
    if(!calDate) return;
    let dateMDY = `${date.getFullYear()}-${date.getMonth() + 1 <10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1}-${date.getDate()<10 ? `0${date.getDate()}` : date.getDate()}`;

      setDate(dateMDY);


  }
  const calenderHandler2 =(date:Date)=>{
    date = new Date(date);
    const calDate = document.getElementById('calDate');
    if(!calDate) return;
    let dateMDY = `${date.getFullYear()}-${date.getMonth() + 1 <10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1}-${date.getDate()<10 ? `0${date.getDate()}` : date.getDate()}`;

      setEndingDate(dateMDY);
  }
  const SaveHandler =()=>{
    console.log("DATE TYPE", dateType);
    console.log("Date", date);
    if(dateType==="On" || dateType=="After" || dateType==="Before"){
      onFiltering(date, "date", dateType);
    }
    else if(dateType==="Range"){
      onFiltering(date, "date", dateType, endingDate);
    }
    setOpen(false)
    setOpen2(false)
    
  }



  const InputHandler =(value:string)=>{

    setDate(value);
  }
  return (
    <>
    {/* onValueChange={e=>onFiltering(e, "date")} */}
            <Select  onValueChange={dateHandler} defaultValue=''>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Date" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          
        <SelectItem value="Any Time" >Any Time</SelectItem>
        <SelectItem value="Today" >Today</SelectItem>
        <SelectItem value="Yesterday" >Yesterday</SelectItem>
        <SelectItem value="Last 7 days" >Last 7 days</SelectItem>
        <SelectItem value="Last 30 days" >Last 30 days</SelectItem>
        <SelectItem value="Last three months" >Last three months</SelectItem>
        <SelectItem value="Last 12 months" >Last 12 months</SelectItem>
        <hr className='py-1' />
        <SelectItem value="On" >On..</SelectItem>
        <SelectItem value="Before">Before..</SelectItem>
        <SelectItem value="After" >After..</SelectItem>
        <SelectItem value="Range" >Range..</SelectItem>



        </SelectGroup>
      </SelectContent>
    </Select>
    

  

<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>{dateType}..</DialogTitle>
        </DialogHeader>
        <div className='cal_dialog'>
          <div className='cal_input'><FaCalendarAlt/> <input type="text" value={date} placeholder='eg. yyyy-mm-dd' id='calDate' onChange={e=>InputHandler(e.target.value)} /></div>
          <div className='calender'>
          <Calendar
      mode="single"
      // selected={date}
      selected={date}
      onSelect={calenderHandler}
      className=""
    />
          </div>
  
        </div>
  
        <DialogFooter>
          <Button className='bg-transparent border text-black hover:bg-gray-200' onClick={()=>setOpen(false)}>Cancel</Button>
          <Button className='bg-green-500 hover:bg-green-600' onClick={SaveHandler}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={open2} onOpenChange={setOpen2}>
      <DialogTrigger asChild>
        
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{dateType}..</DialogTitle>
        </DialogHeader>
        <div className='cal_dialog2'>
          <div className="calender1">
          <div className='cal_input'><FaCalendarAlt/> <input type="text" value={date} placeholder='Starting date eg. yyyy-mm-dd' id='calDate' onChange={e=>InputHandler(e.target.value)} /></div>
          <div className='single_calender'>
            <Calendar
      mode="single"
      // selected={date}
      selected={date}
      onSelect={calenderHandler}
      className=""
    />   
            </div>
          </div>
          <div className="calender1">
          <div className='cal_input'><FaCalendarAlt/> <input type="text" value={endingDate} placeholder='Ending date eg. yyyy-mm-dd' id='calDate' onChange={e=>InputHandler(e.target.value)} /></div>
          <div className='single_calender'>
            <Calendar
      mode="single"
      // selected={date}
      selected={endingDate}
      onSelect={calenderHandler2}
      className=""
    />
            </div>
          </div>  
        </div>
  
        <DialogFooter>
          <Button className='bg-transparent border text-black hover:bg-gray-200' onClick={()=>setOpen2(false)}>Cancel</Button>
          <Button className='bg-green-500 hover:bg-green-600' onClick={SaveHandler}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


    
    </>
  )
}

export default DateFilter