
import React from 'react'

import ChatComponents from '@/app/(pages)/components/Chat/ChatComponents';
import { redirect } from 'next/navigation';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';

import ChatMessages from '@/app/(pages)/components/Chat/ChatMessages';
import EditorFooter from '@/app/(pages)/components/Editor/EditorFooter';
import { getOrCreateConversation } from '@/lib/conversation';
import { getServer } from '@/lib/db/ServerLib';
import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import ConversationContainer from '@/app/(pages)/components/conversation/ConversationContainer';
import { Draft } from '@prisma/client';

interface ChatProps {
  params:{
    id: string,
    memberId: string
  }
}

async function ChatWithUser({params}:ChatProps) {
    
    const profile = await myProfile();
    if(!profile) redirect('/home');
    
    const server = await getServer(params.id, profile.id);
    if(!server) redirect('/home');
    
    const currentMember = await db.member.findFirst({
      where:{userId:profile.id},
      include:{
        user:true
      }
    })
    
    if(!currentMember){
      redirect('/home');
    }
    // const user = await db.member.findUnique({
    //   where:{
    //     id:params.userId,
    //     serverId:server.id
    //   },
    //   include:{
    //     user:true
    //   }
    // });
    // if(!user){
    //   redirect('/home');
    // }
    
    const conversation = await getOrCreateConversation(currentMember.id, params?.memberId as string);
  
    
    if (!conversation) {
      return redirect(`/servers/${params.id}`);
    }
  
    const { memberOne, memberTwo } = conversation;
  
    const otherMember = memberOne.userId === profile.id ? memberTwo : memberOne;
  
    if(currentMember.id === otherMember.id){
      redirect(`/server/${server.id}`);
    }
    
    const drafts:Draft[] = []

  return (
    <>

   <ServerHome server={server} user={profile}>
      <ConversationContainer  
      name={otherMember.user?.name as string}   
      conversationId={conversation.id} 
      Drafts={drafts} 
      currentMember={currentMember}
      otherMember={otherMember}
      />
   </ServerHome>




    {/* <ChatComponents server={server} >




    <ChatMessages
            member={currentMember}
            name={otherMember.user?.name as string}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
            PinnedPosts={[]}
            mySavedPost={[]}
            myChannels={[]}
            allServerMember={[]}
            channel={null}
            setThreadMessage={null}

          /> */}

    {/* <EditorFooter 
   name={otherMember.user?.name as string}
   type="conversation"
   apiUrl="/api/socket/direct-messages"
   query={{
     conversationId: conversation.id,
   }}
   groups={[]}
   channelType={null}
   channelMember={[]}
   channels={[]}
   drafts={[]}
   uploadMedia
   sendMessage

    /> */}

    

    {/* </ChatComponents> */}

    
    </>
  )
}

export default ChatWithUser