"use client";
import React, { useState } from 'react'
import { FaHeartCirclePlus } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5'
import CreateNote from '../Note/CreateNote';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import NoteTinyMce2 from '../../Editor/Canvas/Note/NoteTinyMce2';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
interface Props {
  sectionId:string
  whoCanCreateNote:boolean
}
function CanvasSearch({sectionId, whoCanCreateNote}:Props) {
    const [search, setSearch] = useState(true);
    const [value, setValue] = useState('');

  return (
    <>
    
    <div className='cnvs_sch'>
        <button><IoSearch/></button>
        <input type='search' placeholder='Search for canvas..' />
        {
          whoCanCreateNote && <CreateNote sectionId={sectionId} />
        }
        
      </div>
    {/* <button onClick={()=>setSearch(true)}>Open</button> */}
 


    </>
  )
}

export default CanvasSearch