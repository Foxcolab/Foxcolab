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


 function CreateChannel({serverId, sectionId}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  // const [sectionId, setSectionId] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const SubmitHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.post(`/api/channel/new?serverId=${serverId}&sectionId=${sectionId}`, {name, description, type});
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

  const NameHandler =(value)=>{
    
        value =value.replace(/ /g,"-");
        value=value.toLowerCase();
        setName(value);
        document.getElementById('handle').value=value;
        return;
    
}

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
      <button className='drpdn_ip'><FaPlusCircle/> Create Channel</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
          <DialogDescription>
          Channels are where conversations happen around a topic. Use a name that is easy to find and understand.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
      
          <div className="create_ss">
            <label htmlFor="">Name</label>
            <Input id="handle" placeholder='#Subscription Plans' className="col-span-3" onChange={e=>NameHandler(e.target.value)} />
          </div>
          <div className="create_ss">
            <label htmlFor="">Description</label>
            <Textarea id="handle" placeholder='Write description about the channel' className="col-span-3" onChange={e=>setDescription(e.target.value)} />
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

export default CreateChannel