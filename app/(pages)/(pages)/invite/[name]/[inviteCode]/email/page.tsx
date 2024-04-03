import { db } from '@/prisma';
import React, { useState } from 'react';
import { PiUsersThreeFill } from "react-icons/pi"; 
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import ContinueEmail from '@/app/(pages)/components/Continue/ContinueEmail';
interface InviteCodePageProps {
    params:{
      inviteCode:String,
      name:String
    }
  }
async function EmailLogin({params}:InviteCodePageProps) {
    
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
    
  return (
    <div>

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
            <ContinueEmail  />
        </div>
    </div>



    </div>
  )
}

export default EmailLogin