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
import Cutomize from '../Items/Cutomize/Cutomize'
import ManageMember from '../Items/ManageMember/ManageMember'
import Notification from '../Items/Notification/Notification'
import Privacy from '../Items/Privacy/Privacy'
import Themes from '../Items/Themes/Themes'
import Bot from '../Items/Bot/Bot'
import Language from '../Items/Language/Language'
import Role from '../Items/Role/Role'
import Navigation from '../Items/Navigation/Navigation'
import { Server } from '@prisma/client'


  interface Props {
    open:boolean
    setOpen:any
    state:string
    server:Server
  }

function ServerContainer({open, setOpen, state, server}:Props) {

    const [selected, setSelected] = useState(state);


  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="server_setting_con">
        
        <div className="server_dialog_con">
            <div className='flex h-full'>
                <div className="serd_sidebar w-1/3">
                    <div className='text-xs text-[#aeb1b8] font-bold'>SERVER SETTINGS</div>
                    <div className='serd_items'>
                        <button onClick={()=>setSelected("Overview")} className={selected==="Overview" ? "active_item" : ""}>Overview</button>
                        <button onClick={()=>setSelected("Server Analytics")} className={selected==="Server Analytics" ? "active_item" : ""}>Server Analysics</button>
                        <button onClick={()=>setSelected("Customize Server")} className={selected==="Customize Server" ? "active_item" : ""}>Customize Server</button>
                        <button onClick={()=>setSelected("Notification")} className={selected==="Notification" ? "active_item" : ""}>Notification</button>
                        <button onClick={()=>setSelected("Privacy")} className={selected==="Privacy" ? "active_item" : ""}>Privacy</button>
                        <button onClick={()=>setSelected("Themes")} className={selected==="Themes" ? "active_item" : ""}>Themes</button>
                        <button onClick={()=>setSelected("Bots")} className={selected==="Bots" ? "active_item" : ""}>Bots</button>
                        <button onClick={()=>setSelected("Navigation")} className={selected==="Navigation" ? "active_item" : ""}>Navigation </button>
                        <button onClick={()=>setSelected("Region")} className={selected==="Region" ? "active_item" : ""}>Language & Region</button>
                        <button onClick={()=>setSelected("Roles")} className={selected==="Roles" ? "active_item" : ""}>Roles</button>
                        <button onClick={()=>setSelected("Manage Member")} className={selected==="Manage Member" ? "active_item" : ""}>Manage Member</button>
                    </div>
                </div>
                <div className='serv_body w-2/3'>
                    {
                        selected==="Overview" ?
                         <Overview setOpen={setOpen} server={server} /> :
                        selected==="Server Analytics" ? 
                        <Analytics setOpen={setOpen} server={server} /> :
                        selected==="Customize Server" ?
                        <Cutomize setOpen={setOpen} server={server} /> :
                        selected==="Manage Member" ?
                        <ManageMember setOpen={setOpen} server={server} /> :
                        selected==="Notification" ? <Notification setOpen={setOpen} server={server} /> :
                        selected==="Privacy" ? <Privacy setOpen={setOpen} server={server} /> :
                        selected==="Themes" ? <Themes setOpen={setOpen} server={server} /> :
                        selected==="Bots" ? <Bot setOpen={setOpen} server={server} /> :
                        selected==="Navigation" ? <Navigation setOpen={setOpen} server={server} /> :
                        selected==="Region" ? <Language setOpen={setOpen} server={server} /> :
                        selected==="Roles" ? <Role setOpen={setOpen} server={server} />

                       
                        : ''
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