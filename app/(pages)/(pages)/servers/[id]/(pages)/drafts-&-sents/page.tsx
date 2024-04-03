import React from 'react'
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { redirect } from 'next/navigation';
import { db } from '@/prisma';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import { MdEditSquare } from 'react-icons/md';
import { BsFillSendFill } from 'react-icons/bs';
import DraftContainer from '@/app/(pages)/components/Draft/DraftContainer';


interface DraftProps {
  params:{
    id:string
  }
} 

async function DraftPage({params}:DraftProps) {
  const profile = await myProfile();
  if(!profile) redirect('/home');

  const server = await getServer(params?.id, profile.id);
  if(!server) redirect('/home');

  const myDrafts = await db.draft.findMany({
    where:{
      serverId:params.id,
      createdMember:{
        userId:profile.id
      }
    },
    include:{
      channel:true
    }
  })

  const messages = await db.message.findMany({
    where:{
      serverId:params.id,
      member:{
        userId:profile.id
      },
    },
    include:{
      channel:true
    }
  })

  return (
   <>
   
   <MainSidebar server={server}>
    <div className="section_container">
        
        <SectionHeader icon={<BsFillSendFill/>} name={"Draft & Sent"} />
        <DraftContainer drafts={myDrafts} sents={messages} />






      </div>
    </MainSidebar>
   
   </>
  )
}

export default DraftPage