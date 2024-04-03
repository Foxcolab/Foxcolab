import { db } from '@/prisma';
import React from 'react';
import { PiUsersThreeFill } from "react-icons/pi"; 
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import Link from 'next/link';
// import { headers } from 'next/headers';
interface InviteCodePageProps {
  params:{
    inviteCode:String,
    name:String
  }
}

async function InviteCode({params}:InviteCodePageProps) {
  console.log(params.inviteCode, params.name);

  const server = await db.server.findFirst({
    where:{
      inviteCode:params.inviteCode as string
    },
    include:{
      Members:{
        include:{
          user:true
        }
      }
    }
  });

  console.log(server);
  

  const EmailContinue =()=>{
    // const header = headers();
    // const pathname = header.get('next-url');
    // console.log(pathname);
    
  }


  return (
    <>
    
    
    <div className='invite_container'>
        <div className='invite_upper'>
          <div className="test_hdng">
              Foxcolab
          </div>
          <div className="fox_hh1">
            <h1>See what <span className='invite_title'>{params.name}</span> is up to </h1>
            <p>Slack is a messaging app that brings your whole team together.</p>
          </div>
            <div className='mem_ico'>
              <div className='member_icons'> <PiUsersThreeFill/> </div>
              <div> <b>{server?.Members[0].user?.name}</b> & many more </div>
              </div>
        </div>
        <div className='invite_lower'>
          <div className='normal_txt'>
          We suggest using <b>the email address that you use for work</b>.
          <div className="three_link">
            <button><FcGoogle/> Continue with Google</button>
            <button><BsApple/> Continue with Apple</button>
            <Link href={`./${params.inviteCode}/email`}><AiTwotoneMail/> Continue with Email</Link>
          
          
          </div>
          </div>
        </div>
    </div>
    
    
    
    </>
  )
}

export default InviteCode