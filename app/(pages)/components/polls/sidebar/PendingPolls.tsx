import { Member, Message, Poll, PollVote } from '@prisma/client'
import React from 'react'
import SinglePoll from './SinglePoll'
import PendingSinglePoll from './PendingSinglePoll'

interface Props {
    messages:Message[] & {
        poll:Poll
    } & {
        pollVotes:PollVote[]
    }
    currentMember:Member
}
function PendingPolls({messages, currentMember}:Props) {
  return (
    <>
     {
      messages.length>0 ? <> 
      
      <div className='mt-4'>
      {
        messages && messages.map((message)=>(
            <>
           <PendingSinglePoll message={message} currentMember={currentMember} />
            </>
        ))
      }
      </div>
      
      
      </> :

      <div className='mt-[10rem] text-lg font-semibold w-full flex items-center justify-center'>You do not have any pending polls.</div>
    }
    
    </>
  )
}

export default PendingPolls