"use client";
import { ForumManager, Member, TestChannel, TestChannelManager, canvasManager } from '@prisma/client'
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
  setShowResult:any
  showResult:boolean
  resultLength:number
  testLength:number
  schema:TestChannel
}
function TestChannelHeader({name, members, description, createdAt, createdBy, type, isAdmin, schemaType, managers, serverMembers, sendMsg, setShowResult, showResult, resultLength, testLength, schema}:Props) {
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
        />
        {
            showResult ? <button onClick={()=>setShowResult(false)}>
            Tests ({testLength})
          </button> :  <button onClick={()=>setShowResult(true)}>
            Results ({resultLength})
          </button>
        }
         
          
        

         </div>
      </div>
    
    
    </>
  )
}

export default TestChannelHeader
