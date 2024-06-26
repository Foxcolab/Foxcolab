import { Canvas, ForumManager, ForumsChannel, Member, SpreadSheetManager, Spreadsheets, TestChannel, TestChannelManager, canvasManager } from '@prisma/client'
import React from 'react'
import SchemaDialog from '../SchemaDialog/SchemaDialog'
import { IoIosArrowDown } from 'react-icons/io'
import { FaUsers } from 'react-icons/fa'

interface Props {
  name: string
  members: Member[]
  member:Member
  description:string
  createdBy:string
  createdAt:string
  type: string
  isAdmin:boolean
  schemaType:string
  managers: ForumManager | TestChannelManager | canvasManager | SpreadSheetManager | null
  serverMembers:Member[]
  sendMsg:boolean
  schema:ForumsChannel | Canvas | TestChannel | Spreadsheets
}
function SchemaHeader({member, name, members, description, createdAt, createdBy, type, isAdmin, schemaType, managers, serverMembers, sendMsg, schema}:Props) {
  return (
    <>
    
    <div className="chat_section">
        <div className="channel_title">
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
           schema={schema}
           member={member}
           />
          
          
          </div>
        <div className='channel_memb_pin'>
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
        schema={schema}
        member={member}
        />
        

         </div>
         
          

      </div>
    
    
    </>
  )
}

export default SchemaHeader