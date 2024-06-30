import { Forums, Member } from '@prisma/client'
import React from 'react'
import ForumMessages from './ForumMessages';
import EditorFooter from '../../Editor/EditorFooter';
import ForumEditor from '../../Editor/Forum/ForumEditor';

interface Props {
    forum:Forums
    managerIds: string[]
    whoCanComment:boolean
    whoCanDelete:boolean
    whoCanUploadMediaInComment:boolean
    member:Member
}
function ForumMessageContainer({forum, managerIds, whoCanComment, whoCanDelete, whoCanUploadMediaInComment, member}:Props) {
  const messages = []
  // const createdBy:Member = forum.member;
  return (
    <>

    <ForumMessages
    member={member}
    chatId={forum.id}
    apiUrl='/api/messages/threads/forum'
    socketUrl='/api/socket/threads/forum'
    socketQuery={{
      forumId:forum.id
    }}
    paramKey='forumId'
    paramValue={forum.id}
    forum={forum}
    ManagerIds={managerIds}
    
    
    />



    



    </>
  )
}

export default ForumMessageContainer;