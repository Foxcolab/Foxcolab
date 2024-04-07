"use client";
import React, { useState } from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import {  BiMessageSquareAdd, BiSolidMessageDetail } from "react-icons/bi";
  import { RiEditBoxFill, RiShareForwardFill } from "react-icons/ri";
  import { BsBookmark, BsBookmarkFill, BsThreeDotsVertical } from "react-icons/bs";
import { ActionTooltip } from '../../tooolkit/Toolkit';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast"
import ThreadCom from '../../threads/ThreadCom';
import { EmojiPicker } from '../../Emoji/Emoji';
import {Message, Member, PinnedPost, Later, Channel} from "@prisma/client";
import {useParams, useRouter} from "next/navigation";
import qs from "query-string";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AiFillDelete } from 'react-icons/ai';
import { FaBookmark, FaCopy, FaRegBookmark } from 'react-icons/fa';
import { IoBookmark, IoBookmarkOutline, IoSave } from 'react-icons/io5';
import { MdMarkunreadMailbox, MdOutlinePushPin } from 'react-icons/md';
import Loader from '../../Loaders/Loader';
import { ReloadIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Calendar as CalendarIcon } from "lucide-react";

 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from 'date-fns';
import ForwardMessage from './ForwardMessage';



const timeSlots = [
  "12:00 AM",
  "12:15 AM",
  "12:30 AM",
  "12:45 AM",
  "01:00 AM",
  "01:15 AM",
  "01:30 AM",
  "01:45 AM",
  "02:00 AM",
  "02:15 AM",
  "02:30 AM",
  "02:45 AM",
  "03:00 AM",
  "03:15 AM",
  "03:30 AM",
  "03:45 AM",
  "04:00 AM",
  "04:15 AM",
  "04:30 AM",
  "04:45 AM",
  "05:00 AM",
  "05:15 AM",
  "05:30 AM",
  "05:45 AM",
  "06:00 AM",
  "06:15 AM",
  "06:30 AM",
  "06:45 AM",
  "07:00 AM",
  "07:15 AM",
  "07:30 AM",
  "07:45 AM",
  "08:00 AM",
  "08:15 AM",
  "08:30 AM",
  "08:45 AM",
  "09:00 AM",
  "09:15 AM",
  "09:30 AM",
  "09:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",
  "12:00 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "01:00 PM",
  "01:15 PM",
  "01:30 PM",
  "01:45 PM",
  "02:00 PM",
  "02:15 PM",
  "02:30 PM",
  "02:45 PM",
  "03:00 PM",
  "03:15 PM",
  "03:30 PM",
  "03:45 PM",
  "04:00 PM",
  "04:15 PM",
  "04:30 PM",
  "04:45 PM",
  "05:00 PM",
  "05:15 PM",
  "05:30 PM",
  "05:45 PM",
  "06:00 PM",
  "06:15 PM",
  "06:30 PM",
  "06:45 PM",
  "07:00 PM",
  "07:15 PM",
  "07:30 PM",
  "07:45 PM",
  "08:00 PM",
  "08:15 PM",
  "08:30 PM",
  "08:45 PM",
  "09:00 PM",
  "09:15 PM",
  "09:30 PM",
  "09:45 PM",
  "10:00 PM",
  "10:15 PM",
  "10:30 PM",
  "10:45 PM",
  "11:00 PM",
  "11:15 PM",
  "11:30 PM",
  "11:45 PM",
  
  
  
  ]

interface HoverMessagePops {
  message:Message,
  currentMember:Member
  children:React.ReactNode;
  socketUrl: string;
  socketQuery: Record<string, string>;
  setIsEditing:any
  isPinnedPost:boolean
  isSavedPost:boolean
  pinnedPost:PinnedPost
  savedPost:Later
  myChannels:Channel[]
  allServerMember:Member[]
  setThreadMessage:any
  schemaType:string
}




