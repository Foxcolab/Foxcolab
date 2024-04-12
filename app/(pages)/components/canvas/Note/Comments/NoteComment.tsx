import { Separator } from '@/components/ui/separator'
import React from 'react'
import CommentEditor from '../../../Editor/Comment/CommentEditor'
import { Note } from '@prisma/client'
import AllComments from './AllComments'

interface Props {
    note:Note
    canComment:boolean
    memberId:string

}
function NoteComment({note, canComment, memberId}:Props) {

  return (
    <>
        <div className='note_right_container'>
            <div className="note_comments">Comments</div>
            <Separator orientation='horizontal' />
            <div className="all_comments">
              <AllComments comments={note?.comments} memberId={memberId} />
            </div>

       
            <CommentEditor noteId={note?.id} canComment={canComment} />
       

        </div>
       
    
    
    </>
  )
}

export default NoteComment