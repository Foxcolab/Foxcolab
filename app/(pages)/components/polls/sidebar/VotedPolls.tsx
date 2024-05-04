import { Member, Message, Poll, PollVote } from '@prisma/client'
import React from 'react'
import SinglePoll from './SinglePoll'


interface Props {
    messages:Message[] & {
        poll:Poll
    } & {
        pollVotes:PollVote[]
    }
    currentMember:Member
}
function VotedPolls({messages, currentMember}:Props) {
  return (
    <>
    
        
    {
      messages.length>0 ? <> 
      
      <div className='mt-4'>
      {
        messages && messages.map((message)=>(
            <>
           <SinglePoll message={message} type="Voted" currentMember={currentMember} />
            </>
        ))
      }
      </div>
      
      
      </> :

      <div className='mt-[10rem] text-lg font-semibold w-full flex items-center justify-center'>You have not vote yet.</div>
    }
    
    
    
    </>
  )
}

export default VotedPolls