import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import GroupContent from '@/app/(pages)/components/groups/GroupContent';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
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
    
  return (
    <>
        
        <MainSidebar server={server}>
    <div className="section_container">
        
        <SectionHeader icon={<MdGroups/>} name={"People & user groups"} />


        <GroupContent serverId={server.id} members={server.Members} groups={groups} />






      </div>
    </MainSidebar>
    
    
    
    </>
  )
}

export default Groups