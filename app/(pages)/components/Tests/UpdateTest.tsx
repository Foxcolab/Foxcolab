"use client";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { Test } from '@prisma/client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Loader from '../Loaders/Loader';



function UpdateTest({test}:{test:Test}) {
  const [name, setName] = useState(test.name)
  const [description, setDescription] = useState(test.description);
  const [time, setTime] = useState(test.time);
  const [level, setLevel] = useState(test.level);
  const [loading, setLoading] = useState(false);
  const [passmarks, setPassmarks] = useState(test.passmarks);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter()
  const submitHandler = async()=>{
    try {
      setLoading(true);
      await axios.put(`/api/test/new?serverId=${params?.id}&testId=${params?.testId}&testChannelId=${params?.testChannelId}`, {name, description, time, level, passmarks});
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      console.log(error);
      
    }
  }



  return (
    <>
      <div className='w-full '>
            <div className='q_mangr'>
            <span className='d-flex w-full pt-4 font-semibold gap-2 rounded-md test_info' > Update - "{test.name}"</span>
          
            </div>
   
    <div className="update_form">
    <div className='tt_ss overflow-scroll p-4'>
        <div className="create_ss">
            <label className='font-semibold' htmlFor="">Name</label>
            <Input id="username" placeholder={`Write the test name...`} className="col-span-3" onChange={e=>setName(e.target.value)} defaultValue={name} />

        </div>
          <div className="create_ss">
            <label className='font-semibold' htmlFor="">Description</label>
            <Textarea id="username" placeholder={`write the description about the topic`} className="col-span-3" onChange={e=>setDescription(e.target.value)} defaultValue={description} />

        </div>
        <div className="create_ss">
            <label className='font-semibold' htmlFor="">Level</label>
            <Select onValueChange={e=>setLevel(e)} defaultValue={level} >
      <SelectTrigger className="w-full" id='username'>
        <SelectValue placeholder="Select level--" />
      </SelectTrigger>
      <SelectContent id='username'>
        <SelectGroup  >
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
            <div className='d-flex items-center w-full gap-2'><input type="range" id="volume" name="volume" min="0" max="120" onChange={e=>setTime(e.target.value)} className='w-full'defaultValue={time} /> <span className='text-sm text-slate-600'>{time}</span></div>
          
        </div>
        <div className="create_ss">
            <label htmlFor="" className='font-semibold'>Pass Mark (%)</label>
            <div className='d-flex items-center w-full gap-2'>
              <Input id='username' type="text" onChange={e=>setPassmarks(e.target.value)} placeholder='50%' defaultValue={passmarks} />
            </div>
          
        </div>
        <div className="create_ss">
          {
            loading ? <Loader/> : 
            <button className='update_test' onClick={submitHandler}>Update</button>
          }
            
          
        </div>

        </div>
    </div>
    </div>


    </>
  )
}

export default UpdateTest