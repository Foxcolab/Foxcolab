"use client";
import { Member, Message, Poll, PollVote } from '@prisma/client';
import React, { useState } from 'react'
import CreatedPolls from './CreatedPolls';
import VotedPolls from './VotedPolls';
import PendingPolls from './PendingPolls';

interface Props {
    myVotes:Message[] & {
      poll:Poll
  } & {
      pollVotes:PollVote[]
  }
    Voted:Message[] & {
      poll:Poll
  } & {
      pollVotes:PollVote[]
  }
    pendingPoll:Message[] & {
      poll:Poll
  } & {
      pollVotes:PollVote[]
  }
  currentMember:Member
}

function PollContainer({myVotes, Voted, pendingPoll, currentMember}:Props) {
    const [state, setState] = useState("Created");
  return (
    <>
    <div className="pmsg_sts">
        <button className={state==="Created"? "activePmsg": ""} onClick={()=>setState("Created")}>Created by you</button>
        <button className={state==="Voted"? "activePmsg": ""} onClick={()=>setState("Voted")}>Voted</button>
        <button className={state==="Pending"? "activePmsg": ""} onClick={()=>setState("Pending")}>Pending</button>
    </div>

    {
        state==="Created" && myVotes.length>0 ?
        <> <CreatedPolls messages={myVotes} currentMember={currentMember}  /> </> :
        state==="Voted" && Voted.length>0 ?
        <> <VotedPolls messages={myVotes} currentMember={currentMember} /> </> :
        state==="Pending" && pendingPoll.length>0 ?
        <> <PendingPolls messages={pendingPoll} currentMember={currentMember} /> </> :
        
        <h1 className='nopinn'>No polls found!</h1>

    }

















    
    </>
  )
}

export default PollContainer