"use client";
import React, { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Channel, DirectMessage, Draft, Later, Member, PinnedPost, User } from '@prisma/client';
import ConversationChat from './ConversationChat';

interface Props {
  name:string
  conversationId:string
  Drafts:Draft[]
  currentMember:Member & {
    user:User
} & {
    saveLater:Later[]
} & {
    pinnedPost:PinnedPost[]
}
otherMember:Member & {
    user:User
}
myChannels:Channel[]
allServerMember:Member[]
}

function ConversationContainer({name, conversationId, Drafts,currentMember, otherMember, myChannels, allServerMember }:Props) {
  const [threadMessage, setThreadMessage] = useState<null| DirectMessage>();
  return (
    <>
    
    {
      !threadMessage ? <ConversationChat
      name={name} 
      conversationId={conversationId}
      Drafts={Drafts}
      currentMember={currentMember}
      otherMember={otherMember}
      setThreadMessage={setThreadMessage}
      myChannels={myChannels}
      allServerMember={allServerMember}
      /> :
      <>
      <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>

                <ConversationChat
                name={name} 
                conversationId={conversationId}
                Drafts={Drafts}
                currentMember={currentMember}
                otherMember={otherMember}
                setThreadMessage={setThreadMessage}
                myChannels={myChannels}
                allServerMember={allServerMember}
                
                />


            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
                {/* {
                
                threadMessage && <ThreadComponents currentMember={currentMember} message={threadMessage} setThreadMessage={setThreadMessage} myChannels={myChannels} server={server} channel={channel} />
                } */}
            


            </ResizablePanel>
        </ResizablePanelGroup>

      </>
    }
    
    
    </>
  )
}

export default ConversationContainer