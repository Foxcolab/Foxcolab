import JoinServer from '@/app/(pages)/components/home/server/Join/JoinServer';
import ServerIdContainer from '@/app/(pages)/components/home/server/ServerContainer/ServerIdContainer';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import { getServer, getServerWithOutMember } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { Member } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'


interface Props {
  params:{
    id:string
  }
}
async function page({params}:Props) {
      const profile = await myProfile();
      if(!profile) redirect('/home');

      const serverMembers = await db.server.findFirst({
        where:{
          id:params?.id,

        }
      });
      if(!serverMembers) redirect(`/home`);

      const member = await db.member.findFirst({
        where:{
          userId:profile.id,
          serverId:params?.id,
        }
      });

      let isMember = false;
      if(member){
        isMember = true;
      }else {
        isMember = false;
      }
      if(!isMember && serverMembers?.type==="private"){
        redirect('/home');
      }


      let server;
      if(isMember){
        server = await getServer(params?.id, profile.id);
      }else {
        server =await getServerWithOutMember(params?.id)
      }
      
    
      const currentMember:Member = server?.currentMember;
      const isAdmin = (currentMember?.role==="admin" || currentMember?.role==="moderator") || false;



    // isMember = false;
  
  return (
    <>

<ServerHome server={server} user={profile}>
    {
      !isMember && <JoinServer serverName={server?.name as string} />
    }
    <div className="forum_msg_container">
      <ServerIdContainer serverName={server?.name as string} inviteCode={server?.shortInvite?.shortUrl as string} userName={profile.name as string} serverDescription={server?.description as string} totalMember={server?.Members?.length || 1} guides={server?.guides}
      isAdmin={isAdmin} serverCover={server?.coverPic?.publicUrl as string} serverLogo={server?.displayPicture?.publicUrl as string}
      memberId={currentMember?.id}
      />
    </div>

   </ServerHome>
    



    
    </>
  )
}

export default page