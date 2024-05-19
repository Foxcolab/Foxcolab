import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import GroupContent from '@/app/(pages)/components/groups/GroupContent';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import React from 'react'
import { MdGroups } from "react-icons/md";


interface PinnedProps {
  params:{
    id:string
  }
}

async function Groups({params}:PinnedProps) {
  const profile = await myProfile();
    
    if(!profile) redirect('/home');
    const server = await getServer(params?.id, profile.id);

    if(!server) redirect('/home');
    

    const groups = await db.group.findMany({
      where:{
        serverId:params.id as string
      },
      include:{
        members:{
          include:{
            user:true
          }
        },
        createdUser:true
      }
    });
    console.log(groups);
    const member = await db.member.findFirst({
      where:{
        userId:profile.id,
        serverId:server.id
      }
    })
    if(!member) return redirect(`servers/${server.id}`)

    
    let hasPermission = false;
    const whoCanUpdate = server.whoManageGroups;
    if(((member.role==="user" || member.role==="moderator" || member.role==="admin") && whoCanUpdate==="user") || ((member.role==="moderator" || member.role==="admin") && whoCanUpdate==="moderator") || (member.role==="admin" && whoCanUpdate==="admin")  ){
    
        hasPermission = true;
    }
    
  return (
    <>
        
      
    <ServerHome server={server} user={profile}>
    <div className="forum_msg_container">
        
    <SectionHeader icon={<MdGroups/>} name={"People & user groups"} />
    <div className="forum_messages">
    <GroupContent serverId={server.id} members={server.Members} groups={groups} hasPermission={hasPermission} />
    </div>
       
       </div>
    </ServerHome>
    
    
    </>
  )
}

export default Groups