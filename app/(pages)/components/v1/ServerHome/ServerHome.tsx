import React from 'react'
import Server_Sidebar from '../../Sidebar/Server_Sidebar'
import ChannelSidebar from '../../Sidebar/ChannelSidebar'
import { Server, User } from '@prisma/client'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Header from '../../Header/Header'

interface Props {
  server:Server
  children:React.ReactNode
  user:User
}

function ServerHome({children, server, user}:Props) {
  return (
    <>
    
    <div>

    <div className="server_v1_container">
    <Header server={server} />

      <div>


      <div className="">
        <Server_Sidebar user={user} home={false} />
      </div>
      <ResizablePanelGroup direction="horizontal" className='resizeable_container'>
      <ResizablePanel  className='resize_side_panel'  defaultSize={22} minSize={20} maxSize={60} >
      <div className="w-full channel_sidebar_container">
        <ChannelSidebar server={server}/> 
      </div>
      </ResizablePanel>
  <ResizableHandle className='hover:bg-cyan-400 bg-none' />

  <ResizablePanel>



    <div className='children_container'>
    {children}
    </div>


   
    </ResizablePanel>
</ResizablePanelGroup>
</div>
      </div>
 


  


   
  

    </div>
    
    </>
  )
}

export default ServerHome