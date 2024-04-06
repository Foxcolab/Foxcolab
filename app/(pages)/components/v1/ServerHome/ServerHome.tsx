import React from 'react'
import Server_Sidebar from '../../Sidebar/Server_Sidebar'
import ChannelSidebar from '../../Sidebar/ChannelSidebar'
import { Server } from '@prisma/client'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Header from '../../Header/Header'

interface Props {
  server:Server
  children:React.ReactNode
}

function ServerHome({children, server}:Props) {
  return (
    <>
    
    <div>

    <div className="server_v1_container">
    <Header server={server} />

      <div>


      <div className="">
        <Server_Sidebar/>
      </div>
      <ResizablePanelGroup direction="horizontal" className='resizeable_container'>
      <ResizablePanel  className='resize_side_panel'  defaultSize={22}>
      <div className="w-full">
        <ChannelSidebar server={server}/> 
      </div>
      </ResizablePanel>
  <ResizableHandle withHandle />

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