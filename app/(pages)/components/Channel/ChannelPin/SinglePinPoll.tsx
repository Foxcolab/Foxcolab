import { Member, Poll, PollVote } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react'


interface Props {
    poll:Poll & {
        votes:PollVote[]
    }
    currentMember:Member
}

function SinglePinPoll({poll, currentMember}:Props) {
    let isVoted = false;
    for(let i=0; i<poll?.votes.length; i++){
        if(poll?.votes[i].createdBy===currentMember.id){
            isVoted = true;
            // setMyVotes(poll.votes[i].vote);
        }
    }
    let votingPercentage:number[] = [];
    for(let i=0; i<poll.options.length; i++){
        votingPercentage.push(0);
    }
   
    
    for(let i=0; i<poll.votes.length; i++){
        for(let j=0; j<poll.votes[i].vote.length; j++){
            for(let k=0; k<poll.options.length; k++){
                if(poll.votes[i].vote[j]===poll.options[k]){
                    votingPercentage[k]++;
                }
            }
        }
    }

    for(let i=0; i<votingPercentage.length; i++){
        if(votingPercentage[i]!==0 && poll.votes.length!==0){
            votingPercentage[i] = (votingPercentage[i]/poll.votes.length)*100;
        }
        
    }

    const isAdmin = currentMember.id===poll.createdBy;
    const currentTime = new Date();
    let isExpired = false;
    if(poll.expiryDate!==null){
        const expiredDate = new Date(poll.expiryDate);
        if(expiredDate.getTime()<currentTime.getTime()){
            isExpired = true;
        }
    }

  return (
    <>
    <div className="poll_container">
                <div className="mb-2 font-semibold">
                    {poll.question}
                </div>
    {
        isVoted ? <> 
       <>
                    <div className="voted_options">
                        {
                        poll.options.map((opt, i)=>(
                            <div className="voted_opt" key={i}>
                                <div className=' h-full prog_bar voted_progress_color' style={{width:`${votingPercentage[i]}%`}}></div>
                               <div className='w-full flex justify-between h-full items-center overflow-hidden px-2 prog_bar'>
                               <div className='voted_opt_content'>{opt}</div>
                                    <div className='voted_opt_percentage text-sm font-semibold'>{votingPercentage[i]}%</div>
                               </div>
                                </div>

                        ))
                    }
                </div>

                
                    </>   
        
        
        
        
        </> : <> 
        
        <div>
                <div className="poll_option">
                    {
                        poll.options.map((option, i)=>(
                            <div key={i} className='flex items-center gap-2 h-8'>
                                {
                                    poll.answerType==="singleChoice" ? 
                                    <input type="radio" disabled value={option} className='radio cursor-pointer h-[1.1rem] w-[1.1rem]' name={poll.id} />
                                     : 
                                    <input type='checkbox' disabled value={option} className='checkbox cursor-pointer h-[1.1rem] w-[1.1rem]' />
                                }
                                <div>{option}</div>
                            </div>
                        ))
                    }
                </div>
                {
                  poll.anonymous && 
                <div className='text-sm' style={{color:'var(--color3)'}}>This is anonymous poll. Share your thoughts anonymously.</div>
              }
                <div className='text-sm' style={{color:'var(--color3)'}} > {poll.expiryDate!==null &&  <> This poll will expired on {format(new Date(poll.expiryDate), 'dd MMM yyyy, hh:mm')}. </>  }   </div>
               
                </div>
        
        
        
        
        </>
    }

    </div>
    
    
    </>
  )
}

export default SinglePinPoll