import React, { useState } from 'react'
import ItemHeader from '../../Components/ItemHeader'
import { Server } from '@prisma/client'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from '../../../Loaders/Loader'
import { ReloadIcon } from '@radix-ui/react-icons'
import ServerAvatar from './components/ServerAvatar'
import ServerCover from './components/ServerCover'
import ServerName from './components/ServerName'
import ServerDescription from './components/ServerDescription'
import ServerType from './components/ServerType'
import DefaultOpen from './components/DefaultOpen'
import NotificationSetting from './components/NotificationSetting'
import TransferOwnerShip from './components/TransferOwnerShip'
import { RiInboxArchiveFill } from 'react-icons/ri'

interface Props {
    setOpen:any
    server:Server
}
function Overview({setOpen, server}:Props) {
    

  return (
    <>
    
    <ItemHeader title='Server Overview' setOpen={setOpen} />

    <div>
       
        <ServerAvatar serverId={server.id} displayPic={server?.displayPic as string} coverPic={server.coverPic as string} />

        <ServerCover serverId={server.id} coverPic={server?.coverPic} />

        <ServerName serverName={server.name} serverId={server.id} />
        <ServerDescription serverDescription={server.description as string} serverId={server.id} />
        <ServerType serverId={server.id} serverType={server.serverType as string} />
        <DefaultOpen  server={server}  />
        <NotificationSetting serverId={server.id} defaultNotification={server.defaultNotification as string} /> 
        <div className='flex items-center gap-4'>
        <div>
          
        <TransferOwnerShip serverMembers={server.Members} serverId={server.id} />
        </div>
        <div>
        <button className='bg-red-500 py-[0.45rem] px-3 rounded mt-4 text-sm flex items-center gap-1'>
          <RiInboxArchiveFill/>  Archive Server 
        </button>
        </div>
        </div>
       
    </div>






    
    </>
  )
}

export default Overview