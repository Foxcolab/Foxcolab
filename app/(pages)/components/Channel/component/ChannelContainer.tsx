
import { Channel, Member, Message, Server } from '@prisma/client'
import React from 'react'
import ServerHome from '../../v1/ServerHome/ServerHome'
import ThreadComponents from '../../v1/Thread/ThreadComponents'
import ChannelChat from './ChannelChat'
import ChannelHeader from '../ChannelHeader'
import { format } from 'date-fns'
import ChannelMsgComp from "./ChannelMsgComp";
interface Props {
    server:Server
    channel:Channel
    currentMember:Member
    isAdmin:boolean
    myChannels:Channel[]
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

function ChannelContainer({server, channel, isAdmin, currentMember, myChannels}:Props) {
    
  
    
  return (
    <>
        <ServerHome server={server}>
            <ChannelMsgComp
            
            server={server}
            channel={channel}
            isAdmin={isAdmin}
            currentMember={currentMember}
            myChannels={myChannels}
            
            />
        
        </ServerHome>
        
    
    </>
  )
}

export default ChannelContainer