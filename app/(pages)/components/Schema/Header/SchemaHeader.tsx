import { ForumManager, Member, TestChannelManager, canvasManager } from '@prisma/client'
import React from 'react'
import SchemaDialog from '../SchemaDialog/SchemaDialog'
import { IoIosArrowDown } from 'react-icons/io'
import { FaUsers } from 'react-icons/fa'

interface Props {
  name: string
  members: Member[]
  description:string
  createdBy:string
  createdAt:string
  type: string
  isAdmin:boolean
  schemaType:string
  managers: ForumManager | TestChannelManager | canvasManager
  serverMembers:Member[]
  sendMsg:boolean
}
function SchemaHeader({name, members, description, createdAt, createdBy, type, isAdmin, schemaType, managers, serverMembers, sendMsg}:Props) {
  return (
    <>
    
    <div className="">
        <div className="channel_title">
        <div className='channel_name'>
        <div className='channel_mem'>
           <SchemaDialog
            name={name}
            members={members}
            description={description}
            createdBy={createdBy}
            createdAt={createdAt}
            type={type}
            isAdmin={isAdmin}
            schemaType={schemaType}
            managers={managers}
            startingState={"About"}
            content={<button># {name} <IoIosArrowDown/></button>
          }
           serverMembers={serverMembers}
           sendMsg={sendMsg}

           />
          
          
          </div>
          </div>
        <div className='channel_mem'>
        <SchemaDialog
        name={name}
        members={members}
        description={description}
        createdBy={createdBy}
        createdAt={createdAt}
        type={type}
        isAdmin={isAdmin}
        schemaType={schemaType}
        managers={managers}
        startingState={"Members"}
        content={<button className=''><FaUsers/> Members {members.length}</button> }
        serverMembers={serverMembers}
        sendMsg={sendMsg}
        />
        

         </div>
         
          

         </div>
      </div>
    
    
    </>
  )
}

export default SchemaHeader