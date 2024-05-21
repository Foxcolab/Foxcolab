import { Test } from '@prisma/client'
import React, { useState } from 'react'
import { FaInfoCircle } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Loader from '../Loaders/Loader';
import { ReloadIcon } from '@radix-ui/react-icons';


function BasicSetting({test}:{test:Test}) {
  const [loading, setLoading] = useState(false);
  const [dialog,setDialog] = useState(false);
  const params = useParams();
  const router = useRouter();
  const DeleteHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.delete(`/api/test/delete?serverId=${params?.id}&testChannelId=${params?.testChannelId}&testId=${test.id}`)
      if(res.status===200){
        router.push(`/servers/${params?.id}/test-channel/${params?.testChannelId}`);
      }
        router.refresh();
        setLoading(false);
        setDialog(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <>
    <div className='w-full'>
    <span className='d-flex  pt-4 font-semibold gap-2 rounded-md test_info ' ><FaInfoCircle/> Test Info</span>
    <div className="testsidebar">
        <div className='respdnt border'>
            <p>RESPONDENTS MONITORING</p>
            <div><span><MdPeopleAlt/> {test.Results.length | 0}</span> Active respondents</div>
        </div>

        <div className="respdnt border">
            <div className='test_dex'><VscDebugBreakpointLog/>{test.questions.length | 0} questions has been created.</div>
            <div className="test_dex"><VscDebugBreakpointLog/>Full mark: {test.fullMarks} </div>
            <div className='test_dex'><VscDebugBreakpointLog/>{test.passmarks | 0}% marks required to pass the test.</div>
            <div className='test_dex'><VscDebugBreakpointLog/>{test.time} minutes for complete the test.</div>
            <div className='test_dex'><VscDebugBreakpointLog/>Test created By: @{test.createdUser.user.name}.</div>
            <div className='test_dex'><VscDebugBreakpointLog/>Click activate  button below to start the test.</div>
        </div>

        <div className='px-4'>
          <button className='px-4 py-[0.30rem] rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white' onClick={()=>setDialog(true)}>Delete</button>
        </div>


    </div>


    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Deleteting <b>{test.name}</b></DialogTitle>
          
        </DialogHeader>
        <div>
        <div className="">
          Are you absolutely sure to delete the test? This action cannot be undone.
        </div>
        </div>
        <DialogFooter>
          {
            loading ?
          <Button type="submit" className='bg-white flex items-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white' disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin " /> Deleting</Button>
        :
        <>
            <Button className='bg-transparent border text-black hover:bg-transparent ' onClick={()=>setDialog(false)}>Cancel</Button>
          <Button type="submit" className='bg-white  border border-red-500 text-red-500 hover:bg-red-500 hover:text-white' onClick={DeleteHandler}>Submit</Button>
        
            </>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>


    </div>
    
    
    </>
    
  )
}

export default BasicSetting