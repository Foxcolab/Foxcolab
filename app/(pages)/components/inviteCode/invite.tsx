"use client"
import React,{ useState }  from 'react'
import { IoMdPersonAdd } from "react-icons/io";
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
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { ImLink } from "react-icons/im";
import axios from 'axios';

function invite({serverName, inviteCode}) {
  const [email, setEmail] = useState('');
  const [invitetext, setInviteText] = useState("Copy Invite Code");
  const SubmitHadler =async()=>{
    try {
      console.log("*************", serverName);
    const link = `http://localhost:3000/invite/${serverName}/${inviteCode}`;
      
      const res = await axios.post('/api/sendmail', {to:email, name:serverName,link });
      console.log(res);
      setEmail('');
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const copyHandler =()=>{
    const copyText = `http://localhost:3000/invite/${serverName}/${inviteCode}`;
    navigator.clipboard.writeText(copyText);
    setInviteText("Copied");
  }
  return (
    <>
    
    <div className="sidecontent">
    <Dialog> 
      <DialogTrigger asChild>
      <button className='invite'><IoMdPersonAdd/> Invite Other </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] " style={{zIndex:'10000 !important'}}>
        <DialogHeader>
          <DialogTitle>Invite People to {serverName}</DialogTitle>
          <DialogDescription>
          Invite other collegeues to communicate with them.
          </DialogDescription>
        </DialogHeader>
        <div className='tt_ss'>
          <div className="create_ss">
            <label htmlFor="">InviteCode</label>
            <Textarea id="username" placeholder={`Enter email address`} onChange={e=>setEmail(e.target.value)}  className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" color='blue' variant={'link'} onClick={copyHandler}><ImLink/> &nbsp; {invitetext}</Button>
          <Button type="submit" onClick={SubmitHadler}>Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
    </>
  )
}

export default invite