import { Separator } from '@/components/ui/separator'
import React from 'react'
import CommentEditor from '../../../Editor/Comment/CommentEditor'
import { Note } from '@prisma/client'
import AllComments from './AllComments'

interface Props {
    note:Note
}
function NoteComment({note}:Props) {
  return (
    <>
        <div className='note_right_container'>
            <div className="note_comments">Comments</div>
            <Separator orientation='horizontal' />
            <div className="all_comments">
              <AllComments comments={note?.comments} />
            </div>

        <div className="comment_editor_container">
            <CommentEditor noteId={note?.id} />
        </div>

        </div>
       
    
    
    </>
  )
}

export default NoteComment