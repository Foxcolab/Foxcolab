"use client";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import OtpInput from "react-otp-input"
import Link from "next/link";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface InviteCodePageProps {
    params:{
      inviteCode:string,
      name:string,
      emailId:string
    }
  }
function VerifyPage({params}:InviteCodePageProps) {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    // const email = "bikramshit.mail.id@gmail.com"
    const router = useRouter();
    const email =  decodeURIComponent(params?.emailId);
    console.log(email);
    const { toast } = useToast();

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
    
  return (
    <div className='verify_container'>
        <div className='otp_container'>
            <h3>Foxcolab</h3>
            <h1>Check your email for a code</h1>
            <p>We’ve sent a 6-character code to <b>{email}</b>. The code expires shortly,<br /> so please enter it soon.</p>
            <div className='otpInput'>

            <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
  
            </div>
            {
            loading ? <Button disabled className=''>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
            Please wait
          </Button> : <button className='' onClick={HandlerSubmit}>Continue</button>
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
  )
}

export default VerifyPage