import ConfirmPassword from '@/app/(pages)/components/inviteCode/InvitePage/ConfirmPassword'
import InviteUpper from '@/app/(pages)/components/inviteCode/InvitePage/InviteUpper'
import { db } from '@/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { PiUsersThreeFill } from 'react-icons/pi'

interface Props {
    params:{
        name:string
        emailId:string
        inviteCode:string
    }
}
async function page({params}:Props) {
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
    <>
    
    <div className='invite_container'>
    <InviteUpper serverName={server.name} memberName={server.Members[0].user?.name as string} />

        <div className='invite_lower'>
            <ConfirmPassword />
        </div>
    </div>
    
    
    </>
  )
}

export default page