function HoverMessage({children, message, currentMember, socketUrl, socketQuery, setIsEditing, isPinnedPost, isSavedPost,savedPost, pinnedPost, myChannels, allServerMember, setThreadMessage , schemaType }:HoverMessagePops) {
  const [loading, setLoading] = useState(false);
  const [sloading, setsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [open, setOpen] = useState(false);
  const [mainOpen, setMainOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [saveTime, setsaveTime] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = useState<Date | undefined>(undefined);
  const [clockTime, setClockTime] = useState(null);
  const [forward, setForward] = useState(false);
  const [error, setError] = useState('')
  const { toast } = useToast()
  const router = useRouter();
  const params = useParams();
  const onToast =(msg:string)=>{
    toast({
      title: msg,
      // description: "Friday, February 10, 2023 at 5:57 PM"
    })
  }
  const PinnedMsg =async()=>{
    try {
      setLoadingText("Pinning a message");
      setLoading(true);
      if(schemaType==="Threads"){
        const res = await axios.post(`/api/pinnedmessage/thread?threadId=${message.id}&serverId=${params?.id}`);
      }else {
        const res = await axios.post(`/api/pinnedmessage?messageId=${message.id}&serverId=${params?.id}`);
      }
      
      router.refresh();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const RemovePinnedMsg =async()=>{
    try {
      setLoadingText("Unpinning a message");
      setLoading(true);
      if(schemaType=="Threads"){
        const res = await axios.delete(`/api/pinnedmessage/thread?threadId=${message.id}&serverId=${params?.id}`);
      }else {
        const res = await axios.delete(`/api/pinnedmessage?messageId=${message.id}&pinnedId=${pinnedPost.id}&serverId=${params?.id} `);
      }
      

      router.refresh();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const AddReminder =async()=>{
    if(clockTime===null || clockTime === undefined || clockTime===''){
      setError("Please select time..");
      return;
    }
    if(date===null || date === undefined){
      setError("Please select date..");
      return;
    }
    let newDate  = new Date(date);
    const dd = newDate.getDate();
    const mm = newDate.getMonth() + 1;
    const yy = newDate.getFullYear();
    let selectedDt = `${yy}-${mm}-${dd}`;
    selectedDt = selectedDt + " " + clockTime;
    newDate = new Date(selectedDt)
    setTime(newDate);
    await SavedLater(newDate);
  }

  const SavedLater =async(newDate:any)=>{
    try {
      if(newDate===undefined){
        setLoading(true);
      }else {
        setsLoading(true);
      }
      if(schemaType==="Threads"){
        const res = await axios.post(`/api/save-later/thread?threadId=${message.id}`, {time:newDate});
      }else {
        const res = await axios.post(`/api/save-later?messageId=${message.id}`, {time:newDate});
      }
      
      // if(res.status===200){
      //   onToast("Message has been saved for later");
      //   // setLoading(false);
      // }
      router.refresh();
      setsLoading(false);
      setsaveTime(false);
      if(newDate===undefined){
        setLoading(false);
      }else {
        setsLoading(false);
      }
    } catch (error) {
      setsLoading(false);
      setLoading(false);
      setsaveTime(false);
      console.log(error);
    }
  }
  const RemoveLater =async()=>{
    try {
      setLoadingText("Saved for later");
      setLoading(true);
      if(schemaType==="Threads"){
        const res = await axios.delete(`/api/save-later/thread?threadId=${message.id}&laterId=${savedPost.id}`);
      }else {
        const res = await axios.delete(`/api/save-later?messageId=${message.id}&laterId=${savedPost.id}`);
      }
      
      setTime(undefined);
      setClockTime(null);
      setDate(undefined)
      router.refresh();
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  const AddReaction =async()=>{
    try {
      const res = await axios.post(`/api/reaction?serverId=${message.serverId}&messageId=${message.id}`)
    } catch (error) {
      
    }
  }
  const onChangeHandler=async(emoji:any)=>{
    try {
      
      const res = await axios.post(`/api/socket/messages/reaction?serverId=${message.serverId}&messageId=${message.id}&channelId=${message.channelId}`, {content:emoji});
      // setOpen(false)
      router.refresh();
    } catch (error) {
      // setOpen(false)
      console.log(error);
    }
  }


  const DeleteHandler =async()=>{
    try {
      // console.log("socket socketQuery)
      // /api/socket/messages?channelId=65e694aeb7822086cf43a59a&sectionId=658c21484a2dd36e8d345684&serverId=658c21484a2dd36e8d345683
      if(schemaType==="Threads"){
        const res = await axios.delete(`/api/socket/threads/delete/${message.id}?channelId=${message.channelId}&threadId=${message.id}&serverId=${message.serverId}`);
      }
      const url = qs.stringifyUrl({
        url: `${socketUrl}/delete/${message.id}`,
        query: socketQuery,
      });
      console.log(url)
      // const res = axios.delete(url)
      router.refresh();
      setOpen(false);
    } catch (error) {
      setOpen(false);
      console.log(error)
    }
  }

  const EditHandler =async()=>{
    setIsEditing(true)
  }


  const DropDownHandler=()=>{
    setMainOpen(true);
    setMore(true);
  }

  const MarkUnread =()=>{

  }

  const CalTime =async(value:number)=>{
    let currentDate  = new Date();
    let newDate = new Date(currentDate.getTime() + value*60000);
    setTime(newDate);
    await SavedLater(newDate);
  }


  const ThreadHandler =()=>{
    setThreadMessage(message);
    router.refresh();
    console.log("Refreshed");
  }



    return (
    <>





<HoverCard  open={mainOpen} onOpenChange={setMainOpen}>
    <HoverCardTrigger asChild onMouseEnter={()=>setMainOpen(true)}>
       {children}
      </HoverCardTrigger>
      <HoverCardContent className={cn("flex items-center msg_emoji_container ", schemaType==="Threads"?"w-64":"w-72")} side="top" align='end' >
       
        <div className='hover_emoji_item'>
        <ActionTooltip label='Completed' side='top' align='center'><button id='checkbox' onClick={()=>onChangeHandler('✅')}>✅</button></ActionTooltip> <ActionTooltip label='Taking a look..' side='top' align='center'><button id='checkbox' onClick={()=>onChangeHandler('👀')}>👀</button></ActionTooltip> 
   <ActionTooltip label='Nicely done' side='top' align='center'><button onClick={()=>onChangeHandler('👍')}>👍</button></ActionTooltip> 
   <ActionTooltip label='Find another reaction' side='top' align='center'>
    <EmojiPicker
                    messageId={message.id} channelId={message.channelId as string}
                    type="hover" schemaType='channel' /></ActionTooltip> 
  {/* <ActionTooltip label='Delete' side='top' align='center'><button onClick={()=>setOpen(true)}><AiFillDelete/></button></ActionTooltip> 
   <ActionTooltip label='Edit' side='top' align='center'><button onClick={e=>setIsEditing(true)}><FaEdit/></button></ActionTooltip>  */}
    {/* <ThreadCom
          message={message}
          currentMember={currentMember}
          Msg={
            <button className="text-xl" style={{fontSize:"1.3rem"}}><BiSolidMessageDetail/></button>
          }
          />  */}
          {
            schemaType!=="Threads" &&  <ActionTooltip label='Threads' side='top' align='center'>
            <button onClick={()=>ThreadHandler()} style={{fontSize:"1.3rem"}}><BiMessageSquareAdd/>
            </button></ActionTooltip> 
          }
  
       <ActionTooltip label='Save for later' side='top' align='center'><button onClick={isSavedPost ? RemoveLater :()=> SavedLater(undefined)}  className={isSavedPost ? "bookmark_icon": ''} style={{fontSize:"1.1rem !important"}}>
            {
              isSavedPost ? <BsBookmarkFill/> : <BsBookmark/>
            }
             </button></ActionTooltip> 
      
          

 
 <DropdownMenu >
  <DropdownMenuTrigger >
  <ActionTooltip label='more actions' side='top' align='center'><button onClick={DropDownHandler} className='outline-none'><BsThreeDotsVertical/></button></ActionTooltip>
     </DropdownMenuTrigger>
  <DropdownMenuContent className="more_drop sm:max-w-[425px]" >

            <DropdownMenuItem className='dpdn_it' onClick={MarkUnread}> <MdMarkunreadMailbox/> Marks unread </DropdownMenuItem>
            <DropdownMenuItem className='dpdn_it' onClick={isPinnedPost ? RemovePinnedMsg : PinnedMsg}><MdOutlinePushPin/>
              {
                isPinnedPost ? "Unpin from channel": "Pinned a message"
              }
             </DropdownMenuItem>


             <DropdownMenuSub>
            <DropdownMenuSubTrigger className='dpdn_it data-[state=open]:bg-[#181818]'>
              <IoSave/> Saved for Later
              </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className='savedlater_time'> 
                <DropdownMenuItem className='dpdn_it' onClick={()=>CalTime(10)}>in 10 Minutes</DropdownMenuItem>
                <DropdownMenuItem className='dpdn_it' onClick={()=>CalTime(20)}>in 20 minutes</DropdownMenuItem>
                <DropdownMenuItem className='dpdn_it' onClick={()=>CalTime(30)}>in 30 minutes</DropdownMenuItem>
                <DropdownMenuItem className='dpdn_it' onClick={()=>CalTime(45)}>in 45 minutes</DropdownMenuItem>
                <DropdownMenuItem className='dpdn_it' onClick={()=>CalTime(60)}>in 1 hours</DropdownMenuItem>
                <DropdownMenuItem className='dpdn_it' onClick={()=>setsaveTime(true)}>Custom...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>



            {/* <DropdownMenuItem className='dpdn_it' onClick={isSavedPost ? RemoveLater : SavedLater}><IoSave/>
            {
              isSavedPost ? "Remove from saved message": "Save for Later"
            }</DropdownMenuItem> */}
            <DropdownMenuSeparator className='bg-gray-500' />

           <DropdownMenuItem className='dpdn_it'><FaCopy/> Copy Link </DropdownMenuItem>
            <DropdownMenuItem className='dpdn_it'  onClick={()=>setForward(true)}> 
            <RiShareForwardFill /> Forward

            </DropdownMenuItem>

            <DropdownMenuSeparator className='bg-gray-500' />
           <DropdownMenuItem className='dpdn_it' onClick={()=>setIsEditing(true)}><RiEditBoxFill/> Edit Message </DropdownMenuItem>
           <DropdownMenuItem className='dpdn_it dodn_delete' onClick={()=>setOpen(true)}><AiFillDelete/> Delete Message </DropdownMenuItem>

      
  </DropdownMenuContent>
</DropdownMenu> 

     
        </div>

</HoverCardContent>
    </HoverCard>

    <ForwardMessage allServerMember={allServerMember} open={forward} setOpen={setForward} message={message} myChannels={myChannels}  />


    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Message</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className=''>  Are you sure you want to delete this message? This action cannot be undone.</p>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={"outline"} autoFocus={false}>Cancel</Button>
          <Button type="submit" className='bg-red-600 hover:bg-red-700 text-white' onClick={DeleteHandler} autoFocus={false}>Delete </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>



    <Dialog open={loading} onOpenChange={setLoading}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{loadingText}</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className='text-gray-700 gap-2 font-bold text-xl flex items-center justify-center'> Loading<ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
           </p>
        </div>
        
      </DialogContent>
    </Dialog>


    <Dialog open={saveTime} onOpenChange={setsaveTime}>
      
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className='flex items-center text-xl text-stone-700'>Reminder</DialogTitle>
          <DialogDescription>
          <span className='text-red-500'>{error}</span>
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center justify-around my-4'>
          <div className="flex flex-col">
              <div className='font-bold  text-gray-600'>When</div>
              <div>

              <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          // initialFocus
        />
      </PopoverContent>
    </Popover>

              </div>
          </div>
          <div className='flex flex-col'>
              <div className='font-bold  text-gray-600'>Time</div>
              <div>

              <Select onValueChange={(e:any)=>{setClockTime(e); setError('')}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            timeSlots.map((time, i)=>(
              <SelectItem key={i} value={time} >
                {time}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>       

              </div>
          </div>
        </div>
        <DialogFooter className='mt-4'>
          {
            sloading ? <Loader/> : <>
         <Button onClick={() => {setsaveTime(false); setError('')}} variant={"outline"}>Cancel</Button>
          <Button type="submit" className='bg-green-500 px-6 hover:bg-green-600' onClick={AddReminder}>Save </Button>   
            </>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {/* <Dialog open={saveTime} onOpenChange={setsaveTime}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reminder</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
       
        
      </DialogContent>
    </Dialog> */}

<Dialog open={loading} onOpenChange={setLoading}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{loadingText}</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className='text-gray-700 gap-2 font-bold text-xl flex items-center justify-center'> Loading<ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
           </p>
        </div>
        
      </DialogContent>
    </Dialog>
    </>
  )
}

export default HoverMessage;