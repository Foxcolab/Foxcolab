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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from 'next/navigation';

interface Props {
  serverId:string,
  sectionId:string,
  testChannelId:string
}

function CreateTest({serverId, sectionId, testChannelId}:Props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [level, setLevel] = useState('easy');
    const [loading, setLoading] = useState(false);
    const [passmarks, setPassmarks] = useState('50');
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const SubmitHandler =async()=>{
      try {
        
        setLoading(true);
        await axios.post(`/api/test/new?serverId=${serverId}&sectionId=${sectionId}&testChannelId=${testChannelId}`, {passmarks, name, time, level, description });
        setLoading(false);
        setOpen(false);
        router.refresh();

      } catch (error) {
        setLoading(false);
        console.log(error);
        
      }
    }
  return (
    <>
    
    
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
      <button className='cnvs_cnote'><FaPlusCircle/> Create Test</button>
      </DialogTrigger>
      <DialogContent className="" style={{zIndex:'10000 !important', height:"650px", maxWidth:"650px"}}>
        <DialogHeader>
          <DialogTitle>Create a Test</DialogTitle>
          <DialogDescription>
          Please fill out the form below to create a new test.
          </DialogDescription>
        </DialogHeader>
        <hr />

        <div className='tt_ss overflow-scroll px-4 py-0'>
        <div className="create_ss">
            <label className='font-semibold' htmlFor="">Name</label>
            <Input id="username" placeholder={`Write the test name...`} className="col-span-3" onChange={e=>setName(e.target.value)}  />

        </div>
          <div className="create_ss">
            <label className='font-semibold' htmlFor="">Description</label>
            <Textarea id="username" placeholder={`write the description about the topic`} className="col-span-3" onChange={e=>setDescription(e.target.value)} style={{resize:"none"}} />

        </div>
        <div className="create_ss">
            <label className='font-semibold' htmlFor="">Level</label>
            <Select onValueChange={e=>setLevel(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select level--" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectLabel>Select level--</SelectLabel>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

        </div>
        <div className="create_ss">
            <label htmlFor="" className='font-semibold'>Time (Min)</label>
            <div className='d-flex items-center w-full gap-2'><input type="range" id="volume" name="volume" min="0" max="120" onChange={e=>setTime(e.target.value)} className='w-full' /> <span className='text-sm text-slate-600'>{time}</span></div>
          
        </div>
        <div className="create_ss">
            <label htmlFor="" className='font-semibold'>Pass Mark (%)</label>
            <div className='d-flex items-center w-full gap-2'>
              <Input type="text" onChange={(e)=>setPassmarks(e.target.value)} defaultValue={passmarks} max={100} min={0} />
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

export default CreateTest