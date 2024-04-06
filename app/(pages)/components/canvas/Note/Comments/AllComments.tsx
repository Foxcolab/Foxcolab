import { NoteComment } from '@prisma/client'
import React from 'react'
import SingleComment from './SingleComment'

interface Props {
    comments:NoteComment[]
}

function AllComments({comments}:Props) {
  return (
    <>
    {
        comments && comments.map((comment, i)=>(
            <SingleComment key={comment.id} comment={comment} />
        ))
    }
    
    
    
    </>
  )
}

export default AllComments