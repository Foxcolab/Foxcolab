
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import SchemaHeader from '@/app/(pages)/components/Schema/Header/SchemaHeader';
import TestChannelHeader from '@/app/(pages)/components/Schema/Header/TestChannelHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import CreateTest from '@/app/(pages)/components/Tests/CreateTest';
import SingleTest from '@/app/(pages)/components/Tests/SingleTest';
import TestChannelComponent from '@/app/(pages)/components/Tests/TestChannel/TestChannelComponent';
import TestChannelContainer from '@/app/(pages)/components/Tests/TestChannel/TestChannelContainer';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import React from 'react'
import { IoSearch } from 'react-icons/io5';
import { MdForum } from "react-icons/md";

interface ForumsProps {
  params:{
    id:string,
    testChannelId:string
  }
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

async function TestChannel({params}:ForumsProps) {
  const profile = await myProfile();
  if(!profile) redirect('/home')


  const server = await getServer(params.id, profile.id);


  if(!server) redirect('/home')


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
  const testChannel = await db.testChannel.findFirst({
    where:{
      id:params.testChannelId,
      // serverId:params.id
    },
    include:{
      Tests:{
        include:{
          createdUser:{
            include:{
              user:true
            },
            
          },
          questions:true
        },
        orderBy:{
          createdAt:"desc"
        }
      },
      Results:{
        where:{
          memberId:member.id
        },
        orderBy:{
          submitTime:"desc"
        }
      },
      createdUser:true,
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
      }
      

    }
  });
 
  if(!testChannel) redirect(`/severs/${params.id}`);

  const members = testChannel?.Members;
  const managers = testChannel?.manager;

  let isAdmin = false;
  for(let i=0; i<testChannel?.manager?.memberIds?.length; i++){
    if(testChannel.manager?.memberIds[i]===member.id){
      isAdmin=true;
      break;
    }
  }
  const createdAt = format(new Date(testChannel.createdAt), DATE_FORMAT);
  let sendMsg = testChannel.isEveryoneCreate !==undefined && testChannel.isEveryoneCreate!==null ? testChannel.isEveryoneCreate : true;


  return (
    <>
    



      {/* <TestChannelContainer tests={testChannel.Tests} sectionId={testChannel.sectionId} /> */}


    <MainSidebar server={server}>

   

      <TestChannelComponent 
      tests={testChannel.Tests} 
      sectionId={testChannel.sectionId}
      server={server}
      testChannelName={testChannel.name}
      members={members}
      serverMembers={testChannel.Members}
      sendMsg={sendMsg}
      managers={managers}
      createdAt={createdAt}
      createdBy={testChannel.createdUser?.name as string}
      type={testChannel.type}
      isAdmin={isAdmin}
      description={testChannel.description as string}
      results={testChannel.Results}
      testLength={testChannel.Tests.length}
      
      />

</MainSidebar>
    
    
    </>
  )
}

export default TestChannel;