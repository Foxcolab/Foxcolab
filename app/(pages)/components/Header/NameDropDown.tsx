"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { IoIosAnalytics, IoIosArrowDown, IoIosExit, IoMdPersonAdd } from "react-icons/io";
import { IoAddCircleOutline, IoPersonAddSharp, IoSettings } from "react-icons/io5";
import { MdAddCircle, MdDetails, MdManageAccounts, MdVerified } from "react-icons/md";
import ServerContainer from "../ServerSetting/Container/ServerContainer";
import { staticGenerationBailout } from "next/dist/client/components/static-generation-bailout";
import CreateSection from "../Create/CreateSection";
import { useParams } from "next/navigation";
import { Server } from "@prisma/client";
import Invite from "../inviteCode/Invite";
import Image from "next/image";

interface Props {
  server:Server
  createSection:boolean
}
export function NameDropDown({server, createSection}:Props) {
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [invite, setInvite] = useState(false);
  const params = useParams();
  

  const onClickHandler =(value:string)=>{
    setState(value);
    setOpen(true);
  }

 

  const LeaveHandler=()=>{

  }


  return (
    <>
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      
        <button  className=" srvr_nm"> <div className="flex items-center gap-1"><span className="text-green-600 text-[1.4rem]"><MdVerified/></span><span>{server.name}</span> </div> 
        
        <span className="text-sm"><IoIosArrowDown/></span>
        <div>
        
        </div>
        
        </button>
        
        
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" ml-4 server_drpdwn">
        <DropdownMenuGroup>
            <DropdownMenuItem onClick={()=>onClickHandler("Overview")} className="serv_dpdn_item"><span>Overview</span>  <span className="serv_dp_icon"><MdDetails/> </span></DropdownMenuItem>
            <DropdownMenuItem onClick={()=>onClickHandler("Server Analytics")} className="serv_dpdn_item"><span>Server Analytics</span> <span className="serv_dp_icon"><IoIosAnalytics/></span></DropdownMenuItem>
            <Separator className="bg-[#535d62]" />
            <DropdownMenuItem onClick={()=>onClickHandler("Customize Server")} className="serv_dpdn_item"><span>Customize Server</span><span className="serv_dp_icon"><IoSettings/></span></DropdownMenuItem>
            <DropdownMenuItem onClick={()=>onClickHandler("Manage Member")} className="serv_dpdn_item"><span>Manage Member</span><span className="serv_dp_icon"><MdManageAccounts/></span></DropdownMenuItem>
            
            {
              createSection && <>
             <Separator className="bg-[#535d62]" />
            <DropdownMenuItem onClick={()=>setOpenSection(true)} className="serv_dpdn_item"><span>Create Section</span> <span className="serv_dp_icon"><MdAddCircle/></span></DropdownMenuItem>  
              </>
            }
           <Separator className="bg-[#535d62]" />
            <DropdownMenuItem onClick={()=>setInvite(true)} className="serv_dpdn_item"><span>Invite</span> <span className="serv_dp_icon"><IoMdPersonAdd/></span></DropdownMenuItem>
            <Separator className="bg-[#535d62]" />
            <DropdownMenuItem onClick={()=>LeaveHandler()} className="serv_dpdn_item text-red-500 leave_item"><span>Leave Server</span><span className="serv_dp_icon"><IoIosExit/></span></DropdownMenuItem>

            </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>

    <ServerContainer open={open} setOpen={setOpen} state={state} server={server} />
    {
      openSection && 
    <CreateSection serverId={params?.id as string} openDialog={openSection} setOpenDialog={setOpenSection} hasPermission={createSection} />

    }

    {
      invite && <Invite open={invite} setOpen={setInvite} serverName={server.name} inviteCode={server?.shortInvite?.shortUrl as string} userName={server.currentMember?.user?.name as string} />
    }
    
    </>
  )
}