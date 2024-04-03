
import React from 'react'

import ChatComponents from '@/app/(pages)/components/Chat/ChatComponents';
import { redirect } from 'next/navigation';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';

import ChatMessages from '@/app/(pages)/components/Chat/ChatMessages';
import EditorFooter from '@/app/(pages)/components/Editor/EditorFooter';
import { getOrCreateConversation } from '@/lib/conversation';
import { getServer } from '@/lib/db/ServerLib';

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
    

  return (
    <>
    <ChatComponents server={server} >



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
            
          />

    <EditorFooter 
   name={otherMember.user?.name as string}
   type="conversation"
   apiUrl="/api/socket/direct-messages"
   query={{
     conversationId: conversation.id,
   }}
    />

    

    </ChatComponents>

    
    </>
  )
}

export default ChatWithUser