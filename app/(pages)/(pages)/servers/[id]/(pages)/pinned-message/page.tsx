
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar'
import Pinned from '@/app/(pages)/components/SaveLater/Pinned';
import SinglePost from '@/app/(pages)/components/SaveLater/SinglePost';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { TbPinnedFilled } from "react-icons/tb";
import { getServer } from '@/lib/db/ServerLib';
import PinnedContainer from '@/app/(pages)/components/PinnedMsg/PinnedContainer';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';

interface PinnedProps {
  params:{
    id:string
  }
}
async function PinnedMessage({params}:PinnedProps) {
  const profile = await myProfile();
    
    if(!profile) redirect('/home');
    const server = await getServer(params?.id, profile.id);

    if(!server) redirect('/home');
    
    const myPinnedPost = await db.pinnedPost.findMany({
      where:{
        createdUser:{
          userId:profile.id
        },
        serverId:server.id as string
      },
      include:{
        message:{
          include:{
            member:{
              include:{
                user:true
              }
            },
            uploadedFiles:true,
            channel:true
          }
        }
      }
    })



  return (
    <>
    
    {/* <MainSidebar server={server}>
    <div className="section_container">
        
        <SectionHeader icon={<TbPinnedFilled/>} name={"Pinned Message"} />

        <PinnedContainer PinnedPosts={myPinnedPost} />
        {
          myPinnedPost.length===0 && 
        <h1 className='nopinn'>No pinned messages yet.</h1>

        }
      </div>
    </MainSidebar> */}

    <ServerHome server={server} user={profile}>
    <div className="forum_msg_container">
    <SectionHeader icon={<TbPinnedFilled/>} name={"Pinned Message"}  />
        <div className="forum_messages">
        <PinnedContainer PinnedPosts={myPinnedPost} />
        {
          myPinnedPost.length===0 && 
        <h1 className='nopinn'>No pinned messages yet.</h1>

        }
        </div>
    </div>
    </ServerHome>
    
    </>
  )
}

export default PinnedMessage