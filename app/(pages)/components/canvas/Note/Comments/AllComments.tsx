import { NoteComment } from '@prisma/client'
import React from 'react'
import SingleComment from './SingleComment'

interface Props {
    comments:NoteComment[]
    memberId:string
}

function AllComments({comments, memberId}:Props) {
  return (
    <>
    {
        comments && comments.map((comment, i)=>(
            <SingleComment key={comment.id} comment={comment} memberId={memberId} />
        ))
    }
    
    
    
    </>
  )
}

export default AllComments