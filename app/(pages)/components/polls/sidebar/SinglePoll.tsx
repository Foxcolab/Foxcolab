import { Member, Message, Poll, PollVote, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import { format } from 'date-fns'
import ViewVotes from '../../Chat/Polls/ViewVotes'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiFillDelete } from 'react-icons/ai'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Loader from '../../Loaders/Loader'


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

    type:"Created" | "Voted" | "Pending"
    currentMember:Member





}
function SinglePoll({message ,type, currentMember}:Props) {
    const [voteDialog, setVoteDialog] = useState(false);
    const [hover, setHover] = useState(false);
    const [delDialog, setDelDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [myVotes, setMyVotes] = useState(['']);
    const poll = message.poll;
    const pollVotes = message.pollVotes;


   

    const params = useParams();
    const router = useRouter();

    let myVotes:string[] = []
    if(type==="Voted"){
        for(let i=0; i<pollVotes.length; i++){
            if(pollVotes[i]?.createdBy===currentMember.id){
                myVotes = pollVotes[i].vote;
            }
        }
    }
    
    let isVoted = false;
    for(let i=0; i<message.pollVotes.length; i++){
        if(message.pollVotes[i].createdBy===message.memberId){
            isVoted = true;
            // setMyVotes(poll.votes[i].vote);
        }
    }
    const member = message.member;

    let votingPercentage:number[] = [];
    for(let i=0; i<poll.options.length; i++){
        votingPercentage.push(0);
    }


    for(let i=0; i<pollVotes.length; i++){
        for(let j=0; j<pollVotes[i].vote.length; j++){
            for(let k=0; k<poll.options.length; k++){
                if(pollVotes[i].vote[j]===poll.options[k]){
                    votingPercentage[k]++;
                }
            }
        }
    }

    for(let i=0; i<votingPercentage.length; i++){
        if(votingPercentage[i]!==0 && pollVotes.length!==0){
            votingPercentage[i] = (votingPercentage[i]/pollVotes.length)*100;
        }
        
    }

    const DeletePoll =async()=>{
        try {
            setLoading(true);
            const res  = await axios.delete(`/api/socket/messages/polls/delete?serverId=${params?.id}&messageId=${message.id}&channelId=${message.channelId}&pollId=${poll.id}`);
            router.refresh();
            setLoading(false);
            setDelDialog(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    console.log(myVotes)

  return (
    <>
    
        {
            type==="Created" ?   
              <div className='relative group flex items-center p-2 mb-4 mr-4  transition w-full single_poll_container rounded-md border' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}> 
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
            <>
            <div className="voted_options">
                {
                message.poll?.options.map((opt:string, i:number)=>(
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
          <div className='mt-4 mb-2 flex items-center justify-between'>           
          <button className='py-[0.35rem] px-4 rounded bg-yellow-500 text-white text-sm font-semibold'  onClick={()=>setVoteDialog(true)}>View Votes ({pollVotes.length!==0 ? pollVotes.length: '0'})</button>         
          </div>
            </>
 </>
 </div>
         {
          voteDialog && <ViewVotes open={voteDialog} setOpen={setVoteDialog} votes={pollVotes} options={poll.options} question={poll.question} anonymous={poll.anonymous} />
          }
 </div>         
          <div className='py-2 pl-2 pr-4'>
              {
                  hover && <button className='text-xl p-1 rounded hover:bg-red-500 hover:text-white text-gray-500 dark:text-gray-200' onClick={()=>setDelDialog(true)}><AiFillDelete/></button>
              }
              </div>
 </div>
            {
            delDialog && <Dialog open={delDialog} onOpenChange={setDelDialog}>
            {/* <DialogTrigger ></DialogTrigger> */}
            <DialogContent className='max-w-[550px]'>
             <div className='py-2'>
             <DialogHeader>
                <DialogTitle>Are you absolutely sure to delete this poll?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
          
              <DialogFooter className='mt-4'>
                  {
                      loading ? <Loader/> : <>
                      
                      <Button variant={"outline"} onClick={()=>setDelDialog(false)}>Cancel</Button>
                  <Button variant={"default"} className='bg-red-500 text-white hover:bg-red-600' onClick={DeletePoll}>Delete</Button>
                      </>
                   }
              </DialogFooter>
             </div>
            </DialogContent>
          </Dialog>
                  }
</div> :

         /// votedd *********

         type==="Voted" ? 
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
                                    <input type="radio" value={option} className='radio cursor-pointer' name={poll.id} checked={myVotes.includes(option)}  />
                                     : 
                                    <input type='checkbox' value={option} className='checkbox cursor-pointer' checked={myVotes.includes(option)}  />
                                }
                                <div>{option}</div>
                            </div>
                        ))
                    }
                </div>

</>
</div>
     
</div>         
     
</div>
        
</div> 
         :

        //  pending 

        <div className='relative group flex items-center p-2 mb-4 mr-4  transition w-full single_poll_container rounded-md border' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}> 
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
       <>
       <div className="voted_options">
           {
           message.poll?.options.map((opt:string, i:number)=>(
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
     <div className='mt-4 mb-2 flex items-center justify-between'>           
     <button className='py-[0.35rem] px-4 rounded bg-yellow-500 text-white text-sm font-semibold'  onClick={()=>setVoteDialog(true)}>View Votes ({pollVotes.length!==0 ? pollVotes.length: '0'})</button>         
     </div>
       </>
</>
</div>
    {
     voteDialog && <ViewVotes open={voteDialog} setOpen={setVoteDialog} votes={pollVotes} options={poll.options} question={poll.question} anonymous={poll.anonymous} />
     }
</div>         
     <div className='py-2 pl-2 pr-4'>
         {
             hover && <button className='text-xl p-1 rounded hover:bg-red-500 hover:text-white text-gray-500 dark:text-gray-200' onClick={()=>setDelDialog(true)}><AiFillDelete/></button>
         }
         </div>
</div>
       {
       delDialog && <Dialog open={delDialog} onOpenChange={setDelDialog}>
       {/* <DialogTrigger ></DialogTrigger> */}
       <DialogContent className='max-w-[550px]'>
        <div className='py-2'>
        <DialogHeader>
           <DialogTitle>Are you absolutely sure to delete this poll?</DialogTitle>
           <DialogDescription>
             This action cannot be undone. This will permanently delete your account
             and remove your data from our servers.
           </DialogDescription>
         </DialogHeader>
     
         <DialogFooter className='mt-4'>
             {
                 loading ? <Loader/> : <>
                 
                 <Button variant={"outline"} onClick={()=>setDelDialog(false)}>Cancel</Button>
             <Button variant={"default"} className='bg-red-500 text-white hover:bg-red-600' onClick={DeletePoll}>Delete</Button>
                 </>
              }
         </DialogFooter>
        </div>
       </DialogContent>
     </Dialog>
             }
</div> 


        }




    
    
    
    </>
  )
}

export default SinglePoll