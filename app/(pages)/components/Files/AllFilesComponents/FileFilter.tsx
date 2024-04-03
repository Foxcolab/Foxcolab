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
  date:string | Date
  setDate:any
  onFiltering:any
  fromIn:string
  setFromIn:any
}
function FileFilter({server}:Props) {
    const [calDialog, setCalDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const OpenCalender =(e:string)=>{
    
      setTitle(e);
      setCalDialog(true);
    }
  return (
    <>
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <button className='filter_icon'><IoFilterSharp/> Filter</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] filter_dialog">
        <DialogHeader>
          <DialogTitle>Filter by</DialogTitle>
        </DialogHeader>
        <div className='filter_container'>
          <div className='single_item_filter'>
            <label htmlFor="" className='text-sm font-bold'>From</label>
            <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="eg. John Doe" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
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
            <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="eg. #General" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
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
            <Select >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="select date --" />
      </SelectTrigger>
      <SelectContent onSelect={()=>console.log("Chnaged Statusss 2")} onClick={()=>console.log("Changeddddd")}>
        <SelectGroup onChange={()=>console.log("Changed Status...")}>
          
        <SelectItem value="Any Time" onClick={()=>console.log("Clicked on any time")}>Any Time</SelectItem>
        <SelectItem value="Today" onClick={()=>console.log("Clicked on Today")}>Today</SelectItem>
        <SelectItem value="Yesterday" >Yesterday</SelectItem>
        <SelectItem value="Last 7 days" >Last 7 days</SelectItem>
        <SelectItem value="Last 30 days" >Last 30 days</SelectItem>
        <SelectItem value="Last three months" >Last three months</SelectItem>
        <SelectItem value="Last 12 months" >Last 12 months</SelectItem>
        <hr className='py-1' />
        <SelectItem value="On" onSelect={()=>console.log("On clicked ")}>On..</SelectItem>
        <SelectItem value="Before" onClick={()=>console.log("Before Clicked")}>Before..</SelectItem>
        <SelectItem value="After" onClick={()=>OpenCalender("After clicked")}>After..</SelectItem>
        <SelectItem value="Range" onClick={()=>OpenCalender("Range Clicked")}>Range..</SelectItem>



        </SelectGroup>
      </SelectContent>
    </Select>
          </div>
          <div className='single_item_filter'>
            <label htmlFor="" className='text-sm font-bold'>File Types</label>
            <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="eg.images" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          
        <SelectItem value="Images">Images</SelectItem>
        <SelectItem value="Videos">Videos</SelectItem>
        <SelectItem value="PDF">PDF</SelectItem>
        <SelectItem value="TXT">TXT</SelectItem>
        <SelectItem value="PPT">PPT</SelectItem>
        <SelectItem value="Docx">Docx</SelectItem>
        <SelectItem value="csv">csv</SelectItem>



        </SelectGroup>
      </SelectContent>
    </Select>
          </div>


          <Dialog open={calDialog} onOpenChange={setCalDialog}>
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
    </Dialog>


        </div>
        <DialogFooter>
          <Button className='bg-transparent text-black hover:bg-transparent'>Clear Filter</Button>
          <Button className='bg-green-600'>Search</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
          
    






    </>
  )
}

export default FileFilter