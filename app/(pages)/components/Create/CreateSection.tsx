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
  hasPermission:boolean
}

function CreateSection({serverId, openDialog, setOpenDialog, hasPermission}:Props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const [open, setOpen] = useState(false || openDialog);
  const router = useRouter();


  const CreateHandler=async()=>{
    try {
      setLoading(true);
      const res = await axios.post(`/api/section/new`, {name, serverId});
        router.refresh();
        setOpen(false);
        setOpenDialog(false);
        setLoading(false);
    } catch (error) {
        setOpenDialog(false);
        setLoading(false);
      console.log(error);
    }
  }


  const CancelHandler =()=>{
    setOpen(false);
    setOpenDialog(false);
  }

  return (
    <>
        <Dialog open={open} onOpenChange={ setOpen}> 
      <DialogTrigger asChild>
        
        {
          (openDialog===false || openDialog===true ) ? '': 
      <button className='csec_btn' disabled={!hasPermission}><FaPlusCircle/> <span className='overflow_hidden'>Create Section</span></button>

        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] " style={{zIndex:'10000 !important'}}>
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
          <>
          <Button type="submit" onClick={CancelHandler}>Cancel</Button>
          <Button type="submit" className='bg-green-500 text-white hover:bg-green-600' onClick={CreateHandler}>Create</Button>
          
          </>
        }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  
    </>
  )
}

export default CreateSection