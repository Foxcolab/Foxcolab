
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar'
import SinglePost from '@/app/(pages)/components/SaveLater/SinglePost';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React from 'react'
import {MdOutlineDataSaverOn} from "react-icons/md"
import Pinned from '@/app/(pages)/components/SaveLater/Pinned';
import { getServer } from '@/lib/db/ServerLib';
import SavedContainer from '@/app/(pages)/components/SaveLater/SavedContainer';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
interface SavedLater {
  params:{
    id:string
  }
}
async function SaveForLater({params}:SavedLater) {
  const profile = await myProfile();
    const count = 1;
    
    if(!profile) redirect('/home');
    const server = await getServer(params?.id, profile.id);


    if(!server) redirect('/home');


    const myLater = await db.later.findMany({
      where:{
        createdUser:{
                userId:profile.id
        },
        serverId:server.id,
      },
      include:{
          message: {
              include:{
                channel:true,
                 member:{
                  include:{
                      user:true,
                  }
                 } ,
                 uploadedFiles:true
              }
          }
      }
  });  
  // console.log("*******",myLater[0].message?.member.user?.name);
  

  return (
    <>
    
   
      <ServerHome server={server} user={profile}>
    <div className="forum_msg_container">
        
    <SectionHeader icon={<MdOutlineDataSaverOn/>} name={"Saved for later"} />

    <div className="forum_messages">
    <SavedContainer savedPosts={myLater} userId={profile.id as string} />

    </div>
       </div>
    </ServerHome>


    
    </>
  )
}

export default SaveForLater