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
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import Loader from '../Loaders/Loader';
import { useParams } from 'next/navigation';
import { MdOutlineContentCopy } from 'react-icons/md';
import { cn } from '@/lib/utils';
const { createShortUrl, decodeURL } = require('shortlnk');



interface Props {
  serverName:string
  inviteCode:string
  userName:string
  open?:boolean
  setOpen?:any
}

function Invite({serverName, inviteCode, userName, open, setOpen}:Props) {
  const [email, setEmail] = useState('');
  const [invitetext, setInviteText] = useState("Copy");
  const [loading, setLoading] = useState(false);

  const params = useParams();


  const CreateLinkShorter = async(link:string)=>{
    try {
      console.log("Creating a short link...");
      const res = await createShortUrl(link);
      console.log(res);
      if(res.success){
        return res.shortUrl;
      }else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

const SubmitHadler =async()=>{
    try {
    setLoading(true);
    const link = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/a/${inviteCode}`;
    console.log("Create Link:::",CreateLinkShorter(link));
      
      // const res = await axios.post(`/api/sendmail?serverId=${params?.id}`, {to:email, name:serverName,link, userName });
      // console.log(res);
      setEmail('');
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.log(error);
      
    }
  }

  const copyHandler =async()=>{
    const link = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/a/${inviteCode}`;
    // const res = await CreateLinkShorter(copyText);
    // console.log("Create Link:::",res);
    navigator.clipboard.writeText(link);
    setInviteText("Copied");
  }
  return (
    <>
    
    <div className="sidecontent">
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
      <button className='invite '><IoMdPersonAdd/> Invite Other </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] pt-6" style={{zIndex:'10000 !important'}}>
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
        <div className='text-sm' style={{color:"var(--color3)"}}>Or, send a server invite link to colleagues</div>
        <div className='flex items-center justify-between border px-2 py-[0.4rem] rounded' style={{background:"var(--background2)"}}>
          <div className='w-full pr-4'>
            <input type='text' value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/a/${inviteCode}`} readOnly className='border-none outline-none focus:border-none w-full bg-transparent text-[0.9rem]' style={{color:"var(--color2"}} />
          </div>
          <div onClick={copyHandler} className={cn("w-[5rem] cursor-pointer h-full flex items-center justify-center flex-none text-[1rem] bg-green-600 hover:bg-green-700 py-[0.3rem] px-2 rounded gap-1 text-sm ", invitetext==="Copied" && "bg-green-700")}><span className="text-[1.1rem]"><MdOutlineContentCopy/> </span>{invitetext}</div>
        </div>
        
        <DialogFooter className='mt-4'>

          {
            loading ? <Loader/> : <button type="submit" onClick={SubmitHadler} className='px-6 py-[0.3rem] bg-cyan-500 hover:bg-cyan-600 text-white rounded text-[0.95rem]'>Invite</button>
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
    </>
  )
}

export default Invite