"use client";
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { FaHome } from "react-icons/fa";
  import { CiCircleMore } from "react-icons/ci";
  import { MdOutlineDataSaverOn } from "react-icons/md";
  import { MdForum } from "react-icons/md";
  import { MdGroups2 } from "react-icons/md";
  import { BsFillSendFill } from "react-icons/bs";
  import CreateSection from "@/app/(pages)/components/Create/CreateSection"
  import CreateChannel from "@/app/(pages)/components/Create/CreateChannel"
  import CreateForums from '../Create/CreateForums';
  import SingleSection from '../Sidebar/SingleSection';
import { FaHandsHelping } from "react-icons/fa";
import {MdNoteAlt} from "react-icons/md"
import {PiExamFill} from "react-icons/pi";
import {SiFiles, SiKubernetes} from "react-icons/si"
import {GoMention} from "react-icons/go";
import {AiFillPushpin} from "react-icons/ai";
import {FaSquareThreads} from "react-icons/fa6"
import { Separator } from '@/components/ui/separator';
import CreateCanvas from '../Create/CreateCanvas';
import CreateTest from '../Create/CreateTest';

function ChannelFeature({id, sections}) {
    const SideContent = [
        {
            title:"Threads",
            url:`/servers/${id}/threads`,
            icon:<FaSquareThreads/>
        }, 
        {
            title:"Pinned Messages",
            url:`/servers/${id}/pinned-message`,
            icon:<AiFillPushpin /> 
        },
        {
            title:"Mentions & Reactions",
            url:`/servers/${id}/mention-reaction`,
            icon:<GoMention /> 
        },
        {
            title:"Groups",
            url:`/servers/${id}/groups`,
            icon:<MdGroups2/>
        },
        {
            title:"Save for Later",
            url:`/servers/${id}/save-for-later`,
            icon:<MdOutlineDataSaverOn/>
        },
        {
            title:"Drafts & Sent",
            url:`/servers/${id}/drafts-&-sents`,
            icon:<BsFillSendFill/>
        },
        {
            title:"Files",
            url:`/servers/${id}/files`,
            icon:<SiFiles/>
        },

    ]
    // const SideContent2 = [
        
        
        
    //     {
    //         title:"Q & A",
    //         url:`/servers/${id}/question-answer`,
    //         icon:<FaHandsHelping />
    //     },
    //     {
    //         title:"Inboxes",
    //         url:`/servers/${id}/inboxes`,
    //         icon:<FaHandsHelping />
    //     }
    // ]
    const home = {
        title:"Home",
        url:`/servers/${id}`,
        icon:<FaHome/>
    }
  return (
    <>
    
    {/* <div className="sidecontent home">
        <SingleSection content={home} />
                
            </div> */}
          
           <Separator className="sidebar_separator" />
        <div className='sidecontent'>
        {
            SideContent.map((content, index)=>(
                <SingleSection content={content} key={index} />
            ))
        }
        {/* <DropdownMenu open={true}>
  <DropdownMenuTrigger> <CiCircleMore/> More ... </DropdownMenuTrigger>
  <DropdownMenuContent className="more_drop">
    {
        SideContent2.map((content, index)=>(
            <DropdownMenuItem key={index}> <SingleSection content={content} key={index} /> </DropdownMenuItem>
        ))
    }
  </DropdownMenuContent>
</DropdownMenu>   */}
        
        
        
<Separator className='sidebar_separator'  />

            <div className="sidecontent">
                <CreateSection serverId={id}  />
                {/* <CreateChannel serverId={id} sections={sections} />
                <CreateForums serverId={id} sections={sections} />
                <CreateCanvas serverId={id} sections={sections} />
                <CreateTest serverId={id} sections={sections} /> */}
            </div>


           <Separator className='sidebar_separator' />

        </div>
    
    </>
  )
}

export default ChannelFeature