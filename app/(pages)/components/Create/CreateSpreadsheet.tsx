"use client";
import React, { useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios';
import { db } from '@/prisma';
import { useRouter } from 'next/navigation';
import Loader from '../Loaders/Loader';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  serverId:string
  sectionId:string
  open:boolean
  setOpen:any
}

 function CreateSpreadsheet({serverId, sectionId, open, setOpen}:Props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  // const [sectionId, setSectionId] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const router = useRouter();
  const SubmitHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.post(`/api/spreadsheet/new?serverId=${serverId}&sectionId=${sectionId}`, {name, description, type});
      if(res.status===200){
       router.refresh();
       setOpen(false);
      setLoading(false);
      }else {
      setLoading(false);
      }

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
      {/* <button className='drpdn_ip'><FaPlusCircle/> Create Spreadsheet</button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Create a Spreadsheet</DialogTitle>
          <DialogDescription>
          Spreadsheets are where you create multiple tables. Store various data on a single table.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
      
          <div className="create_ss">
            <label htmlFor="">Name</label>
            <Input id="handle" placeholder='Budget-2024' className="col-span-3" onChange={e=>setName(e.target.value)} />
          </div>
          <div className="create_ss">
            <label htmlFor="">Description</label>
            <Textarea id="handle" placeholder='Write description about the spreadsheet' className="col-span-3" onChange={e=>setDescription(e.target.value)} />
          </div>
          <div className='create_tt'>
            <label htmlFor="">Channel Type</label>
            <div className='radiobtns'>
          <input type="radio" value="public" name="channel_type" onChange={e=>setType(e.target.value)} /> Public &nbsp; &nbsp; &nbsp;
          <input type="radio" value="private" name="channel_type" onChange={(e=>setType(e.target.value))} /> Private
            </div>
          </div>
        </div>

        <DialogFooter>
        {
            loading ? <Loader /> :<Button type="submit" onClick={SubmitHandler}>Create</Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>

    </>
  )
}

export default CreateSpreadsheet;