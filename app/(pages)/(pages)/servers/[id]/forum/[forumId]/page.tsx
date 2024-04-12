import ChannelHeader from '@/app/(pages)/components/Channel/ChannelHeader';
import CreateSForums from '@/app/(pages)/components/Create/CreateSForums';
import ForumContainer from '@/app/(pages)/components/Forum/ForumContainer';
import ForumHeader from '@/app/(pages)/components/Forum/ForumHeader';
import ForumsCom from '@/app/(pages)/components/Forum/ForumsCom';
import ForumsHeaderSection from '@/app/(pages)/components/Forum/ForumsHeaderSection';
import SingleForums from '@/app/(pages)/components/Forum/SingleForums';
import SectionHeader from '@/app/(pages)/components/Header/SectionHeader';
import SchemaHeader from '@/app/(pages)/components/Schema/Header/SchemaHeader';
import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
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
      createdMember:{
        include:{
          user:true
        }
      },
      schemaActivity:{
        where:{
          forumChannelId:params.forumId
        },
        include:{
          member:{
            include:{
              user:true
            }
          },
          member2:{
            include:{
              user:true
            }
          }
        },
        orderBy:{
          createdAt:"desc"
        }
      },
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
              },
              Reactions:true
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

  const memberId = forumsChannel.memberIds.some((id)=>id===member.id);
  if(!memberId){
    if(forumsChannel.type==="private"){
      redirect(`/servers/${server.id}`);
    }else {
      await db.section.update({
        where:{
          id:forumsChannel.sectionId as string
        },
        data:{
          forumsChannel:{
            update:{
              where:{
                id:forumsChannel.id
              },
              data:{
                Members:{
                  connect:{
                    id:member.id
                  }
                },
                memberIds: {
                  push:member.id
                }
              }
            }
          }
        }
      })
    }
  }





 
  let isAdmin = forumsChannel.createdBy === member.id;
  // for(let i=0; i<forumsChannel?.manager?.memberIds?.length; i++){
  //   if(forumsChannel.manager?.memberIds[i]===member.id){
  //     isAdmin=true;
  //     break;
  //   }
  // }

  const createdAt = format(new Date(forumsChannel.createdAt), DATE_FORMAT);
  let sendMsg = forumsChannel.isEveryonePost !==undefined && forumsChannel.isEveryonePost!==null ? forumsChannel.isEveryonePost : true;
  
  return (
    <>
    

    <ServerHome server={server}>
      <ForumsCom
      name={forumsChannel.name}
      members={forumsChannel.Members}
      serverMembers={server.Members}
      description={forumsChannel.description as string}
      createdBy={forumsChannel.createdMember?.user?.name as string} 
      createdAt={createdAt}
      type={forumsChannel.type}
      isAdmin={isAdmin}
      sendMsg={sendMsg}
      managers={forumsChannel.manager}
      forums={forumsChannel.Forums}
      sectionId={forumsChannel.sectionId}
      schema={forumsChannel}
      member={member}
      
      />
    </ServerHome>
    
    
    </>
  )
}

export default ForumsId