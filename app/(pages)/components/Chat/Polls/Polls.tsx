import { Channel, Later, Member, Message, PinnedPost, Poll, PollVote, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import LetterAvatar from '../../UserAvatar/LetterAvatar';
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios';
import Loader from '../../Loaders/Loader';
import { ReloadIcon } from '@radix-ui/react-icons';
import ViewVotes from './ViewVotes';
import { format } from 'date-fns';
import HoverMessage from '../Hover/HoverMessage';
import { GoDotFill } from 'react-icons/go';
import { BsBookmarkFill } from 'react-icons/bs';
import { TbPinnedFilled } from 'react-icons/tb';
interface props {
    id:string
    poll:Poll & {
        votes: PollVote[]
    }
    member: Member & {
        user: User;
    };
    timestamp: string;
    deleted: boolean;
    currentMember: Member;
    socketUrl: string;
    socketQuery: Record<string, string>;
    message:Message
    managers:String[]
    PinnedPosts: PinnedPost[];
    mySavedPost: Later[]
    myChannels:Channel[]
    allServerMember:Member[]
    setThreadMessage:any
    schemaType:"Channel" | "Threads" | "DirectMessage"
    whoCanDeleteMessage:boolean
    whoCanPinnedPost:boolean


}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

function Polls({id, poll,member, timestamp, deleted, currentMember, socketQuery, socketUrl, message, managers, PinnedPosts, mySavedPost, myChannels, allServerMember, setThreadMessage, schemaType, whoCanDeleteMessage, whoCanPinnedPost}:props) {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [myVotes, setMyVotes] = useState(['']);
    const [voteId, setVoteId] = useState('');
    const [voteDialog, setVoteDialog] = useState(false);
    // const [votingPercentage, setVotingPercentage] = useState([]);

  console.log(poll);

    useEffect(()=>{
        for(let i=0; i<poll?.votes.length; i++){
            if(poll?.votes[i].createdBy===currentMember.id){
                setMyVotes(poll.votes[i].vote);
                setVoteId(poll.votes[i].id);
                console.log(myVotes);
            }
        }
    }, [poll])

    console.log(myVotes)

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
        }
        else {
          for(let i=0; i<checkbox.length; i++){
            if(checkbox[i].checked){
                votes.push(checkbox[i].value);
            }
          }
        }   

            setLoading(true);
            if(schemaType==="DirectMessage"){
              const res = await axios.post(`/api/socket/direct-messages/poll/vote/new?serverId=${poll.serverId}&pollId=${poll.id}&messageId=${id}`, {votes});

            }else {
            const res = await axios.post(`/api/socket/messages/polls/vote/new?serverId=${poll.serverId}&pollId=${poll.id}&messageId=${id}`, {votes});

            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const UpdateHandler =async()=>{
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
            if(schemaType==="DirectMessage"){
              const res = await axios.put(`/api/socket/direct-messages/polls/vote/update?serverId=${poll.serverId}&pollId=${poll.id}&messageId=${id}&voteId=${voteId}`, {votes});
            }else {
              const res = await axios.put(`/api/socket/messages/polls/vote/update?serverId=${poll.serverId}&pollId=${poll.id}&messageId=${id}&voteId=${voteId}`, {votes});

            }
            setLoading(false);
            setIsEditing(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

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



    const CheckHandler =(value:string)=>{
        if(poll.answerType==="singleChoice"){
            setMyVotes([value]);
        }else {
            const votes = []
        let checkbox = document.querySelectorAll('.checkbox');
        for(let i=0; i<checkbox.length; i++){
            if(checkbox[i].checked){
                votes.push(checkbox[i].value);
            }
          }
          setMyVotes(votes);
        }
    }


    const isAdmin = currentMember.id===member.id;
    const currentTime = new Date();
    let isExpired = false;
    if(poll.expiryDate!==null){
        const expiredDate = new Date(poll.expiryDate);
        if(expiredDate.getTime()<currentTime.getTime()){
            isExpired = true;
        }
    }

    let isPinnedPost=false;
let pinnedPost;
PinnedPosts && PinnedPosts.forEach(p => {
  if(schemaType==="Threads"){
    if(p.threadId===id){
      isPinnedPost=true;
      pinnedPost=p;
      // pinnedPostUser=p.user;
    }
    else if(schemaType==="DirectMessage"){
      if(p.directMessageId===id){
        isPinnedPost=true;
        pinnedPost=p;
        // pinnedPostUser=p.createdUser?.user;
      }
    }
  }else {
    if(p.messageId===id){
      isPinnedPost=true;
      // pinnedPostUser=p?.createdUser?.user;
      pinnedPost=p;
    }
  }
  
});

let isSavedPost=false;
let savedPost;

mySavedPost && mySavedPost.forEach(p => {
  if(schemaType==="Threads"){
    if(p.threadId===message.id){
      isSavedPost=true;
      savedPost=p;
    }
  }
  else if(schemaType==="DirectMessage"){
    if(p.directMessageId===id){
      isPinnedPost=true;
      pinnedPost=p;
    }
  }
  else {
    if(p.messageId===id){
      isSavedPost=true;
      savedPost=p;
    }
  }
  }
)

const CalcTime =(dt:any)=>{
  if(dt===undefined || dt===null) return;
  const currentTime= new Date();
  const date = new Date(dt);  
  const diff = date.getTime() - currentTime.getTime() ;
  let format = "Minutes";
  var timeDifference = Math.abs(date.getTime() - currentTime.getTime());
  const cp = date.getTime() - currentTime.getTime();
  // Calculate differences in seconds, minutes, hours, and days
  var secondsDifference = Math.floor(timeDifference / 1000);
  var minutesDifference = Math.floor(secondsDifference / 60);
  var hoursDifference = Math.floor(minutesDifference / 60);
  var daysDifference = Math.floor(hoursDifference / 24);

  // Format the result based on the magnitude of the difference
  let text = "";
  if (secondsDifference < 60) {
    text = secondsDifference + " seconds";
  } else if (minutesDifference < 60) {
    text = minutesDifference + " minutes";
  } else if (hoursDifference < 24) {
    text = hoursDifference + " hours";
  } else {
    text = daysDifference + " days";
  }

if(cp<0){
      return <span className="text-red-500 flex items-center"><GoDotFill/> Due {text} ago</span>  
    }
  return <span className="flex items-center"><GoDotFill/> Due in {text}</span>;
}

// console.log(mySavedPost, )

  return (
    <>
    
 
    
    {
      schemaType==="Channel" ? <>
      
      <div className="relative group flex items-center p-2 mb-2  transition w-full msg_cnbdy" id={(isPinnedPost && isSavedPost)  ? "pinnedMsgBody": isSavedPost && !isPinnedPost ? "savedMsgBody" :  isPinnedPost && !isSavedPost ?"pinnedMsgBody":  ""}>
    <HoverMessage  message={message} currentMember={currentMember} socketQuery={socketQuery} socketUrl={socketUrl} isPinnedPost={isPinnedPost} isSavedPost={isSavedPost} myChannels={myChannels} allServerMember={allServerMember} setThreadMessage={setThreadMessage} schemaType={schemaType} whoCanPinnedPost={whoCanPinnedPost} whoCanDeleteMessage={whoCanDeleteMessage} 
    pinnedPost={pinnedPost} savedPost={savedPost}
    >
      <div className="w-full">
      {
      isPinnedPost && isSavedPost ?  <p className="text-xs pb-2 text-yellow-700 flex items-center"><TbPinnedFilled/> Pinned By <b> &nbsp;{pinnedPost?.createdUser?.user?.name}</b></p> : isPinnedPost && !isSavedPost ?  <p className="text-xs pb-2 text-yellow-700 flex items-center"><TbPinnedFilled/> Pinned By <b> &nbsp;{pinnedPost?.createdUser?.user?.name}</b></p> : isSavedPost && !isPinnedPost ? <p className="text-xs pb-2 text-green-600 flex items-center"><BsBookmarkFill/> Saved for later  {CalcTime(savedPost?.time)} </p>  : ''
    }
      <div className="group flex gap-x-2 items-start w-full ">

        <div  className="cursor-pointer hover:drop-shadow-md transition">

          {
            (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
            
            <LetterAvatar 
            name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name }
           size={40}
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
              {/* <ActionTooltip label={member.role}>
                {roleIconMap[member?.role] || "user"}
              </ActionTooltip> */}
            </div>
            <span className=" timestamp">
              {timestamp}
            </span>
          </div>


              {/* CONTENT START  */}

              <div className="poll_container">
                <div className="mb-2 font-semibold">
                    {poll.question}
                </div>
            {
                isVoted || isExpired ? 
                <>
                
                {
                    isEditing ? <> 
                     <div className="poll_option">
                    {
                        poll.options.map((option, i)=>(
                            <div key={i} className='flex items-center gap-2 poll_single_option'>
                                {
                                    poll.answerType==="singleChoice" ? 
                                    <input type="radio" value={option} className='radio cursor-pointer h-[1.1rem] w-[1.1rem]' name={poll.id} checked={myVotes.includes(option)} onChange={(e)=>CheckHandler(e.target.value)} />
                                     : 
                                    <input type='checkbox' value={option} className='checkbox cursor-pointer h-[1.1rem] w-[1.1rem]'  checked={myVotes.includes(option)} onChange={(e)=>CheckHandler(e.target.value)} />
                                }
                                <div>{option}</div>
                            </div>
                        ))
                    }
                </div>
                    <div className='mt-4 mb-2 flex items-center justify-between'>
                    <button className='py-[0.35rem] px-4 rounded border border-gray-200 text-black text-sm font-semibold' onClick={()=>setIsEditing(false)}>Cancel</button>
                    
                    {
                        loading ? <button disabled  className='flex items-center text-sm font-semibold py-[0.35rem] px-3 bg-gray-200 rounded'><ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                        Please wait</button> :   <button className='py-[0.35rem] px-4 rounded bg-green-500 text-white text-sm font-semibold' onClick={UpdateHandler}>Submit</button>
                    }
                  
                </div>
                    </> :
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

                <div className='mt-4 mb-2 flex items-center justify-between'>
                    {
                        !isExpired && <button className='py-[0.35rem] px-4 rounded border border-gray-200 dark:text-white text-black text-sm font-semibold' onClick={()=>setIsEditing(true)}>Edit Response</button>
                    }
                                        
                    
                   {
                     isAdmin &&  <button className='py-[0.35rem] px-4 rounded bg-yellow-500 text-white text-sm font-semibold'  onClick={()=>setVoteDialog(true)}>View Votes ({poll.votes.length!==0 ? poll.votes.length: '0'})</button>
                   }
                </div>
                    </>
                }
                    
                
                </>
                :
                <div>
                <div className="poll_option">
                    {
                        poll.options.map((option, i)=>(
                            <div key={i} className='flex items-center gap-2 h-8'>
                                {
                                    poll.answerType==="singleChoice" ? 
                                    <input type="radio" value={option} className='radio cursor-pointer h-[1.1rem] w-[1.1rem]' name={poll.id} />
                                     : 
                                    <input type='checkbox' value={option} className='checkbox cursor-pointer h-[1.1rem] w-[1.1rem]' />
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
                <div className='mt-4 mb-2 flex items-center justify-between'>
                    {
                        loading ? 
                        <button disabled  className='flex items-center text-sm font-semibold py-[0.35rem] px-3 bg-gray-200  rounded'><ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                        Please wait</button>
                        : <button className='py-[0.35rem] px-4 rounded bg-green-500 text-white text-sm font-semibold' onClick={VoteHandler}>Submit</button>
                    }
                    
                    {
                        isAdmin && <button className='py-[0.35rem] px-4 rounded bg-yellow-500 text-white text-sm font-semibold' onClick={()=>setVoteDialog(true)}>View Votes ({poll.votes? poll.votes.length: '0'})</button>
                    }
                </div>
                </div>
            }
              </div>


            {
                voteDialog && <ViewVotes open={voteDialog} setOpen={setVoteDialog} votes={poll.votes} options={poll.options} question={poll.question} anonymous={poll.anonymous} />
            }

         
        </div>

        </div>
        </div>
    </HoverMessage>
      </div> 
      
       </> : <>
      
      
       <div className="relative group flex items-center  p-4 transition w-full msg_cnbdy">
      <div className="group flex gap-x-2 items-start w-full">

        <div  className="cursor-pointer hover:drop-shadow-md transition">

          {
            (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
            
            <LetterAvatar 
            name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name }
           size={40}
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
              {/* <ActionTooltip label={member.role}>
                {roleIconMap[member?.role] || "user"}
              </ActionTooltip> */}
            </div>
            <span className=" timestamp">
              {timestamp}
            </span>
          </div>


              {/* CONTENT START  */}

              <div className="poll_container">
                <div className="mb-2 font-semibold">
                    {poll.question}
                </div>
            {
                isVoted || isExpired ? 
                <>
                
                {
                    isEditing ? <> 
                     <div className="poll_option">
                    {
                        poll.options.map((option, i)=>(
                            <div key={i} className='flex items-center gap-2 poll_single_option'>
                                {
                                    poll.answerType==="singleChoice" ? 
                                    <input type="radio" value={option} className='radio cursor-pointer h-[1.1rem] w-[1.1rem]' name={poll.id} checked={myVotes.includes(option)} onChange={(e)=>CheckHandler(e.target.value)} />
                                     : 
                                    <input type='checkbox' value={option} className='checkbox cursor-pointer h-[1.1rem] w-[1.1rem]'  checked={myVotes.includes(option)} onChange={(e)=>CheckHandler(e.target.value)} />
                                }
                                <div>{option}</div>
                            </div>
                        ))
                    }
                </div>
                    <div className='mt-4 mb-2 flex items-center justify-between'>
                    <button className='py-[0.35rem] px-4 rounded border border-gray-200 text-black text-sm font-semibold' onClick={()=>setIsEditing(false)}>Cancel</button>
                    
                    {
                        loading ? <button disabled  className='flex items-center text-sm font-semibold py-[0.35rem] px-3 bg-gray-200 rounded'><ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                        Please wait</button> :   <button className='py-[0.35rem] px-4 rounded bg-green-500 text-white text-sm font-semibold' onClick={UpdateHandler}>Submit</button>
                    }
                  
                </div>
                    </> :
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

                <div className='mt-4 mb-2 flex items-center justify-between'>
                    {
                        !isExpired && <button className='py-[0.35rem] px-4 rounded border border-gray-200 dark:text-white text-black text-sm font-semibold' onClick={()=>setIsEditing(true)}>Edit Response</button>
                    }
                                        
                    
                   {
                     isAdmin &&  <button className='py-[0.35rem] px-4 rounded bg-yellow-500 text-white text-sm font-semibold'  onClick={()=>setVoteDialog(true)}>View Votes ({poll.votes.length!==0 ? poll.votes.length: '0'})</button>
                   }
                </div>
                    </>
                }
                    
                
                </>
                :
                <div>
                <div className="poll_option">
                    {
                        poll.options.map((option, i)=>(
                            <div key={i} className='flex items-center gap-2 h-8'>
                                {
                                    poll.answerType==="singleChoice" ? 
                                    <input type="radio" value={option} className='radio cursor-pointer h-[1.1rem] w-[1.1rem]' name={poll.id} />
                                     : 
                                    <input type='checkbox' value={option} className='checkbox cursor-pointer h-[1.1rem] w-[1.1rem]' />
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
                <div className='mt-4 mb-2 flex items-center justify-between'>
                    {
                        loading ? 
                        <button disabled  className='flex items-center text-sm font-semibold py-[0.35rem] px-3 bg-gray-200  rounded'><ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                        Please wait</button>
                        : <button className='py-[0.35rem] px-4 rounded bg-green-500 text-white text-sm font-semibold' onClick={VoteHandler}>Submit</button>
                    }
                    
                    {
                        isAdmin && <button className='py-[0.35rem] px-4 rounded bg-yellow-500 text-white text-sm font-semibold' onClick={()=>setVoteDialog(true)}>View Votes ({poll.votes? poll.votes.length: '0'})</button>
                    }
                </div>
                </div>
            }
              </div>


            {
                voteDialog && <ViewVotes open={voteDialog} setOpen={setVoteDialog} votes={poll.votes} options={poll.options} question={poll.question} anonymous={poll.anonymous} />
            }

              
          {/* <p className={cn(
              "text-sm text-zinc-200 dark:text-zinc-300",
              deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
            )}>
              {/* <div dangerouslySetInnerHTML={{__html:content}} className="msg_contnt" /> */}
             {/* <div className='msg_contnt'>{poll.question}</div>
            </p>  */}


           





         



      
        
         
        </div>

        </div>
        </div>
      
      
       </>
    }
    
    
    </>
  )
}

export default Polls