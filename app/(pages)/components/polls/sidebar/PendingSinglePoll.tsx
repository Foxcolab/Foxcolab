import { Member, Message, Poll, PollVote, User } from '@prisma/client'
import React, { useState } from 'react'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import { format } from 'date-fns'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'


interface Props {
    message: Message & {
        poll:Poll
    } & {
        pollVotes:PollVote[]
    } & {
        member:Member & {
            user:User
        }
    }
    currentMember:Member
}

function PendingSinglePoll({message, currentMember}:Props) {
    const [loading, setLoading] = useState(false)
    const member = message.member;
    const poll = message.poll;
    const router = useRouter();

    const VoteHandler =async()=>{
        try {
        let votes= []
        let checkbox = document.querySelectorAll('.checkbox');
        let radio = document.querySelectorAll('.radio');
        if(poll.answerType==="singleChoice"){
          for(let i=0; i<radio.length; i++){
            if(radio[i].checked===true){
                votes.push(radio[i].value);
            }
          }
        }else {
          for(let i=0; i<checkbox.length; i++){
            if(checkbox[i].checked){
                votes.push(checkbox[i].value);
            }
          }
        }   

            setLoading(true);
            const res = await axios.post(`/api/socket/messages/polls/vote/new?serverId=${poll.serverId}&pollId=${poll.id}&messageId=${message.id}`, {votes});
            setLoading(false);

            router.refresh();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
  return (
    <>
             <div className='relative group flex items-center p-2 mb-4 mr-4  transition w-full single_poll_container rounded-md border' > 
         <div className="group flex gap-x-2 items-start w-full ">
      <div  className="cursor-pointer hover:drop-shadow-md transition">
    {
      (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
      <LetterAvatar
      name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name as string }
      size={40}
      radius={50}
      />         
      : 
      <UserAvatar src={member.user.profilePic} />         
      }
   </div>
      <div className="flex flex-col w-full">
      <div className="flex items-center gap-x-2 ">
      <div className="flex items-center">
      <p  className=" chat_un">
      {!member?.user ? "User": member?.user.name}
      </p>
      </div>
      <span className=" timestamp">
      {format(new Date(message.createdAt), 'dd MMM yyyy')}
      </span>
      </div>         
      <div className="poll_container">
      <div className="mb-2 font-semibold">
        {message.poll.question}
      </div>         
      <>     
        <div className="poll_option">
                    {
                        poll.options.map((option, i)=>(
                            <div key={i} className='flex items-center gap-2 poll_single_option'>
                                {
                                    poll.answerType==="singleChoice" ? 
                                    <input type="radio" value={option} className='radio cursor-pointer' name={poll.id}   />
                                     : 
                                    <input type='checkbox' value={option} className='checkbox cursor-pointer'   />
                                }
                                <div>{option}</div>
                            </div>
                        ))
                    }
                </div>

                <div className='text-sm' style={{color:'var(--color3)'}}>This is anonymous poll. Share your thoughts anonymously.</div>
                <div className='text-sm' style={{color:'var(--color3)'}} > {poll.expiryDate!==null &&  <> This poll will expired on {format(new Date(poll.expiryDate), 'dd MMM yyyy, hh:mm')}. </>  }   </div>
                <div className='mt-4 mb-2 flex items-center justify-between'>
                    {
                        loading ? 
                        <button disabled  className='flex items-center text-sm font-semibold py-[0.35rem] px-3 bg-gray-200 rounded'><ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                        Please wait</button>
                        : <button className='py-[0.35rem] px-4 rounded bg-green-500 text-white text-sm font-semibold' onClick={VoteHandler}>Submit</button>
                    }
                    
                   
                </div>
</>
</div>
     
</div>         
     
</div>
        
</div> 
    
    </>
  )
}

export default PendingSinglePoll