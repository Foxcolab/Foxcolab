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
import Loader from '../Loaders/Loader';
import { useRouter } from 'next/navigation';


interface Props {
  serverId:string
  sectionId:string
  open:boolean
  setOpen:any
}

function CreateTest({sectionId, serverId, open, setOpen}:Props) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const router = useRouter();
    const SubmitHandler =async()=>{
        try {
            setLoading(true);
          const res = await axios.post(`/api/test/testChannel/new?serverId=${serverId}&sectionId=${sectionId}`, {name, type});
          if(res.status===200){
            router.refresh();
          setLoading(false);
          setOpen(false);
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
    
    
    <Dialog open={open} onOpenChange={setOpen}> 
    <DialogTrigger asChild>
      {/* <button className='drpdn_ip'><FaPlusCircle/> Create Test</button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Create a Test channel</DialogTitle>
          <DialogDescription>
          Create a test for conduct a  survey on your server members. You can add questions and categories to the test. Fill out the form to create a new test.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
       
          <div className="create_ss">
            <label htmlFor="">Name</label>
            <Input id="username" placeholder='New year plans' className="col-span-3" onChange={e=>setName(e.target.value)} />
          </div>

          <div className='create_tt'>
            <label htmlFor="">Test Type</label>
            <div className='radiobtns'>
          <input type="radio" value="public" name="channel_type" onChange={e=>setType(e.target.value)} /> Public &nbsp; &nbsp; &nbsp;
          <input type="radio" value="private" name="channel_type" onChange={(e=>setType(e.target.value))} /> Private
            </div>
          </div>
        </div>

        <DialogFooter>
          {loading ? <Loader/> : <Button type="submit" onClick={SubmitHandler}>Submit</Button>}
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    
    
    </>
  )
}

export default CreateTest;