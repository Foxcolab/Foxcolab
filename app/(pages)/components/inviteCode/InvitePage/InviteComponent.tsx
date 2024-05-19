"use client";
import Link from 'next/link'
import React from 'react'
import { PiUsersThreeFill } from 'react-icons/pi'
import OtherSignin from '../../Auth/Login/OtherSignin'
import { AiTwotoneMail } from 'react-icons/ai'
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import InviteUpper from './InviteUpper';

interface Props {
    serverName:string
    memberName:string
    inviteCode:string
}
function InviteComponent({serverName, memberName, inviteCode}:Props) {
  const {data:session, status} = useSession();
  console.log(session);
  const router = useRouter();

  const SendOtpHandler =async()=>{
    try {
      const res = await axios.post(`/api/sendOtp/Resend`, {email:session?.user?.email});
      if(res.status===200){
        router.push(`./${inviteCode}/${session?.user?.email}/verify`);
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(status==="authenticated"){
    SendOtpHandler();
  }



  return (
    <>
    
    <div className='invite_container'>
        <InviteUpper memberName={memberName} serverName={serverName} />
        <div className='invite_lower'>
          <div className='normal_txt'>
          We suggest using <b>the email address that you use for work</b>.
          <div className="three_link">
          <button onClick={()=>{signIn("google")}}><FcGoogle/> Continue with Google</button>
         <button onClick={()=>signIn("github")}><FaGithub/> Continue with Github</button>
            <Link href={`./${inviteCode}/email`}><AiTwotoneMail/> Continue with Email</Link>
          
          
          </div>
          </div>
        </div>
    </div> 
    
    
    </>
  )
}

export default InviteComponent