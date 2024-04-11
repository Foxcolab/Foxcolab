import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Overview from '../Items/Overview/Overview'
import Analytics from '../Items/Analytics/Analytics'
import ActivityLogs from '../Items/ActivityLog/ActivityLog'
import ManageMember from '../Items/ManageMember/ManageMember'
import Notification from '../Items/Notification/Notification'
import Privacy from '../Items/Privacy/Privacy'
import Themes from '../Items/Themes/Themes'
import Bot from '../Items/Bot/Bot'
import Language from '../Items/Language/Language'
import Role from '../Items/Role/Role'
import Navigation from '../Items/Navigation/Navigation'
import { ActivityLog, Member, Server } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FaGlobeAmericas, FaUsersCog } from 'react-icons/fa'
import { BiSolidCustomize } from 'react-icons/bi'
import { MdOutlineEdit, MdPrivacyTip } from 'react-icons/md'
import { IoIosAnalytics, IoMdNotifications } from 'react-icons/io'
import { HiOutlineHeart } from 'react-icons/hi2'
import { VscGlobe } from 'react-icons/vsc'
import { RiRobot2Fill, RiShieldUserFill } from 'react-icons/ri'
import { IoBasketball, IoNavigateCircleSharp } from 'react-icons/io5'


  interface Props {
    open:boolean
    setOpen:any
    state:string
    server:Server & {
      Members:Member[]
    } & {
      currentMember:Member
    } & {
      activityLogs:ActivityLog[]
    }
  }

function ServerContainer({open, setOpen, state, server}:Props) {

    const [selected, setSelected] = useState(state);

    const currentMember:Member = server.currentMember;

    let hasPermission = false;
    const whoCanUpdate = server.whoCanUpdateServer;
    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && whoCanUpdate==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && whoCanUpdate==="moderator") || (currentMember.role==="admin" && whoCanUpdate==="admin")  ){
      

        hasPermission = true;
    }

    let kickOutPermission = false;
    const whoCAnKick = server.whoCanKickMember;
    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && whoCAnKick==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && whoCAnKick==="moderator") || (currentMember.role==="admin" && whoCAnKick==="admin")  ){
      kickOutPermission = true;
    }

    let botPermission = false;
    const createBot = server.whoCreateBotResponse;
    if(((currentMember.role==="user" || currentMember.role==="moderator" || currentMember.role==="admin") && createBot==="user") || ((currentMember.role==="moderator" || currentMember.role==="admin") && createBot==="moderator") || (currentMember.role==="admin" && createBot==="admin")  ){
      kickOutPermission = true;
    }

    let isAdmin = false;
    if(server.createdBy ===currentMember.userId){
      isAdmin = true;
    }




    

    


  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="server_setting_con">
        
        <div className="server_dialog_con">
            <div className='flex h-full'>
                <div className="serd_sidebar w-1/4">
                    <div className='text-xs text-[#aeb1b8] dark:text-[#a6b0b5] font-bold pl-4'>SERVER SETTINGS</div>
                    <div className='serd_items'>
                        <button onClick={()=>setSelected("Overview")} className={selected==="Overview" ? "active_item" : ""}><IoBasketball/> Overview</button>
                        <button onClick={()=>setSelected("Server Analytics")} className={selected==="Server Analytics" ? "active_item" : ""}><IoIosAnalytics/> Server Analysics</button>
                        {
                          hasPermission && <button onClick={()=>setSelected("Activity Logs")} className={selected==="Activity Logs" ? "active_item" : ""}><MdOutlineEdit />
                          Activity Logs</button>
                        }
                        <button onClick={()=>setSelected("Notification")} className={selected==="Notification" ? "active_item" : ""}><IoMdNotifications/> Notification</button>
                        <button onClick={()=>setSelected("Privacy")} className={selected==="Privacy" ? "active_item" : ""}><MdPrivacyTip/> Privacy</button>
                        <button onClick={()=>setSelected("Themes")} className={selected==="Themes" ? "active_item" : ""}><BiSolidCustomize/> Themes</button>
                        <button onClick={()=>setSelected("Bots")} className={selected==="Bots" ? "active_item" : ""}><RiRobot2Fill/> Bots</button>
                        <button onClick={()=>setSelected("Navigation")} className={selected==="Navigation" ? "active_item" : ""}><IoNavigateCircleSharp/> Navigation </button>
                        <button onClick={()=>setSelected("Region")} className={selected==="Region" ? "active_item" : ""}><VscGlobe/> Language & Region</button>
                        {
                          isAdmin &&  <button onClick={()=>setSelected("Roles")} className={selected==="Roles" ? "active_item" : ""}><RiShieldUserFill/> Roles</button>
                        }
                       
                        <button onClick={()=>setSelected("Manage Member")} className={selected==="Manage Member" ? "active_item" : ""}><FaUsersCog/> Manage Member</button>
                    </div>
                </div>
                <div className='serv_body w-3/4'>
                    {
                        selected==="Overview" ?
                         <Overview setOpen={setOpen} server={server} hasPermission={hasPermission} isAdmin={isAdmin} /> :
                        selected==="Server Analytics" ? 
                        <Analytics setOpen={setOpen} server={server}  /> :
                        selected==="Activity Logs" ?
                        
                        isAdmin && <ActivityLogs setOpen={setOpen}  activityLogs={server.activityLogs} serverId={server.id} /> 
                        
                        :
                        selected==="Manage Member" ?
                        <ManageMember setOpen={setOpen} serverId={server.id} members={server.Members} ownerId={server.createdBy} hasPermission={kickOutPermission}  /> :
                        selected==="Notification" ? <Notification setOpen={setOpen} server={server}   /> :
                        selected==="Privacy" ? <Privacy discoverable={server.discoverable} setOpen={setOpen} serverType={server.type} serverId={server.id} hasPermission={hasPermission}  /> :
                        selected==="Themes" ? <Themes setOpen={setOpen} server={server} /> :
                        selected==="Bots" ? <Bot setOpen={setOpen} botResponse={server.botResponses} hasPermission={botPermission} /> :
                        selected==="Navigation" ? <Navigation serverId={server.id} setOpen={setOpen} currentMember={currentMember}  /> :
                        selected==="Region" ? <Language setOpen={setOpen} memberLanguage={currentMember.language as string} memberRegion={currentMember.region as string} serverId={server.id}  /> :
                        selected==="Roles" && isAdmin ? <Role setOpen={setOpen} server={server} isAdmin={true} />

                       
                        :
                        <Overview setOpen={setOpen} server={server} hasPermission={hasPermission} isAdmin={isAdmin} />
                    }
                </div>
            </div>
            

        </div>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </>
  )
}

export default ServerContainer