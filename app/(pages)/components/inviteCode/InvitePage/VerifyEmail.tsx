
"use client";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from 'react'
import OtpInput from "react-otp-input"
import Link from "next/link";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


interface InviteCodePageProps {
    params:{
      inviteCode:string,
      name:string,
      emailId:string
    }
    createdAt:Date | null
  }

function VerifyEmail({params, createdAt}:InviteCodePageProps) {
    const [loading, setLoading] = useState(false);
    const [resLoading, setResLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const currentTime = new Date();
    createdAt = new Date(createdAt);
    createdAt = createdAt.getTime() + (60*1000);
    let calc = createdAt - currentTime.getTime();
    calc = Math.trunc(calc/1000);

    const [seconds, setSeconds] = useState(calc);
    // const email = "bikramshit.mail.id@gmail.com"
    const router = useRouter();
    const email =  decodeURIComponent(params.emailId);
    // console.log(email);
    const { toast } = useToast();

    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(prevSeconds => {
            if (prevSeconds <= 0) {
              clearInterval(interval); // Clear the interval when countdown reaches zero
              return 0;
            } else {
              return prevSeconds - 1;
            }
          });
        }, 1000);
    
        return () => clearInterval(interval); // Clear the interval on component unmount
      }, [seconds]);
    
    //   console.log(seconds);
    const HandlerSubmit =async()=>{
        try {
            setLoading(true);
            // console.log(otp, email);
            
            const res = await axios.post('/api/join-server', {otp, email, inviteCode:params.inviteCode})
            console.log(res);
            
            if(res.status==200){
                router.push(`/servers/${res.data.serverId}`);

            }else {
              ToastSubmit(res.data.error);

            }
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
            
        }
    }
    const ToastSubmit =(message:any) => {
        toast({
          title: message,
          // description: "Friday, February 10, 2023 at 5:57 PM",
          // action: (
          //   // <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        })
      }

      const OnChangeHandler =async(value:string)=>{
        try {
          setValue(value);
          setError('');
          if(value.length===6){
            setLoading(true);
            const res = await axios.post('/api/join-server', {otp, email, inviteCode:params.inviteCode})

            console.log(res);
            if(res.status==200){
              router.push(`/servers/${res.data.serverId}`);

          }else {
            ToastSubmit(res.data.error);

          }
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          setError("Wrong otp or expired");
          console.log(error);
        }
      }

      const ResendOtp = async()=>{
        try {
            setResLoading(true);
            const res = await axios.post(`/api/sendOtp/Resend`, {email});
            console.log(res);
            if(res.status===200){
                let time = res.data.time;
                time = new Date(time);
                time = time.getTime() + 60000;
                let nowTime = new Date();
                let diff = time - nowTime.getTime();
                diff = Math.trunc(diff/1000);
                console.log(diff);
                setSeconds(diff);
            }
            router.refresh();
            setResLoading(false);
        } catch (error) {
            console.log(error);
            setResLoading(false);
        }
      }
    
  return (
    <>
    
    <div className='verify_container'>
        <div className='otp_container'>
            <h3>Foxcolab</h3>
            <h1>Check your email for a code</h1>
            <p>We’ve sent a 6-character code to <b>{email}</b>. The code expires shortly,<br /> so please enter it soon.</p>
            <div className=''>

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

      {loading && "Checking..."}
      <div className="text-red-500 text-md font-semibold ">{error}</div>
            </div>
            {
                seconds>0 && 
            <div className="text-sm py-4" style={{color:"var(--color3)"}}>You can resend otp in {seconds} seconds</div>
        }
        {
            seconds<=0 && <div><button onClick={ResendOtp}>   Resend OTP</button></div>
        }
            
           

          <div>
            <div className="verify_links">
                <Link href={'https://mail.google.com/mail/u/0'} target="_blank"><CgMail/> Open Gmail</Link>
                <Link href={'https://outlook.live.com/mail/0/inbox'} target="_blank"><PiMicrosoftOutlookLogo/> Open Outlook</Link>
            </div> 
          <p style={{fontSize:"0.95rem", color:'var(--color3)', marginTop:'0.3rem'}}>Can’t find your code? Check your spam folder!</p>  

          </div>  
        </div>
    </div>
    
    
    </>
  )
}

export default VerifyEmail