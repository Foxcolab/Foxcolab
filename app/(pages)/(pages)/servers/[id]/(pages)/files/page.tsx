import FilesContainer from '@/app/(pages)/components/Files/FilesContainer';
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { Message } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'
import { SiFiles } from 'react-icons/si';



interface FilesProps {
    params:{
      id:string
    }
  } 

async function page({params}:FilesProps) {
    const profile = await myProfile();
  if(!profile) redirect('/home');

  const server = await getServer(params?.id, profile.id);
  if(!server) redirect('/home');

    const member = await db.member.findFirst({
        where:{
            userId:profile.id,
            serverId:server.id
        }
    });
    if(!member)return redirect(`/servers/${profile.id}`);
    
    const channels = await db.channel.findMany({
        where:{
            serverId:server.id,
            memberIds:{
                hasSome:[member.id]
            }
        },
        include:{
            Members:{
              include:{
                user:true
              }
            }
        }
    });
    let files:Message[] = [];
   
    
    for(let i=0; i<member.channelIds.length; i++){
      const messages = await db.message.findMany({
        where:{
          channelId:member.channelIds[i],
          fileUrl:{
            isEmpty:false
          }
        },
        include:{
          member:{
            include:{
              user:true
            }
          },
          uploadedFiles:{
            include:{
              createdMember: {
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
      });
      for(let i=0; i<messages.length; i++){
        files.push(messages[i]);
      }
    }

    const allMembers = server.Members;
    

  return (
    <>
    
    <MainSidebar server={server}>
    <div className="section_container">
        
        <SectionHeader icon={<SiFiles/>} name={"Files"} />
      
        <FilesContainer messages={files} memberId={member.id} server={server}  />





      </div>
    </MainSidebar>
    
    
    
    </>
  )
}

export default page