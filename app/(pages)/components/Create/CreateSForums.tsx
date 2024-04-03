"use client";
import React, { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { FaPlusCircle } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import Loader from '../Loaders/Loader';
import { useRouter } from 'next/navigation';

interface Props {
  serverId:string,
  sectionId:string,
  forumsId:string
}

function CreateSForums({serverId, sectionId, forumsId}:Props) {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const SubmitHandler =async()=>{
      try {
        
        setLoading(true);
        const res = await axios.post(`/api/forums/post?serverId=${serverId}&sectionId=${sectionId}&forumId=${forumsId}`, { title:name });
        router.refresh();
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
      <button className='cnvs_cnote'><FaPlusCircle/> Create Post</button>
      </DialogTrigger>
      <DialogContent className="" style={{zIndex:'10000 !important', height:"40vh", width:"60vw"}}>
        <DialogHeader>
          <DialogTitle>Create a Forums Post</DialogTitle>
          <DialogDescription>
          Forum Channels provide a space for discussions.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
          
          <div className="create_ss">
            <label htmlFor="">Topic</label>
            <Textarea id="username" placeholder={`Write the topic...`} className="col-span-3" onChange={e=>setName(e.target.value)} />

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

export default CreateSForums