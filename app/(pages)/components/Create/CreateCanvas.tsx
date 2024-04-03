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
  import { Input } from "@/components/ui/input"
import { FaPlusCircle } from 'react-icons/fa'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button';
import { Section } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loader from '../Loaders/Loader';

interface Props {
    serverId:String,
    sectionId:String
}


function CreateCanvas({serverId, sectionId}:Props) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);
    const router =useRouter();
    const SubmitHandler =async()=>{
        try {
            setLoading(true);
          const res = await axios.post(`/api/canvas/create?serverId=${serverId}&sectionId=${sectionId}`, {title:name, type});
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
      <button  className='drpdn_ip'><FaPlusCircle/> Create Canvas</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Create a Canvas</DialogTitle>
          <DialogDescription>
          Channels are where conversations happen around a topic. Use a name that is easy to find and understand.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
      
          <div className="create_ss">
            <label htmlFor="">Name</label>
            <Input id="username" placeholder='New year plans' className="col-span-3" onChange={e=>setName(e.target.value)} />
          </div>

          <div className='create_tt'>
            <label htmlFor="">Canvas Type</label>
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

export default CreateCanvas