import { getMyserver, myProfile } from '@/lib/db/profile'
import React from 'react'
import { SidebarActions } from './SidebarAction';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Sidebar_item, { EtcItem } from './Sidebar_item';
import { redirect } from 'next/navigation';

const imageUrl = "https://play-lh.googleusercontent.com/Rp_Sqi5hvV6unhH1ghqEiPBZc3BBRBH_lXKBKESRb5QzW3hZrd3vWWQx0JgHiB7ToPI"
const  Server_Sidebar =async ()=>{
    
    // const profile = await myProfile();
    const servers = await getMyserver();
    if(!servers){
      redirect('/home');
    }
 


   

    
  return (
    <>
    
    
    <div className='server_sidebar'>
    <SidebarActions servers={servers} />

    <hr className='hr' />
 
    <ScrollArea className='flex-1 w-full'>
        {
            servers.map((server)=>(
                <div key={server.id} className='sing_server'>
                    <Sidebar_item id={server.id} name={server.name} imageUrl={server.displayPic===null ? imageUrl : server.displayPic} />
                </div>
            )) 
        }
            <div  style={{marginTop:'0.5rem', marginBottom:"-0.3rem"}}>
          {/* <Separator className="my-10" /> */}
          </div>

          <div className='' style={{marginTop:'0.5rem'}}>
          <Separator className="my-10" />
          </div>

        <EtcItem/>
    </ScrollArea>


    </div>
    
    
    
    </>
  )
}

export default Server_Sidebar