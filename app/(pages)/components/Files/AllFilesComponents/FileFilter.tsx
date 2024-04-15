"use client";
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Channel, Member, Server } from '@prisma/client'
import { IoIosArrowDown } from 'react-icons/io'
import { IoFilterSharp } from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@radix-ui/react-separator'
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"

interface Props {
  server:Server
  from:string
  setFrom:any
  fileType:string
  setFileType:any
  fromIn:string
  setFromIn:any
  startingDate:Date | null
  endingDate:Date | null
  setStartingDate:any
  setEndingDate:any
  setDateType:any
  dateType:string
}
function FileFilter({server, from, setFrom, fromIn, setFromIn, fileType, setFileType, startingDate,setStartingDate, endingDate, setEndingDate, setDateType, dateType }:Props) {
    const [calDialog, setCalDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const OpenCalender =(e:string)=>{
    
      setTitle(e);
      setCalDialog(true);
    }

    const dateHandler =(e:string)=>{
      // console.log(e);
  
      setDateType(e);
      if(e==="On" || e==="Before" || e==="After"){
        setStartingDate(null)
        setEndingDate(null)
        // setOpen(true);
        return;
      } else if(e==="Range"){
        // setTitle(e);
        // setOpen2(true)
        return;
      }
      else if(e==="Any Time"){
        setDateType("All");
        //  setDate('');
        //  onFiltering('', "date", "Any Time");
      }else if(e==="Today"){
        const dt = new Date();
         setStartingDate(dt)
        //  onFiltering(dt, "date", "Today");
      }else if(e==="Yesterday"){
         let prev = new Date();
        prev.setDate(prev.getDate()-1);
        setStartingDate(prev);
        // onFiltering(prev, "date", "Yesterday");
      }else if(e==="Last 7 days"){
         let prev = new Date();
        prev.setDate(prev.getDate()-7);
        setStartingDate(prev);
        setEndingDate(new Date());
        // onFiltering(prev, "date", "Last 7 days");
      }else if(e==="Last 30 days"){
        let prev = new Date();
        prev.setDate(prev.getDate()-30);
        setStartingDate(prev);
        setEndingDate(new Date());
        // onFiltering(prev, "date", "Last 30 days");
      }else if(e==="Last 12 months"){
        let prev = new Date();
        prev.setMonth(prev.getMonth()-12);
        setStartingDate(prev);
        // setEndingDate(new Date());
        // onFiltering(prev, "date", "Last 12 months");
      }
  
  
    }

    const CancelHandler=()=>{
      setFrom('All');
      setFromIn('All');
      setDateType('All');
      setFileType('All');
      setOpen(false)
      
    }


  return (
    <>
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <button className='filter_icon'><IoFilterSharp/> Filter</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[575px] filter_dialog">
        <DialogHeader>
          <DialogTitle>Filter by</DialogTitle>
        </DialogHeader>
        <hr />
        <div className='filter_container'>
          <div className='single_item_filter'>
            <label htmlFor="" className='text-sm font-bold'>From</label>
            <Select onValueChange={(e)=>setFrom(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Name" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectItem value={"All"}>All Member</SelectItem>

          {
            server.Members && server.Members.map((member:Member)=>(
              <SelectItem value={member.id} key={member.id}>{member.user.name}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>

          <div className='single_item_filter'>
            <label htmlFor="" className='text-sm font-bold'>In</label>
            <Select onValueChange={(e)=>setFromIn(e)} defaultValue={fromIn}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="#General" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectItem value={"All"}>All Channel</SelectItem>
          {
            server.channels && server.channels.map((channel:Channel)=>(
              <SelectItem value={channel.id} key={channel.id}>{channel.name}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>

          <div className='single_item_filter'>
            <label htmlFor="" className='text-sm font-bold'>Date</label>
            <Select onValueChange={(e)=>dateHandler(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Date" />
      </SelectTrigger>
      <SelectContent onSelect={()=>console.log("Chnaged Statusss 2")} onClick={()=>console.log("Changeddddd")}>
        <SelectGroup onChange={()=>console.log("Changed Status...")}>
          
        <SelectItem value="All" >Any Time</SelectItem>
        <SelectItem value="Today">Today</SelectItem>
        <SelectItem value="Yesterday" >Yesterday</SelectItem>
        <SelectItem value="Last 7 days" >Last 7 days</SelectItem>
        <SelectItem value="Last 30 days" >Last 30 days</SelectItem>
        <SelectItem value="Last three months" >Last three months</SelectItem>
        <SelectItem value="Last 12 months" >Last 12 months</SelectItem>
        <hr className='py-1' />
        {/* <SelectItem value="On" >On..</SelectItem>
        <SelectItem value="Before">Before..</SelectItem>
        <SelectItem value="After" >After..</SelectItem>
        <SelectItem value="Range" >Range..</SelectItem> */}



        </SelectGroup>
      </SelectContent>
    </Select>
          </div>
          <div className='single_item_filter'>
            <label htmlFor="" className='text-sm font-bold'>File Types</label>
            <Select onValueChange={(e)=>setFileType(e)} defaultValue={fileType}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="eg. images" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="image">Images</SelectItem>
        <SelectItem value="video">Videos</SelectItem>
        <SelectItem value="audio">Audio</SelectItem>
        <SelectItem value="pdf">PDF</SelectItem>
        <SelectItem value="txt">TXT</SelectItem>
        <SelectItem value="ppt">PPT</SelectItem>
        <SelectItem value="docx">Docx</SelectItem>
        <SelectItem value="xlsx">Xlsx</SelectItem>
        <SelectItem value="Zip">Zip</SelectItem>
        <SelectItem value="Json">Json</SelectItem>



        </SelectGroup>
      </SelectContent>
    </Select>
          </div>


          {/* <Dialog open={calDialog} onOpenChange={setCalDialog}>
      <DialogTrigger >
      <button className='filter_icon'>{title}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] filter_dialog">
        <DialogHeader>
          <DialogTitle>Filter by</DialogTitle>
        </DialogHeader>
        <div>
        <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
        </div>
       
      </DialogContent>
    </Dialog> */}


        </div>
        <DialogFooter className='mt-4'>
          <Button className='bg-transparent dark:text-white text-black hover:bg-transparent ' onClick={CancelHandler}>Clear Filter</Button>
          <Button className='bg-green-500 hover:bg-green-600 text-white' onClick={()=>setOpen(false)}>Search</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
          
    






    </>
  )
}

export default FileFilter