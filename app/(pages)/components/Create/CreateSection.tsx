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
import { Label } from "@/components/ui/label"
import axios from 'axios';
import { db } from '@/prisma';
import { useRouter } from 'next/navigation';
import Loader from '../Loaders/Loader';

interface Props {
  serverId:string
  openDialog:boolean
  setOpenDialog:any
}

function CreateSection({serverId, openDialog, setOpenDialog}:Props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const CreateHandler=async()=>{
    try {
      setLoading(true);
      const res = await axios.post(`/api/section/new`, {name, serverId});
    
      if(res.status===200){
        router.refresh();
        setOpen(false);
      setLoading(false);
      }else {
      setLoading(false);
      }

      
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }



  return (
    <>
        <Dialog open={open || openDialog} onOpenChange={ (openDialog==true || openDialog===false) ? setOpenDialog : setOpen}> 
      <DialogTrigger asChild>
        {
          (openDialog===false || openDialog===true ) ? '': 
      <button className='csec_btn'><FaPlusCircle/> Create Section</button>

        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Create a Section</DialogTitle>
          <DialogDescription>
          Synced channels in this category will automatically match to this setting. 
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
          <div className="create_ss">
            <label htmlFor="">Name</label>
            <Input id="username" placeholder={`Prompt Engineering`} onChange={e=>setName(e.target.value)}  className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          {
            loading ? <Loader/> : 
          <Button type="submit" onClick={CreateHandler}>Create</Button>
        }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  
    </>
  )
}

export default CreateSection