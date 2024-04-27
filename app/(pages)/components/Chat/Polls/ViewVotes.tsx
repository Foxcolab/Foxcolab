import { Member, PollType, PollVote } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import { format } from 'date-fns'



interface Props {
    votes:PollVote[]
    options:string[]
    question:string
    open:boolean
    setOpen:any
    anonymous:boolean
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

function ViewVotes({votes, options, question, open, setOpen, anonymous}:Props) {
    const [members, setMembers] = useState<any[]>([]);
    const [count, setCount] = useState(0);

    for(let i=0; i<options.length; i++){
        members[i] = [];
    }
    for(let i=0; i<votes.length; i++) {
        for(let j=0; j<votes[i].vote.length; j++) {
            for(let k=0; k<options.length; k++){
                if(options[k]===votes[i].vote[j]){
                    members[k].push(votes[i].createdMember);
                }
            }
        }
    }
  



    console.log(members)



  return (
    <>

     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] sm:max-h-[480px] sm:h-[480px] overflow-hidden">
        <div>

      
        <DialogHeader >
          <DialogTitle>{question}</DialogTitle>
          <DialogTitle style={{color:"var(--color3)"}}>{votes.length} vote</DialogTitle>
          <hr />
        </DialogHeader>
        <div className="w-full flex h-[90%]">
            <div className='w-2/5 flex-none border border-l-0 border-t-0 border-b-0 border-r h-full overflow-scroll pr-2 py-2 pl-0'>
                {
                   options && options.map((option, i)=>(
                        <button key={i} onClick={()=>setCount(i)} className={cn('py-1 pl-2 pr-2 mt-[0.3rem]  overflow-hidden rounded text-base font-semibold h-9 w-full text-left flex justify-between', count===i && "bg-green-500 text-white")}> <div className='overflow_text_hide'>{option} </div> <div className='flex-none'>({members[i]?.length || 0})</div>  </button>
                    ))
                }
            </div>
            <div className='w-3/5 p-2'>
                {
                  members[count] &&   members[count].map((member:Member, i:number)=>(
                        <div key={i} className='flex items-center gap-2 p-2'>
                             {
                                !anonymous ? <>
                                {
            (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
            
            <LetterAvatar 
            name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name }
           size={30}
           radius={50}
            />
            
            : 
          <UserAvatar src={member.user.profilePic} />

          }
           <div>{member.user.name}   </div>
                                </> :

                                <>
                                <LetterAvatar 
            name={ `Anonymous ` }
           size={30}
           radius={50}
            />
            <div className='text-base '>Anonymous {i+1}  </div>
                                
                                
                                </>
                             }
                        </div>
                    ))
                }

            </div>
            </div>
        </div>
        
      </DialogContent>
    </Dialog>
    
    
    
    </>
  )
}

export default ViewVotes