
import ChatComponents from '@/app/(pages)/components/Chat/ChatComponents'
import React from 'react'
import { db } from '@/prisma';
import {  myProfile } from '@/lib/db/profile';
import EditorFooter from '@/app/(pages)/components/Editor/EditorFooter';
import { redirect } from 'next/navigation';
import ChatMessages from '@/app/(pages)/components/Chat/ChatMessages';
import ChannelHeader from '@/app/(pages)/components/Channel/ChannelHeader';
import { format } from 'date-fns';
import { getServer } from '@/lib/db/ServerLib';
import ChannelContainer from '@/app/(pages)/components/Channel/component/ChannelContainer';


interface Props {
  params:{
    id:string,
    channelId:string
  }
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

const ChannelChat =async({params}:Props)=> {

  const profile = await myProfile();
  if(!profile) redirect('/home')
  const server = await getServer(params.id, profile.id);
  if(!server) redirect('/home')

  
  const channel = await db.channel.findUnique({
    where: {
      id: params?.channelId ,
      // Members:{
      //   some:{
      //     userId:profile?.id
      //   }
      // }
    },
    include:{
      createdUser:true,
      messages: {
        where:{
          fileUrl:{
            isEmpty:false
          }
        },
        take:5,
        orderBy: {
          createdAt: "desc",
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
      pinnedPost: {
        include:{
          createdUser:{
            include:{
              user:true
            }
          },
          message:{
            include:{
              member:{
                include:{
                  user:true
                }
              }
            }
          }
          
        },
        
      }
    }
  });
  if(!channel) redirect(`/servers/${params.id}`);

  const member = await db.member.findFirst({
    where: {
      serverId: params.id,
      userId: profile?.id,
      channels: {
        some:{
          id:params.channelId
        }
      }

      // channelIds:{
      //   has:params.channelId
      // }
    },
    include:{
      user:true,
      saveLater:true,
      Drafts:{
        where:{
          channelId:channel?.id
        }
      }
    }
  });

  if ( !member) {
    redirect(`/servers/${params.id}`);
  }

  const myChannels = await db.channel.findMany({
    where:{
      memberIds:{
        hasSome:[member.id]
      }
    }
  })
  
  
  const memberId = channel.memberIds.some((id)=>id===member.id);
  if(!memberId){
    if(channel.type==="private"){
      redirect(`/servers/${server.id}`);
    }else {
      await db.section.update({
        where:{
          id:channel.sectionId as string
        },
        data:{
          channels:{
            update:{
              where:{
                id:channel.id
              },
              data:{
                Members:{
                  connect:{
                    id:member.id
                  }
                }
              }
            }
          }
        }
      })
    }
  }

  const createdAt = format(new Date(channel.createdAt), DATE_FORMAT);
  const isAdmin = profile.id===channel.createdBy;
  let sendMsg = channel.sendMsg !==undefined && channel.sendMsg!==null ? channel.sendMsg : true;

  const managers = channel.manager;


  const mySavedPosts = member.saveLater;
  const PinnedPosts = channel.pinnedPost;

  const serverMember = server.Members.filter(mem=>mem.id!==member.id);
 
  const channelMemberExceptMe = channel.Members.filter(mem=>mem.id!==member.id)

  return (
    <>



 {/* <ChatComponents server={server}  >
    
    <ChannelHeader members={channel.Members} name={channel.name} type={channel.type} description={channel.description as string} createdBy={channel.createdUser?.name as string}
    createdAt={createdAt}
    isAdmin = {isAdmin}
    serverMembers = {server.Members}
    sendMsg = {sendMsg}
    messages = {channel.messages}
    managers={managers?.member}
    schemaType={"Channel"}
    pinnedPosts={PinnedPosts}
    

    />

    
    <ChatMessages 
    channel={channel}
    member={member}
    name={channel.name}
    chatId={channel.id}
    type='channel'
    apiUrl='/api/messages'
    socketUrl="/api/socket/messages"
    socketQuery={{channelId:channel.id, serverId:server?.id, sectionId:channel?.sectionId as string}}
    paramKey='channelId'
    paramValue={channel.id}
    PinnedPosts = {PinnedPosts}
    mySavedPost = {mySavedPosts}
    myChannels={myChannels}
    allServerMember={serverMember}
    />

    <EditorFooter 
    name={channel.name}
    type="channel"
    apiUrl="/api/socket/messages"
    query={{
      channelId: channel.id,
      serverId: server?.id,
      sectionId:channel.sectionId
    }}
    channelType={channel.type}
    channels={myChannels}
    groups={server.groups}
    channelMember={channelMemberExceptMe}
    drafts={member.Drafts}

    />

    </ChatComponents>  */}

    <ChannelContainer server={server} channel={channel} currentMember={member} isAdmin={isAdmin} myChannels={myChannels} />





    </>
  )
}

export default ChannelChat