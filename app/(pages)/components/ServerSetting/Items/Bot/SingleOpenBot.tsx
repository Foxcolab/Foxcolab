import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { BotResponse, Member, User } from '@prisma/client'
import { FaInfoCircle, FaRobot } from 'react-icons/fa'
import LetterAvatar from '../../../UserAvatar/LetterAvatar'
import { UserAvatar } from '../../../UserAvatar/UserAvatar'
import { RiShieldUserFill } from 'react-icons/ri'
import { format } from 'date-fns'
import MsgFile from '../../../Chat/MsgFile'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

  
interface Props {
    open:boolean
    setOpen:any
    botResponse:BotResponse & {
        createdMember: Member & {
            user: User
        }
    }
}

function SingleOpenBot({open, setOpen, botResponse}:Props) {
    const member = botResponse.createdMember;
  return (
    <>
    <Sheet open={open} onOpenChange={setOpen}>
  {/* <SheetTrigger>Open</SheetTrigger> */}
  <SheetContent className='sm:max-w-[525px]'>
    <SheetHeader>
      <SheetTitle>Bot Response</SheetTitle>
    </SheetHeader>
    <hr />
    <div>
        <div className="bot_res_header">
            <div className='bot_res_up_txt'>
                <div className="bot_tg_title">{botResponse.triggeredText}</div>
                <div className="bot_tg_type">{botResponse.triggeredType==="specificText" ? "Specific Text" : "Full Text"} 
                
                <HoverCard>
                <HoverCardTrigger className='cursor-pointer'><FaInfoCircle/></HoverCardTrigger>
                 <HoverCardContent>
                      {botResponse.triggeredType==="fullText" ? "In this type, bot will triggered if the entire text is present in the full inputs." : "In this type, bot will triggered if the specific text is present in the full inputs."}
                </HoverCardContent>
                </HoverCard>                
                
                
                </div>
            </div>
            <div className='bot_creation'>
                <div className='profile'>{member.user.profilePic===null ? <LetterAvatar name={member.user.name as string} radius={50}  size={25} /> : <UserAvatar src={member.user.profilePic} />  }  {member.user.name} </div>
                <div className='timesmp'>, {format(new Date(botResponse.createdAt), "dd MMM yyyy, hh:mm")}</div>
            </div>
        </div>

        <div className="bot_res_content mt-4">
        <div className='resp_logo bg-red-500'><FaRobot/></div>

           <div className="mt-2">
           <div className="resp_text">
            
            {botResponse.responseText}
            </div>
            <div className="mt-4">
                {
                    botResponse.responseFileUrl.map((fileUrl, i)=>(
                        <MsgFile fileUrl={fileUrl} key={i} length={botResponse.responseFileUrl.length} type="" />
                    ))
                }
            </div>
           </div>

        </div>



      </div>
  </SheetContent>
</Sheet>
    
    
    </>
  )
}

export default SingleOpenBot