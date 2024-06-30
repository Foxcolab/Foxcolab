
import React from 'react'
import {SingleChannel} from "./Components/SingleChannel"
import { FaDharmachakra, FaNoteSticky} from "react-icons/fa6"
import ChannelFeature from "@/app/(pages)/components/Channel/ChannelFeature";
import {ScrollArea} from "@/components/ui/scroll-area"
import { redirect } from 'next/navigation';
import Inbox from "@/app/(pages)/components/Inbox/Inbox";
import SectionPlus from '../section/SectionPlus';
import Link from 'next/link';
import { MdForum } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosLock } from "react-icons/io";
import { myProfile } from '@/lib/db/profile';
import { NameDropDown } from '../Header/NameDropDown';
import { Canvas, Channel, Forums, ForumsChannel, Member, Section, Server, Spreadsheets, TestChannel, ShortUrl } from '@prisma/client';
import { VscTable } from 'react-icons/vsc';
import { PiExamFill } from 'react-icons/pi';
import { BiSolidLeftArrow, BiSolidSpreadsheet } from 'react-icons/bi';
import SingleForums from './Components/SingleForums';
import SingleTestChannel from './Components/SingleTestChannel';
import SingleSpreadsheet from './Components/SingleSpreadsheet';
import SingleCanvas from './Components/SingleCanvas';
import Image from 'next/image';


interface Props {
    server:Server & {
        shortInvite:ShortUrl
    } & {
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
    const members = server.Members && server.Members.filter(member=>member.userId!==currentMember?.userId);



    let createChannel = false;
    let createForum = false;
    let createCanvas = false;
    let createTestChannel = false;
    let createSection = false;
    let createSpreadsheet = false;

    if(((currentMember?.role==="user" || currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateChannel==="user") || ((currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateChannel==="moderator") || (currentMember?.role==="admin" && server.whoCreateChannel==="admin")  ){
        createChannel = true;
    }
    if(((currentMember?.role==="user" || currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateForum==="user") || ((currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateForum==="moderator") || (currentMember?.role==="admin" && server.whoCreateForum==="admin")  ){
        createForum = true;
    }
    if(((currentMember?.role==="user" || currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateCanvas==="user") || ((currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateCanvas==="moderator") || (currentMember?.role==="admin" && server.whoCreateCanvas==="admin")  ){
        createCanvas = true;
    }
    if(((currentMember?.role==="user" || currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateForum==="user") || ((currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateForum==="moderator") || (currentMember?.role==="admin" && server.whoCreateForum==="admin")  ){
        createTestChannel = true;
    }
    if(((currentMember?.role==="user" || currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateSection==="user") || ((currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateSection==="moderator") || (currentMember?.role==="admin" && server.whoCreateSection==="admin")  ){
        createSection = true;
    }
    if(((currentMember?.role==="user" || currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateSpreadsheet==="user") || ((currentMember?.role==="moderator" || currentMember?.role==="admin") && server.whoCreateSpreadsheet==="moderator") || (currentMember?.role==="admin" && server.whoCreateSpreadsheet==="admin")  ){
        createSpreadsheet = true;
    }


  



    
  return (
    <>
    <div className='channel_border_rad'> 
        <div className='sidebgg'>
    {/* <ScrollArea className='flex-1 w-full h-full min-h-0 sideb_bg_scroll' > */}
    <div className='flex-1 w-full h-full min-h-0 '>
             <div className="server_logo">
                <div className="server_title">
                <NameDropDown server={server} createSection={createSection} />
                
                
                </div>
                <div className="server_nm_cv">
                <Image src={"https://foxcolab.s3.ap-south-1.amazonaws.com/Uploaded+Assests/pexels-codioful-7130560+(1).jpg"} height={100} width={100} alt="" unoptimized />
                 </div>
              
            </div>
            <div className="sideb_bg_scroll all_side_conents">
            <ChannelFeature id={server.id} sections={server.sections} member={currentMember} whoCreateSection={server.whoCreateSection} />
        
    <div className='channels'>
        {
           server.sections && server.sections.map((section:Section)=>(
                <div key={section.id}>
                    <div className="section_title">
                        
                        <div className='flex items-center gap-1'>
                        <span className='text-sm'><BiSolidLeftArrow/></span>{section.name}
                        </div>
                            {
                                createChannel===false && createCanvas===false && createForum===false && createTestChannel===false ? 
                                "" : 
                                <SectionPlus sectionId={section.id} serverId={server.id} createChannel={createChannel} createCanvas={createCanvas} createForum={createForum} createTestChannel={createTestChannel} createSpreadsheet={createSpreadsheet}  sectionName={section.name} />  
                            }
                                                 
                       </div>
                  
        <div className='sidecontent mb-[0.3rem]'>
                    {
                      section.channels &&  section.channels.map((channel:Channel)=>(
                            <SingleChannel channel={channel} key={channel.id} server={channel.server} />
                            
                        ))
                    }

                    {
                       section.canvas  &&  section.canvas.map((canvas:Canvas)=>(
                        <SingleCanvas canvas={canvas} key={canvas.id} />        
                    )
                        
                        )
                    }

                    {
                        section.forumsChannel && section.forumsChannel.map((forums:ForumsChannel, index:number)=>(
                            <SingleForums forum={forums} key={index} />
                            ))
                    }
                    {
                        section.TestChannels && section.TestChannels.map((test:TestChannel, index:number)=>(
                           <SingleTestChannel testChannel={test} key={index} />
                        ))
                    }
                    {
                        section.spreadsheets && section.spreadsheets.map((spreadsheet:Spreadsheets, index:number)=>(
                            <SingleSpreadsheet spreadsheet={spreadsheet} key={index} />
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
         inviteCode={server?.shortInvite?.shortUrl}
         name={server.name}
         userName={server.currentMember?.user?.name}
         />

        
        </div>
    
        </div>
            </div>

        </div>
        </div>

    </>
  )
}

export default ChannelSidebar