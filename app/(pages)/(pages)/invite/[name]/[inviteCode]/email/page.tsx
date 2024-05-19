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
import { redirect } from 'next/navigation';
import InviteUpper from '@/app/(pages)/components/inviteCode/InvitePage/InviteUpper';
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
      if(!server) redirect(`/`);
    
  return (
    <div>

<div className='invite_container'>
        <InviteUpper serverName={server.name} memberName={server.Members[0].user?.name as string} />
        <div className='invite_lower'>
            <ContinueEmail  />
        </div>
    </div>



    </div>
  )
}

export default EmailLogin