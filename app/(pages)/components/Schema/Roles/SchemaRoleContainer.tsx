import React from 'react'
import ChannelRole from './ChannelRole'
import ForumRole from './ForumRole'
import CanvasRole from './CanvasRole'
import TestChannelRole from './TestChannelRole'
import { Canvas, Channel, ForumsChannel, SchemaRole, TestChannel } from '@prisma/client'


interface Props {
  schemaType:"Channel" | "Forums" | "Canvas" | "Test Channel"
  // whoCanReadMessage:SchemaRole
  // whoCanSendMessage:SchemaRole
  // whoCanMakePublicToPrivate:SchemaRole
  // whoCanUploadMedia:SchemaRole   
  // whoCanUpdateChannel:SchemaRole 
  // whoCanManageManager:SchemaRole 
  // whoCanManageMember:SchemaRole  
  // whoCanDeleteMessage :SchemaRole
  // whoCanCreateForms:SchemaRole   
  // whoCanCreatePolls:SchemaRole 
  // type:string
  // whoCanUpdateForums:SchemaRole
  // whoCanCreatePost:SchemaRole
  // whoCanManagePost:SchemaRole
  // whoCanUploadMediaInComment:SchemaRole
  // whoCanDeletePost:SchemaRole
  // whoCanComment:SchemaRole
  schema:ForumsChannel | Canvas | TestChannel | Channel



}
// whoCanCreateForms, whoCanCreatePolls, whoCanDeleteMessage, whoCanMakePublicToPrivate, whoCanManageManager, whoCanManageMember, whoCanReadMessage, whoCanSendMessage, whoCanUpdateChannel, whoCanUploadMedia, type,whoCanUpdateForums,whoCanCreatePost, whoCanManagePost , whoCanUploadMediaInComment, whoCanDeletePost, whoCanComment,
function SchemaRoleContainer({schemaType,  schema }:Props) {
  return (
    <>
    
    {
      schemaType==="Channel" ?
       <ChannelRole
       whoCanCreateForms={schema?.whoCanCreateForms}
       whoCanCreatePolls={schema?.whoCanCreatePolls}
       whoCanDeleteMessage={schema?.whoCanDeleteMessage}
       whoCanMakePublicToPrivate={schema?.whoCanMakePublicToPrivate}
       whoCanManageManager={schema?.whoCanManageManager}
       whoCanManageMember={schema?.whoCanManageMember}
       whoCanReadMessage={schema?.whoCanReadMessage}
       whoCanSendMessage={schema?.whoCanSendMessage}
       whoCanUpdateChannel={schema?.whoCanUpdateChannel}
       whoCanUploadMedia={schema?.whoCanUploadMedia}
       type={schema.type}
        />
        :
      schemaType==="Forums" ? <ForumRole
      whoCanUpdateForums={schema.whoCanUpdateForums}
      whoCanMakePublicToPrivate={schema.whoCanMakePublicToPrivate}
      whoCanCreatePost={schema.whoCanCreatePost}
      whoCanManagePost={schema.whoCanManagePost}
      whoCanUploadMediaInComment={schema.whoCanUploadMediaInComment}
      whoCanDeletePost={schema.whoCanDeletePost}
      whoCanComment={schema.whoCanComment}
      whoCanManageMember={schema.whoCanManageMember}
      whoCanManageManager={schema.whoCanManageManager}
      type={schema.type}
     


      /> :
      schemaType==="Canvas" ? <CanvasRole
      
      whoCanUpdateCanvas={schema.whoCanUpdateCanvas}
      whoCanMakePublicToPublic={schema.whoCanMakePublicToPublic}
      whoCanCreateNote={schema.whoCanCreateNote}
      whoCanManageNote={schema.whoCanManageNote}
      whoCanUploadMediaInComment={schema.whoCanUploadMediaInComment}
      whoCanDeleteNote={schema.whoCanDeleteNote}
      whoCanComment={schema.whoCanComment}
      whoCanManageMember={schema.whoCanManageMember}
      whoCanManageManager={schema.whoCanManageManager}
      whoCanUpdateNote={schema.whoCanUpdateNote}
    
      
      /> :
      schemaType==="Test Channel" ? <TestChannelRole
      whoCanUpdateTestChannel={schema.whoCanUpdateTestChannel}
      whoCanMakePublicToPrivate={schema.whoCanUpdateTestChannel}
      whoCanCreateTest={schema.whoCanCreateTest}
      whoCanManageTest={schema.whoCanManageTest}
      whoCanGiveTest={schema.whoCanGiveTest}
      whoCanManageMember={schema.whoCanManageMember}
      whoCanManageManager={schema.whoCanManageManager}
      type={schema.type}
      
      
      /> : ''
    }
    
    
    
    </>
  )
}

export default SchemaRoleContainer