import { NoteComment } from '@prisma/client'
import React, { useState } from 'react'
import MsgFile from '../../../Chat/MsgFile'
import { format } from 'date-fns'
import LetterAvatar from '../../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../../UserAvatar/UserAvatar'
import { BsThreeDotsVertical } from 'react-icons/bs'
import SingleThreeDot from './SingleThreeDot'

interface Props {
    comment:NoteComment
    memberId:string
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";


function SingleComment({comment, memberId}:Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const timestamp = format(new Date(comment.createdAt), DATE_FORMAT);
    const member = comment?.createdMember;
    const fileUrl = comment?.fileUrl;
    const isEdited = comment?.isUpdated===undefined ? false : comment.isUpdated;
    const canEdit = comment.createdBy ===memberId;
    const canDelete = comment.createdBy ===memberId ;
  return (
    <>
    
    <div className="single_comment">
        <div className="single_c_header">
          <div className='single_head_l'>           
            <div className="single_c_prof">
            {
            (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
            <LetterAvatar 
            name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name }
           size={30}
           radius={50}
           
            /> : 
          <UserAvatar src={member.user.profilePic} />

          }
            </div>
            <div className="single_c_name">
                {member.user.name}
            </div>
            <div className="single_c_time">
                {timestamp}
            </div>
          </div>
          <div className="single_head_r">
            <SingleThreeDot noteId={comment.noteId as string} commentId={comment.id} showOptions={showOptions} setShowOptions={setShowOptions} content={comment.content } canEdit={canEdit} canDelete={canDelete} />
          </div>
        </div>
        <div className="single_c_content_con">
            <div className='single_c_content'>
            <div dangerouslySetInnerHTML={{__html:comment.content}} />
            </div>
            <div className="single_c_files">
            {fileUrl?.length!==0 && 
              
              fileUrl &&  fileUrl.map((file, i)=>(
                 <>
                 <MsgFile fileUrl={file} key={i} length={length} type="msgFile" />
 
                 </>
               ))
               
               }
            </div>
        </div>
        
        {
            isEdited && <div className="edited_comment">
                <span className='italic text-xs text-gray-500'>This comment was edited on {format(new Date(comment.updatedAt), DATE_FORMAT)} </span>
            </div>
        }



    </div>

    
    </>
  )
}

export default SingleComment