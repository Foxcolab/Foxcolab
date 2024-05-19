"use client"
import React, { useState } from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaHashtag, FaPlusCircle } from "react-icons/fa"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import CreateCanvas from '../Create/CreateCanvas';
import CreateChannel from '../Create/CreateChannel';
import CreateTest from '../Create/CreateTest';
import CreateForums from '../Create/CreateForums';
import CreateSpreadsheet from '../Create/CreateSpreadsheet';
   
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { MdForum } from 'react-icons/md';
import { FaNoteSticky } from 'react-icons/fa6';
import { PiExamFill, PiSelectionForegroundDuotone } from 'react-icons/pi';
import { BiSolidSpreadsheet } from 'react-icons/bi';
interface Props {
  serverId:string
  sectionId:string
  createChannel:boolean
  createForum:boolean
  createCanvas:boolean
  createTestChannel:boolean
  createSpreadsheet:boolean
  sectionName:string
}

function SectionPlus({sectionId, serverId, createCanvas, createChannel, createForum, createTestChannel, createSpreadsheet, sectionName}:Props) {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [channelDialog, setChannelDialog] = useState(false);
  const [forum, setForumDialog] = useState(false);
  const [canvasDialog, setCanvasDialog] = useState(false);
  const [testChannelDialog, setTestChannelDialog] = useState(false);
  const [spreadsheetDialog, setSpreadsheetDialog] = useState(false);

  const onSubmit =()=>{
    setOpen(false);
    if(selected==="channel"){
      setOpen(false);
      setChannelDialog(true);
    }else if(selected==="forum"){
      setForumDialog(true);
    }else if(selected==="canvas"){
      setCanvasDialog(true);
    }
    else if(selected==="testchannel"){
      setTestChannelDialog(true);
    }
    else if(selected==="spreadsheet"){
      setSpreadsheetDialog(true);
    }
  }
  return (
   <>
   

    {/* <CreateCanvas/> */} 

 

<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <button className='plus_section'><AiOutlinePlusCircle/></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]" >
        <DialogTitle>
          {sectionName}
        </DialogTitle>
        <div className='pb-2 pt-4 px-2'>
          {
            createChannel && 
            <div className='create_section_item' onClick={()=>setSelected("channel")}>
              <div className='flex items-center gap-2'>
              <div className='text-[1.8rem] dark:text-gray-300 text-gray-600'><FaHashtag/></div>
              <div className='flex flex-col'>
                <div className='text-lg font-semibold'>Channel</div>
                <div className='text-sm dark:text-gray-400 text-gray-600'>Send Message, images, GIFs, emoji, polls, forms</div>
              </div>
              </div>
              
              <div><input type="radio" className='h-[1.1rem] w-[1.1rem] cursor-pointer' value={"channel"} name='create' onChange={(e)=>setSelected(e.target.value)} checked={"channel"===selected} /></div>
            </div>
          }

{
            createForum && 
            <div className='create_section_item' onClick={()=>setSelected("forum")}>
              <div className='flex items-center gap-2'>
              <div className='text-[1.8rem] dark:text-gray-300 text-gray-600'><MdForum/></div>
              <div className='flex flex-col'>
                <div className='text-lg font-semibold'>Forum</div>
                <div className='text-sm dark:text-gray-400 text-gray-600'>Open discussion, share insights, connect with others.</div>
              </div>
              </div>
              
              <div><input type="radio" className='h-[1.1rem] w-[1.1rem] cursor-pointer' value={"forum"} name='create' onChange={(e)=>setSelected(e.target.value)} checked={"forum"===selected} /></div>
            </div>
          }

{
            createCanvas && 
            <div className='create_section_item' onClick={()=>setSelected("canvas")}>
              <div className='flex items-center gap-2'>
              <div className='text-[1.6rem] dark:text-gray-300 text-gray-600'><FaNoteSticky/></div>
              <div className='flex flex-col'>
                <div className='text-lg font-semibold'>Canvas</div>
                <div className='text-sm dark:text-gray-400 text-gray-600'>Create note, comments on note, modify notes.</div>
              </div>
              </div>
              
              <div><input type="radio" className='h-[1.1rem] w-[1.1rem] cursor-pointer' value={"canvas"} name='create' onChange={(e)=>setSelected(e.target.value)} checked={"canvas"===selected} /></div>
            </div>
          }

{
            createTestChannel && 
            <div className='create_section_item'  onClick={()=>setSelected("testchannel")}>
              <div className='flex items-center gap-2'>
              <div className='text-[1.8rem] dark:text-gray-300 text-gray-600'><PiExamFill/></div>
              <div className='flex flex-col'>
                <div className='text-lg font-semibold'>Test Channel</div>
                <div className='text-sm dark:text-gray-400 text-gray-600'>Make assessment, compare result, statistics, answer with explantion.</div>
              </div>
              </div>
              
              <div><input type="radio" className='h-[1.1rem] w-[1.1rem] cursor-pointer' value={"testchannel"} name='create' onChange={(e)=>setSelected(e.target.value)} checked={"testchannel"===selected} /></div>
            </div>
          }

{
            createSpreadsheet && 
            <div className='create_section_item' onClick={()=>setSelected("spreadsheet")}>
              <div className='flex items-center gap-2'>
              <div className='text-[1.8rem] dark:text-gray-300 text-gray-600'><BiSolidSpreadsheet/></div>
              <div className='flex flex-col'>
                <div className='text-lg font-semibold'>Spreadsheet</div>
                <div className='text-sm dark:text-gray-400 text-gray-600'>Organizing, analyzing, and manipulating data in a tabular format.</div>
              </div>
              </div>
              
              <div><input type="radio" className='h-[1.1rem] w-[1.1rem] cursor-pointer' value={"spreadsheet"} name='create' onChange={(e)=>setSelected(e.target.value)} checked={"spreadsheet"===selected} /></div>
            </div>
          }



 
        <DialogFooter className='pt-2'>
          <Button type="submit" className='bg-transparent hover:bg-transparent border dark:text-white text-black' onClick={()=>setOpen(false)}>Cancel</Button>
          <Button type="submit" className='bg-green-500 text-white hover:bg-green-600' disabled={selected===''} onClick={onSubmit}>Next</Button>
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>


   

      


          {
            createChannel && 
            <CreateChannel sectionId={sectionId} serverId={serverId} open={channelDialog} setOpen={setChannelDialog}  />
          }
          {
            createCanvas && 
            <CreateCanvas sectionId={sectionId} serverId={serverId} open={canvasDialog} setOpen={setCanvasDialog} />
          }
          {
            createForum && 
            <CreateForums sectionId={sectionId} serverId={serverId} open={forum} setOpen={setForumDialog} />
          }
          {
            createTestChannel && 
            <CreateTest sectionId={sectionId} serverId={serverId} open={testChannelDialog} setOpen={setTestChannelDialog} />
          }
          {
            createSpreadsheet && 
            <CreateSpreadsheet sectionId={sectionId} serverId={serverId} open={spreadsheetDialog} setOpen={setSpreadsheetDialog} />
          }




    
   
   </>
  )
}

export default SectionPlus