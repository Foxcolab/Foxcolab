import Loader from '@/app/(pages)/components/Loaders/Loader';
import { Canvas, Channel, ForumsChannel, Server, TestChannel } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
  server:Server
}
function DefaultOpen({server}:Props) {
  // console.log(server);
  const channels:Channel[] = server.channels;
  const TestChannels:TestChannel[] = server.TestChannels;
  const forumsChannels:ForumsChannel[] = server.forumsChannel;
  const canvases:Canvas[] = server.canvases;

  const [defaultOp, setDefault] = useState(server.defaultOpen);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const NameHandler =async()=>{
    try {
      setLoading(true);
      // console.log("NAME:", name, serverId);
      const res = await axios.put(`/api/server/update/defaultOpen?serverId=${server.id}`, {defaultOpen:defaultOp});
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  return (
    <>
    
    <div className="setting_section">      
        <div className="setting_section_title">Default Open</div>
        <div className="setting_section_content">   
            <div className="server_set_inp">
              <select name="" id="" onChange={(e)=>setDefault(e.target.value)}>
                <option value="">Select--</option>
                {
                  channels && channels.map((channel)=>(
                    <option value={`/channels/${channel.id}`} key={channel.id} selected={defaultOp===`/channels/${channel.id}`} >Channel - {channel.name} </option>
                  ))
                }
                {
                  TestChannels && TestChannels.map((testChannel)=>(
                    <option value={`/test-channel/${testChannel.id}`} key={testChannel.id} selected={defaultOp===`/test-channel/${testChannel.id}`}>Test Channel - {testChannel.name} </option>
                  ))
                }
                {
                  canvases && canvases.map((canvas)=>(
                    <option value={`/canvas/${canvas.id}`} key={canvas.id} selected={defaultOp===`/canvas/${canvas.id}`}>Canvas - {canvas.title} </option>
                  ))
                }
                {
                  forumsChannels && forumsChannels.map((forum)=>(
                    <option value={`/forum/${forum.id}`} key={forum.id} selected={defaultOp===`/forum/${forum.id}`}>Forum Channel - {forum.name} </option>
                  ))
                }
                
              </select>

              {
                defaultOp===server.defaultOpen ? "" : <> {loading ? <Loader/> :  <button onClick={NameHandler}>Save</button>} </>
              }
              
            </div>

        </div>
    </div>
    </>
  )
}

export default DefaultOpen