import { Member, Message, Poll, PollVote } from '@prisma/client'
import React from 'react'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import { format } from 'date-fns'
import SinglePoll from './SinglePoll'

interface Props {
    messages:Message[] & {
        poll:Poll
    } & {
        pollVotes:PollVote[]
    }
    currentMember:Member
}
function CreatedPolls({messages, currentMember}:Props) {
    
    const member = messages[0].createdMember;


    const VotingPercentage = (poll:Poll, index:number)=>{
        let votingPercentage:number[] = [];
        for(let i=0; i<poll.options.length; i++){
            votingPercentage.push(0);
        }
        return votingPercentage[index]
    }

    const isVoted = (poll:Poll)=>{
        let isVoted = false;
        for(let i=0; i<poll?.votes.length; i++){
        if(poll?.votes[i].createdBy===member.id){
            return true;
            // setMyVotes(poll.votes[i].vote);
        }
        }
        return false;
    }

  return (
    
    <>
    
    {
      messages.length>0 ? <> 
      
      <div className='mt-4'>
      {
        messages && messages.map((message)=>(
            <>
           <SinglePoll message={message} type="Created" currentMember={currentMember} />
            </>
        ))
      }
      </div>
      
      
      </> :

      <div className='mt-[10rem] text-lg font-semibold w-full flex items-center justify-center'>You have not created any poll till now.</div>
    }
    
    
    
    </>
  )
}

export default CreatedPolls