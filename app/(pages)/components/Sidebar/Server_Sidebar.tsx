import { getMyserver, myProfile } from '@/lib/db/profile'
import React from 'react'
import { SidebarActions } from './SidebarAction';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Sidebar_item, { EtcItem } from './Sidebar_item';
import { redirect, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import { ActionTooltip } from '../tooolkit/Toolkit';
import { BiSolidUserCircle } from 'react-icons/bi';
import { IoMdExit } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import ServerPorfLog from './serverSidebar/ServerPorfLog';

const imageUrl = "https://play-lh.googleusercontent.com/Rp_Sqi5hvV6unhH1ghqEiPBZc3BBRBH_lXKBKESRb5QzW3hZrd3vWWQx0JgHiB7ToPI"

interface Props {
  home:boolean
  user:User
}


const  Server_Sidebar =async ({home, user}:Props)=>{
    
    // const profile = await myProfile();
    const servers = await getMyserver();
    if(!servers){
      redirect('/home');
    }

 

    
  return (
    <>
    
    
    <div className={cn('server_sidebar', home ? "top-0" : "top-[2.95rem]")}  >
    <SidebarActions user={user} />

    {/* <hr className='hr' /> */}
    <Separator className="" />

 
    <div className='flex-1 w-full scroll-m-0 servers_scrollbar '>
        {
            servers.map((server)=>(
                <div key={server.id} className='sing_server'>
                    <Sidebar_item id={server.id} name={server.name} imageUrl={!server.displayPicture ? imageUrl : server.displayPicture.publicUrl} />
                </div>
            )) 
        }
            <div  style={{marginTop:'0.5rem', marginBottom:"-0.3rem"}}>
          {/* <Separator className="my-10" /> */}
          </div>

          {
            servers.length > 0 && <div className='' style={{marginTop:'0.5rem'}}>
            <Separator className="my-4" />
            </div>
          }

        <EtcItem/>
    </div>

    <ServerPorfLog user={user} home={home} />


    </div>
    
    
    
    </>
  )
}

export default Server_Sidebar