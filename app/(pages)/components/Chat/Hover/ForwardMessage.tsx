import React, { useState } from 'react'
import { RiShareForwardFill } from 'react-icons/ri'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ThreadTinyMce from '../../Editor/ThreadTinyMce'
import EditMessageEditor from '../../Editor/EditorFooter/EditMessageEditor'
import { Editor } from '@tinymce/tinymce-react'
import { Channel, Member, Message } from '@prisma/client'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { UserAvatar } from '../../UserAvatar/UserAvatar'
import LetterAvatar from '../../UserAvatar/LetterAvatar'
import MsgFile from '../MsgFile'

import { CheckIcon } from 'lucide-react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import SingleMsgFile from '../../Channel/ChannelPin/SingleMsgFile'
import ForwardedCommand from './ForwardedCommand'
import Loader from '../../Loaders/Loader'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'


const DATE_FORMAT = "d MMM yyyy, HH:mm";


interface ForwardProps {
    open:boolean
    setOpen:any
    message:Message,
    myChannels:Channel[]
    allServerMember:Member[]
    schemaType:"Channel" | "Threads" | "DirectMessage"

}

function ForwardMessage({open, setOpen, message, myChannels, allServerMember, schemaType}:ForwardProps) {
    const [search, setSearch] = React.useState(false)
    const [selectedChannel, setSelectedChannel] = useState([]);
    const [selectedMember, setSelectedMember] = useState([]);
    const [memberName, setMemberName] = useState([]);
    const [titles, setTitle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setcontent] = useState('');
    const params =useParams();
    const router = useRouter();
    const SubmitHandler =async()=>{
      try {
        setLoading(true);
        if(schemaType==="DirectMessage"){
          if(selectedMember.length!==0){
            await axios.post(`/api/socket/direct-messages/forward?messageId=${message.id}&serverId=${params?.id}`, {content, memberIds:selectedMember});
        }
        }else {
          if(selectedChannel.length!==0){
            await axios.post(`/api/socket/messages/forward?messageId=${message.id}&serverId=${params?.id}`, {content, channelIds:selectedChannel});
          }
          if(selectedMember.length!==0){
            await axios.post(`/api/socket/messages/forward/dm?messageId=${message.id}&serverId=${params?.id}`, {content, memberIds:selectedMember});
        }
        }
        
        router.refresh()
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    console.log("Checking Undefined:::", message.fileUrl, message.fileUrl.length);

  return (
    <>
    
    {
      message &&  <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="sm:max-w-[625px] my-4 py-4 forward_container">
        <DialogHeader className='mt-2'>
          <DialogTitle className='flex items-center gap-2'><RiShareForwardFill /> Forward Message</DialogTitle>
        </DialogHeader>
        <div className='my-4' style={{overflow:"scroll"}}>
           <div className='px-4 py-3 outline-none'>
          
           <Dialog open={search} onOpenChange={setSearch}>
            <div className='forward_input_div'>
            <DialogTrigger asChild className=''>
          <button>
            {
              titles.length===0 && memberName.length===0 ? <>select a channel or person</> :
              <>
              {
                titles && titles.map((title, i)=>(
                  <p key={i}>  {title}</p>
                ))
              }
               {
                memberName && memberName.map((title, i)=>(
                  <p key={i}>{title}</p>
                ))
              }
               
              
              </>
            }
            
            
            </button>
      </DialogTrigger>
            </div>
    
      <DialogContent className="sm:max-w-[525px]">
       


          <ForwardedCommand allChannels={myChannels} selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} title={titles} setTitle={setTitle} allServerMember={allServerMember} memberNames={memberName} setSelectedMember={setSelectedMember} setMemberNames={setMemberName} selectedMember={selectedMember} />

      





        <DialogFooter>
          {/* <Button type="submit" variant={"outline"} onClick={CommandCancel}>cancel</Button> */}
          
            <Button type="submit" onClick={()=>setSearch(false)}>Select</Button>
        


          
        </DialogFooter>
      </DialogContent>
    </Dialog>



           </div>
            <div className='  forward_content'>
        <Editor
        
        // onEditorChange={e=>form.setValue('content', e)}
        // initialValue={name}
        //  className='quill_editor'
  
        // value={content}
        onEditorChange={e=>setcontent(e)}
        apiKey='yyyncy8o4zxczahnhs5n0tz3ha0h7cvmrdg8jcap53vuu6wj'
         init={{
          skin: 'oxide-dark',
          content_css: 'dark',        
          menubar:false,
          // placeholder:`Message to ${name}`,
          selector: 'textarea#mytextarea',
            height:100,
            statusbar:false,
            plugins: [
                  "anchor", "autolink", "charmap", "codesample", "fullscreen",
                "help", "image", "insertdatetime", "link", "lists", "media",
                "preview", "searchreplace", "table", "visualblocks", "emoticons",
            ],
            toolbar: "bold italic underline strikethrough | bullist numlist outdent indent | table codesample emoticons",
          
          }}
 />   
            </div>

        <div className="forward_msg_container px-4">

        <div className='channel_pin_container'>
       
                <div className="channel_single_pin" >
                               <div className="relative group flex items-center flex-col p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div  className="cursor-pointer hover:drop-shadow-md transition">
        {
            message?.member?.user?.profilePic!==null ? 
            <UserAvatar src={message.member?.user?.profilePic} /> :
            <LetterAvatar 
            name={message?.member?.user.name===undefined ? 'Y':message.member.user.name }
           size={40}
           radius={20}
            /> 
          }
       
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2 ">
            <div className="flex items-center">
              <p  className=" chat_un">
                {!message.member?.user ? "User": message.member?.user?.name}
              </p>
            </div>
          
            <span className=" timestamp">
            {format(new Date(message.createdAt), DATE_FORMAT)}
            </span>
          </div>
          <p className={cn(
              "text-sm text-zinc-200 dark:text-zinc-300",
               " text-zinc-500 dark:text-zinc-400 text-xs mt-1"
            )}>
              {/* {content} */}
              <div dangerouslySetInnerHTML={{__html:message.content}} className="msg_contnt" />
            </p>
       
        </div>


      </div>
     
      
    <div className="w-full mt-2">

               

                
                {
                  message.uploadedFiles.length>0 &&
                  <>
                  {
                   message.uploadedFiles &&  message.uploadedFiles.map((uploaded, i)=>(
                      <SingleMsgFile key={i} file={uploaded} />
                    ))
                  }

                  </> 
                }
            </div>
            </div>
            </div>
      
            
      </div>
  
            </div>

        </div>




        <DialogFooter className='mb-2'>
          {
            loading? <Loader/> : <>
            <Button onClick={() => setOpen(false)} className='' variant={"outline"} autoFocus={false}>Cancel</Button>
          
          <Button type="submit" className='bg-green-600 text-white hover:bg-green-700 px-4' autoFocus={false} onClick={SubmitHandler}>Send </Button></>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
    }
    
    
    
    </>
  )
}

export default ForwardMessage