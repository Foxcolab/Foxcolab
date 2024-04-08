import React from 'react'
import ChannelRole from './ChannelRole'
import ForumRole from './ForumRole'
import CanvasRole from './CanvasRole'
import TestChannelRole from './TestChannelRole'
import { SchemaRole } from '@prisma/client'


interface Props {
  schemaType:"Channel" | "Forums" | "Canvas" | "Test Channel"
  whoCanReadMessage:SchemaRole
  whoCanSendMessage:SchemaRole
  whoCanMakePublicToPrivate:SchemaRole
  whoCanUploadMedia:SchemaRole   
  whoCanUpdateChannel:SchemaRole 
  whoCanManageManager:SchemaRole 
  whoCanManageMember:SchemaRole  
  whoCanDeleteMessage :SchemaRole
  whoCanCreateForms:SchemaRole   
  whoCanCreatePolls:SchemaRole 
  type:string
}

function SchemaRoleContainer({schemaType, whoCanCreateForms, whoCanCreatePolls, whoCanDeleteMessage, whoCanMakePublicToPrivate, whoCanManageManager, whoCanManageMember, whoCanReadMessage, whoCanSendMessage, whoCanUpdateChannel, whoCanUploadMedia, type}:Props) {
  return (
    <>
    
    {
      schemaType==="Channel" ?
       <ChannelRole
       whoCanCreateForms={whoCanCreateForms}
       whoCanCreatePolls={whoCanCreatePolls}
       whoCanDeleteMessage={whoCanDeleteMessage}
       whoCanMakePublicToPrivate={whoCanMakePublicToPrivate}
       whoCanManageManager={whoCanManageManager}
       whoCanManageMember={whoCanManageMember}
       whoCanReadMessage={whoCanReadMessage}
       whoCanSendMessage={whoCanSendMessage}
       whoCanUpdateChannel={whoCanUpdateChannel}
       whoCanUploadMedia={whoCanUploadMedia}
       type={type}
       /> :
      schemaType==="Forums" ? <ForumRole /> :
      schemaType==="Canvas" ? <CanvasRole /> :
      schemaType==="Test Channel" ? <TestChannelRole/> : ''
    }
    
    
    
    </>
  )
}

export default SchemaRoleContainer