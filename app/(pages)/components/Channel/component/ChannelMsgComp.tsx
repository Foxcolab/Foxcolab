"use client";
import React, { useEffect, useState } from 'react'
import {Server, Channel, Member, Message} from "@prisma/client"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
import ThreadComponents from '../../v1/Thread/ThreadComponents';
import ChannelChat from './ChannelChat';


  interface Props {
    server:Server,
    channel:Channel
    currentMember:Member
    isAdmin:boolean
    myChannels:Channel[]
  }
function ChannelMsgComp({server, channel, currentMember, isAdmin, myChannels}:Props) {
    const [threadMessage, setThreadMessage] = useState<null | Message>(null);
  
    const [open, setOpen] = useState(false);


  // useEffect(()=>{

  // })

    const leftDefault = (threadMessage===null || undefined )? 100 :70;
    const rightDefault = threadMessage===null ? 0 : 30;
 

  return (
    <>

    {
      !threadMessage ? <ChannelChat
      server={server} 
      channel={channel} 
      member={currentMember} 
      isAdmin={isAdmin} 
      myChannels={myChannels} 
      setThreadMessage={setThreadMessage}
      /> :
      <>
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>

                <ChannelChat
                server={server} 
                channel={channel} 
                member={currentMember} 
                isAdmin={isAdmin} 
                myChannels={myChannels} 
                setThreadMessage={setThreadMessage}
                
                />


            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
                {
                
                threadMessage && <ThreadComponents currentMember={currentMember} message={threadMessage} setThreadMessage={setThreadMessage} myChannels={myChannels} server={server} channel={channel} />
                }
            


            </ResizablePanel>
        </ResizablePanelGroup>
      
       </>
      
    }


      
    
    </>
  )
}

export default ChannelMsgComp