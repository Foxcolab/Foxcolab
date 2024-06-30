"use client";

import React, { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from 'next/link';
import { IoMdMailUnread } from 'react-icons/io';
import { CgMail } from 'react-icons/cg';
import { PiMicrosoftOutlookLogo } from 'react-icons/pi';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';


interface Props {
  params:{
    userId:string
  }
}

export const metadata: Metadata = {
  title: 'Verify OTP | Foxcolab',
  description: "Enter your OTP to verify.",
}
function ConfirmMail({params}:Props) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const OnChangeHandler =async(value:string)=>{
    try {
      setValue(value);
      if(value.length===6){
        setLoading(true);
        const res = await axios.post(`/api/forget-password/verify`, {userId:params.userId, otp:parseInt(value)});
        console.log(res);
        if(res.status===200){
          router.push(`/new-password/${res.data.userId}`);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
    
    <div className='h-[100vh] w-[100vw]'>
      <div className='flex items-center justify-center flex-col h-[100vh]' >
      <div className='text-[1.8rem] font-bold mb-8'>Foxcolab</div>
      <div className='text-[2.8rem] font-bold '>Check your email for a code</div>
      <div className='text-[1.1rem] text-center mt-4  text-gray-500 dark:text-gray-200'>We’ve sent a 6-character code to your entered email id. The code expires in 10 minutes, <br /> so please enter it soon.</div>
      
      <div className='my-8'>
      <InputOTP maxLength={6} onChange={(e)=>OnChangeHandler(e)} value={value}>
      <InputOTPGroup>
        <InputOTPSlot index={0} className='h-[5rem] w-[5rem]' />
        <InputOTPSlot index={1} className='h-[5rem] w-[5rem]' />
        <InputOTPSlot index={2} className='h-[5rem] w-[5rem]' />
      </InputOTPGroup>
      <InputOTPSeparator className='w-[2rem]' />
      <InputOTPGroup>
        <InputOTPSlot index={3} className='h-[5rem] w-[5rem]' />
        <InputOTPSlot index={4} className='h-[5rem] w-[5rem]' />
        <InputOTPSlot index={5} className='h-[5rem] w-[5rem]' />
      </InputOTPGroup>
    </InputOTP>
      </div>

      {loading && "Loading..."}



      <div className="verify_links flex gap-[5rem]">
                <Link href={'https://mail.google.com/mail/u/0'} target="_blank"><span className='text-xl'><MdOutlineMarkEmailUnread/></span> Open Gmail</Link>
                <Link href={'https://outlook.live.com/mail/0/inbox'} target="_blank"><span className='text-xl'><PiMicrosoftOutlookLogo/> </span>Open Outlook</Link>
            </div> 
          <p style={{fontSize:"0.90rem", color:'var(--color3)', marginTop:'0.3rem'}}>Can’t find your code? Check your spam folder!</p>  


      <div className='verify_links flex gap-[5rem]'>
      <Link href={'https://mail.google.com/mail/u/0'} target="_blank">Privacy & Terms </Link>
      <Link href={'https://outlook.live.com/mail/0/inbox'} target="_blank">Contact Us</Link>
      
      </div>

      </div>
    </div>
    
    
    
    </>
  )
}

export default ConfirmMail