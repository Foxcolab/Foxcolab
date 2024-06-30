import { db } from '@/prisma';
import React from 'react';
import InviteComponent from '@/app/(pages)/components/inviteCode/InvitePage/InviteComponent';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
// import { headers } from 'next/headers';
interface InviteCodePageProps {
  params:{
    inviteCode:String,
    name:String
  }
}

export const metadata: Metadata = {
  title: 'Invitation | Foxcolab',
  description: "Accept the invitation to join the server.",
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
  if(!server) redirect('/');

  

  const EmailContinue =()=>{
    
    
  }


  return (
    <>
    
    
    <InviteComponent serverName={server?.name} memberName={server?.Members[0]?.user?.name as string} inviteCode={server?.inviteCode as string} />
    
    
    
    </>
  )
}

export default InviteCode