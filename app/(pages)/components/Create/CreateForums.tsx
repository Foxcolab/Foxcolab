"use client"
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
import { Section } from '@prisma/client';
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
import { MdForum } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Loader from '../Loaders/Loader';
import { Textarea } from '@/components/ui/textarea';


function CreateForums({sectionId, serverId}:{sectionId:string, serverId: string}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();  

  const SubmitHandler=async()=>{
    try {
      setLoading(true);
      const res = await axios.post(`/api/forums/new?serverId=${serverId}&sectionId=${sectionId}`,{name,description, type } );
      router.refresh();
      setOpen(false);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.log(error);
      
    }
  }
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
      <button className='drpdn_ip'><FaPlusCircle/> Create Forums</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Create a Forums</DialogTitle>
          <DialogDescription>
          Forum Channels provide a space for discussions.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
       
          
          <div className="create_ss">
            <label htmlFor="">Name</label>
            <Input id="username" placeholder={ `Project discussion`} className="col-span-3" onChange={e=>setName(e.target.value)} />
          </div>
          <div className="create_ss">
            <label htmlFor="">Description</label>
            <Textarea id="username" placeholder={ `Project discussion`} className="col-span-3" onChange={e=>setDescription(e.target.value)} />
          </div>
          <div className='create_tt'>
            <label htmlFor="">Forum Type</label>
            <div className='radiobtns'>
          <input type="radio" value="public" name="channel_type" onChange={e=>setType(e.target.value)} /> Public &nbsp; &nbsp; &nbsp;
          <input type="radio" value="private" name="channel_type" onChange={(e=>setType(e.target.value))} /> Private
            </div>
          </div>
        </div>
        <DialogFooter>
          {
            loading ? <Loader/> :
          <Button type="submit" onClick={SubmitHandler}>Create</Button>
        }
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </>
  )
}

export default CreateForums