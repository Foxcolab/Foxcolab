
import React from 'react'
import {SingleChannel} from "./SingleChannel"
import { FaDharmachakra, FaNoteSticky} from "react-icons/fa6"
import ChannelFeature from "@/app/(pages)/components/Channel/ChannelFeature";
import {ScrollArea} from "@/components/ui/scroll-area"
import { redirect } from 'next/navigation';
import Inbox from "@/app/(pages)/components/Inbox/Inbox";
import SectionPlus from '../section/SectionPlus';
import Link from 'next/link';
import { MdForum } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { myProfile } from '@/lib/db/profile';
import { NameDropDown } from '../Header/NameDropDown';


const ChannelSidebar =async({server}) =>{
    
    const user = await myProfile();
    if(!user) redirect(`home`);
    // const server = await getMyserver
    const members = server.Members && server.Members.filter(member=>member.userId!==user.id);
    
  return (
    <>

        <div className='sidebgg'>
    <ScrollArea className='flex-1 w-full'>
             <div className="server_logo">
                <div className="">
                <NameDropDown server={server} />
                </div>
              
            </div>
            <ChannelFeature id={server.id} sections={server.sections} />
        
    <div className='channels'>
        {
           server.sections && server.sections.map((section)=>(
                <div key={section.id}>
                    <div className="section_title secbtnn">
                        
                        <div>
                        <FaDharmachakra/>{section.name}
                        </div>
                            <SectionPlus sectionId={section.id} serverId={server.id} />                       
                       </div>
                  
        <div className='sidecontent '>
                    {
                      section.channels &&  section.channels.map((channel)=>(
                            <SingleChannel channel={channel} key={channel.id} server={channel.server} />
                            
                        ))
                    }

                    {
                       section.canvas!==undefined &&  section.canvas.map((canvas)=>(
                            <Link href={`/servers/${server.id}/canvas/${canvas.id}`} key={canvas.id} className='ch_btnn'><span><FaNoteSticky/> {canvas.title} </span>{canvas.type==="public"?"":<IoIosLock/> } </Link>
                        )
                        
                        )
                    }

                    {
                        section.forumsChannel && section.forumsChannel.map((forums, index)=>(
                            <Link href={`/servers/${server.id}/forum/${forums.id}`} key={index} className='ch_btnn'><span><MdForum/> {forums.name} </span>{forums.type==="public"?"":<IoIosLock/> } </Link>
                        ))
                    }
{
                        section.TestChannels && section.TestChannels.map((test, index)=>(
                            <Link href={`/servers/${server.id}/test-channel/${test.id}`} key={index} className='ch_btnn'><span><RiSurveyFill/> {test.name}</span> {test.type==="public"?"":<IoIosLock/> } </Link>
                        ))
                    }
                    

                    </div>
           {/* <Separator className="my-4" /> */}
                    
                </div>
            ))
        }
        <Inbox
         members={members}
         serverId={server.id}
         inviteCode={server.inviteCode}
         name={server.name}
         />

        
        </div>
    
    </ScrollArea>
        
        </div>


    </>
  )
}

export default ChannelSidebar