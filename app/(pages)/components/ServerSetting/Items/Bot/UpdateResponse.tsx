import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaUserLarge } from 'react-icons/fa6'
import { FaRobot } from 'react-icons/fa'
import EditorEmoji from '../../../Emoji/EditorEmoji'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Loader from '../../../Loaders/Loader'
import { BotResponse } from '@prisma/client'

interface Props {
    botResponse: BotResponse
    open:boolean
    setOpen:any
}

function UpdateResponse({ botResponse, open, setOpen}:Props) {
    const [triggeredText, setTriggeredText] = useState(botResponse.triggeredText);
    const [responseText, setResponseText] = useState(botResponse.responseText);
    const [triggeredType, setTriggeredType] = useState(botResponse.triggeredType);
    const [emojiDialog, setEmojiDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useParams();

    const onSubmit = async () => {
        try {
            
            setLoading(true);
            const res = await axios.put(`/api/bot/response?serverId=${params?.id}&botResponseId=${botResponse.id}`, {
                triggeredText:triggeredText, responseText:responseText, 
                triggeredType:triggeredType
            });
            console.log(res);
        //   await axios.post(url, values);
          router.refresh();
          setLoading(false);
          setEmojiDialog(false);
          setOpen(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }


 


  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {/* <button className='addBotBtn'>Update Response</button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Update FoxcolabBot Response</DialogTitle>
        </DialogHeader>
        <hr />
        <div className='mb-4'>
            <div className='botRes_inp_con'>
                <label htmlFor="">When someone says</label>
                <div className='botInp_con'>
                <div className='bot_usr_logo bg-blue-500'><FaUserLarge/></div>
                <div className='bot_user_inpt'>
                {/* <Textarea placeholder="Type your message here." /> */}
                <textarea  rows={3} onChange={(e)=>setTriggeredText(e.target.value)} defaultValue={triggeredText} />

                </div>
                </div>
            </div>
            <div className='botRes_inp_con mt-2'>
                <label htmlFor="">FoxcolabBot Responds</label>
                <div className='botInp_con'>
                <div className='bot_usr_logo bg-red-500'><FaRobot/></div>
                <div className='bot_res_inpt' id='bot_res_inp'>
                {/* <Textarea placeholder="Type your message here." /> */}
                <textarea  rows={2} onChange={(e)=>setResponseText(e.target.value)} value={responseText} />

             
                <div className='response_btns'>
                   
                    <EditorEmoji emojiDialog={emojiDialog}  setEmojiDialog={setEmojiDialog}  onChange={(emoji)=> {
                        console.log(emoji);
                        setResponseText(`${responseText}${emoji}`);
                        setEmojiDialog(false);
                        console.log(emojiDialog)
                    } }  />
                </div>
                </div>
                </div>
            </div>

            <div className="botRes_inp_con flex items-center justify-between mt-4 ">
                <div>
                <label htmlFor=""> Bot Triggered Checking Type</label>
                
                </div>
                
                <div >
                <Select onValueChange={(value)=>setTriggeredType(value)} defaultValue={triggeredType}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select Bot response type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="fullText">Full Text</SelectItem>
                        <SelectItem value="specificText">Sepcific Text</SelectItem>
                        
                        
                            
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <HoverCard open>
                            <HoverCardTrigger asChild>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                            In this type, bot will triggered if the entire text is present in the full inputs.
                            </HoverCardContent>
                </HoverCard>
                <HoverCard>
                            <HoverCardTrigger asChild>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                            In this type, bot will triggered if the specific text is present in the full inputs.
                            </HoverCardContent>
                        </HoverCard>
                </div>

            </div>
            <DialogDescription>
                    In <span className='font-bold'>Full Text</span> type, bot will triggered if the entire text is present in the full inputs and <span className='font-bold'>Specific Text</span> type  bot will triggered if the specific text is present in the full inputs.
                </DialogDescription>




        </div>
        <DialogFooter>
            {
                loading ? <Loader/> : <>
                    <Button type="submit" variant={"outline"}>Cancel</Button>
                    <Button type="submit" className='bg-green-500 hover:bg-green-600 text-white' onClick={onSubmit}>Update</Button>
                </>
            }
    
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default UpdateResponse