import ChannelHeader from '@/app/(pages)/components/Channel/ChannelHeader';
import CreateSForums from '@/app/(pages)/components/Create/CreateSForums';
import ForumContainer from '@/app/(pages)/components/Forum/ForumContainer';
import ForumHeader from '@/app/(pages)/components/Forum/ForumHeader';
import ForumsHeaderSection from '@/app/(pages)/components/Forum/ForumsHeaderSection';
import SingleForums from '@/app/(pages)/components/Forum/SingleForums';
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import SchemaHeader from '@/app/(pages)/components/Schema/Header/SchemaHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import React from 'react'
import { FaHeartCirclePlus } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { MdForum } from "react-icons/md";

interface ForumsProps {
  params:{
    id:string,
    forumId:string
  }
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";


async function ForumsId({params}:ForumsProps) {
  const profile = await myProfile();
  if(!profile) redirect('/home')


  const server = await getServer(params.id, profile.id);


  if(!server) redirect('/home')

  
  const forumsChannel = await db.forumsChannel.findFirst({
    where:{
      id:params.forumId,
      serverId:server.id
    },
    include:{
      Forums:{
        include:{
          member: {
            include:{
              user:true
            }
          },
          responses:{
            include:{
              member:{
                include:{
                  user:true
                }
              }
            }
          }
      },
      orderBy:{
        createdAt:"desc"
      }
    },
    Members:{
      include:{
        user:true
      }
    },
    manager:{
      include:{
        member:{
          include:{
            user:true
          }
        }
      }
    },
    createdUser:true
  }});
  if(!forumsChannel) redirect(`/severs/${params.id}`);

  const member = await db.member.findFirst({
    where: {
      serverId: params.id,
      userId: profile?.id,
    },
    include:{
      user:true

    }
  });

  if ( !member) {
    redirect("/");
  }
  // const isAdmin = member.id===forumsChannel.createdBy;
  const managers = forumsChannel.manager?.member;
  let isAdmin = false;
  for(let i=0; i<forumsChannel?.manager?.memberIds?.length; i++){
    if(forumsChannel.manager?.memberIds[i]===member.id){
      isAdmin=true;
      break;
    }
  }

  const createdAt = format(new Date(forumsChannel.createdAt), DATE_FORMAT);
  let sendMsg = forumsChannel.isEveryonePost !==undefined && forumsChannel.isEveryonePost!==null ? forumsChannel.isEveryonePost : true;

  return (
    <>
    

    <MainSidebar server={server}>
    <div className="body_content_container">

   
    <SchemaHeader
    name={forumsChannel.name}
    members={forumsChannel.Members}
    serverMembers={server.Members}
    description={forumsChannel.description as string}
    createdBy={forumsChannel.createdUser?.name as string}
    createdAt={createdAt}
    type={forumsChannel.type}
    isAdmin={isAdmin}
    schemaType="Forums"
    managers={forumsChannel.manager}
    sendMsg={sendMsg}

    
    
    />
    
    <div className="canvas_container">
      <ForumHeader sectionId={forumsChannel?.sectionId} />
      <div className='cnvs_sc'>
        <div><b>All Forums</b></div>
       </div>

      
      <ForumContainer forums={forumsChannel?.Forums} />
      

    </div>


    </div>
    </MainSidebar>
    
    
    </>
  )
}

export default ForumsId