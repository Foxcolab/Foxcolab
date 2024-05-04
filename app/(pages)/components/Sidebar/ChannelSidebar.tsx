
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
import { Member, Server, Spreadsheets } from '@prisma/client';
import { VscTable } from 'react-icons/vsc';


interface Props {
    server:Server & {
        currentMember:Member
    } & {
        Members:Member[]
    }
    
}

const ChannelSidebar =async({server}:Props) =>{
    
    // const user = await myProfile();
    // if(!user) redirect(`home`);
    // const server = await getMyserver
    const currentMember = server.currentMember;
    const members = server.Members && server.Members.filter(member=>member.userId!==currentMember.userId);



    let createChannel = false;
    let createForum = false;
    let createCanvas = false;
    let createTestChannel = false;
    let createSection = false;
    let createSpreadsheet = false;

    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateChannel==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateChannel==="moderator") || (currentMember.role==="admin" && server.whoCreateChannel==="admin")  ){
        createChannel = true;
    }
    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateForum==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateForum==="moderator") || (currentMember.role==="admin" && server.whoCreateForum==="admin")  ){
        createForum = true;
    }
    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateCanvas==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateCanvas==="moderator") || (currentMember.role==="admin" && server.whoCreateCanvas==="admin")  ){
        createCanvas = true;
    }
    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateForum==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateForum==="moderator") || (currentMember.role==="admin" && server.whoCreateForum==="admin")  ){
        createTestChannel = true;
    }
    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateSection==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateSection==="moderator") || (currentMember.role==="admin" && server.whoCreateSection==="admin")  ){
        createSection = true;
    }
    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateSpreadsheet==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && server.whoCreateSpreadsheet==="moderator") || (currentMember.role==="admin" && server.whoCreateSpreadsheet==="admin")  ){
        createSpreadsheet = true;
    }


  



    
  return (
    <>

        <div className='sidebgg'>
    <ScrollArea className='flex-1 w-full'>
             <div className="server_logo">
                <div className="">
                <NameDropDown server={server} createSection={createSection} />
                </div>
              
            </div>
            <ChannelFeature id={server.id} sections={server.sections} member={currentMember} whoCreateSection={server.whoCreateSection} />
        
    <div className='channels'>
        {
           server.sections && server.sections.map((section)=>(
                <div key={section.id}>
                    <div className="section_title secbtnn">
                        
                        <div>
                        <FaDharmachakra/>{section.name}
                        </div>
                            {
                                createChannel===false && createCanvas===false && createForum===false && createTestChannel===false ? 
                                "" : 
                                <SectionPlus sectionId={section.id} serverId={server.id} createChannel={createChannel} createCanvas={createCanvas} createForum={createForum} createTestChannel={createTestChannel} createSpreadsheet={createSpreadsheet}  />  
                            }
                                                 
                       </div>
                  
        <div className='sidecontent '>
                    {
                      section.channels &&  section.channels.map((channel)=>(
                            <SingleChannel channel={channel} key={channel.id} server={channel.server} />
                            
                        ))
                    }

                    {
                       section.canvas!==undefined &&  section.canvas.map((canvas)=>(
                            <Link href={`/servers/${server.id}/canvas/${canvas.id}`} key={canvas.id} className='ch_btnn'><span className=''><span className='text-lg'><FaNoteSticky/> </span>{canvas.title} </span>{canvas.type==="public"?"":<IoIosLock/> } </Link>
                        )
                        
                        )
                    }

                    {
                        section.forumsChannel && section.forumsChannel.map((forums, index)=>(
                            <Link href={`/servers/${server.id}/forum/${forums.id}`} key={index} className='ch_btnn'><span className=''> <span className="text-lg"><MdForum/> </span> {forums.name} </span>{forums.type==="public"?"":<IoIosLock/> } </Link>
                        ))
                    }
                    {
                        section.TestChannels && section.TestChannels.map((test, index)=>(
                            <Link href={`/servers/${server.id}/test-channel/${test.id}`} key={index} className='ch_btnn'><span className=''> <span className='text-lg'><RiSurveyFill/></span> {test.name}</span> {test.type==="public"?"":<IoIosLock/> } </Link>
                        ))
                    }
                    {
                        section.spreadsheets && section.spreadsheets.map((spreadsheet:Spreadsheets, index:number)=>(
                            <Link href={`/servers/${server.id}/spreadsheet/${spreadsheet.id}`} key={index} className='ch_btnn'><span className=''> <span className='text-lg'><VscTable/></span> {spreadsheet.name}</span> {spreadsheet.type==="public"?"":<IoIosLock/> } </Link>
                        ))
                    }
                    {/* <VscTable/> */}

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
         userName={server.currentMember.user?.name}
         />

        
        </div>
    
    </ScrollArea>
        
        </div>


    </>
  )
}

export default ChannelSidebar