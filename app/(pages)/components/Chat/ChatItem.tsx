"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { Channel, Later, Member, MemberRole, Message, PinnedPost, Reaction, UploadedFile, User } from "@prisma/client";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { UserAvatar } from "@/app/(pages)/components/UserAvatar/UserAvatar";
import { ActionTooltip } from "@/app/(pages)/components/tooolkit/Toolkit";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
// import { useModal } from "@/hooks/use-modal-store";

import LetteredAvatar from "react-lettered-avatar";
import MessageHover from "@/app/(pages)/components/Chat/Hover/HoverMessage"
import MsgFile from "./MsgFile";
import { EmojiPicker } from "../Emoji/Emoji";
import { AiFillMessage } from "react-icons/ai";
import ThreadCom from "../threads/ThreadCom";
import EditMessageEditor from "../Editor/EditorFooter/EditMessageEditor";
import {  TbPinnedFilled } from "react-icons/tb";
import { BsBookmarkFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaLock } from "react-icons/fa";
import { format } from "date-fns";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    user: User;
  };
  timestamp: string;
  fileUrl: UploadedFile[];
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  message:Message;
  managers:String[]
  PinnedPosts: PinnedPost[];
  mySavedPost: Later[]
  myChannels:Channel[]
  allServerMember:Member[]
  setThreadMessage:any
  schemaType:"Channel" | "Threads"
  whoCanDeleteMessage:boolean
  whoCanPinnedPost:boolean
};



const DATE_FORMAT = "d MMM yyyy, HH:mm";



const roleIconMap = {
  "guest": null,
  "moderator": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  "admin": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
  "user": <ShieldAlert className="h-4 w-4 ml-2 text-yellow-500" />,

}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
  message,
  managers,
  PinnedPosts,
    mySavedPost ,
    myChannels,
    allServerMember,
    setThreadMessage,
    schemaType,
    whoCanPinnedPost,
    whoCanDeleteMessage
    
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  // const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  // console.log(message);
  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }
  
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keyDown", handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      content: content
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   form.reset({
  //     content: content,
  //   })
  // }, [content]);

  
  // const fileType = fileUrl![0]?.split(".").pop();
  const forwardedMsg:Message = message.forwardedMessage;
  const isAdmin = currentMember.role === MemberRole.admin;
  const isModerator = currentMember.role === MemberRole.moderator;
  const isOwner = currentMember.id === member?.id;
   const isManager = managers?.some(m => m === member?.id);
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner || isManager);
  // const canEditMessage = !deleted && isOwner && !fileUrl;
  // const isPDF = fileType === "pdf" && fileUrl;
  // const isImage = !isPDF && fileUrl;
  const arrayWithColors = [
    '#2ecc71',
    '#3498db',
    '#8e44ad',
    '#e67e22',
    '#e74c3c',
    '#1abc9c',
    '#2c3e50'
];

const length = fileUrl?.length;

let isPinnedPost=false;
let pinnedPost;
let pinnedPostUser;
PinnedPosts && PinnedPosts.forEach(p => {
  if(schemaType==="Threads"){
    if(p.threadId===id){
      isPinnedPost=true;
      pinnedPost=p;
      // pinnedPostUser=p.user;
    }
  }else {
    if(p.messageId===message.id){
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
  }else {
    if(p.messageId===message.id){
      isSavedPost=true;
      savedPost=p;
    }
  }
  })


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
    


  return (

    <>

    <div  className={isEditing? "relative group flex items-center py-2 px-4 my-2 transition w-full msg_cnbdy ": "relative group flex items-center p-2 mb-2  transition w-full msg_cnbdy"}
    id={(isPinnedPost && isSavedPost)  ? "pinnedMsgBody": isSavedPost && !isPinnedPost ? "savedMsgBody" :  isPinnedPost && !isSavedPost ?"pinnedMsgBody":  ""}
    
    >
    <MessageHover message={message} currentMember={currentMember} socketUrl={socketUrl} socketQuery={socketQuery} setIsEditing={setIsEditing} isPinnedPost={isPinnedPost} isSavedPost={isSavedPost} pinnedPost={pinnedPost} savedPost={savedPost} myChannels={myChannels} allServerMember={allServerMember} setThreadMessage={setThreadMessage} schemaType={schemaType} whoCanPinnedPost={whoCanPinnedPost} whoCanDeleteMessage={whoCanDeleteMessage}  >
    
    <div className="w-full">
    

    {
      isPinnedPost && isSavedPost ?  <p className="text-xs pb-2 text-yellow-700 flex items-center"><TbPinnedFilled/> Pinned By <b> &nbsp;{pinnedPost?.createdUser?.user?.name}</b></p> : isPinnedPost && !isSavedPost ?  <p className="text-xs pb-2 text-yellow-700 flex items-center"><TbPinnedFilled/> Pinned By <b> &nbsp;{pinnedPost?.createdUser?.user?.name}</b></p> : isSavedPost && !isPinnedPost ? <p className="text-xs pb-2 text-green-600 flex items-center"><BsBookmarkFill/> Saved for later  {CalcTime(savedPost?.time)} </p>  : ''
    }

   
      <div className="group flex gap-x-2 items-start w-full ">

        <div onClick={onMemberClick} className="cursor-pointer hover:drop-shadow-md transition">

          {
            (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
            <LetteredAvatar 
            name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name }
           size={40}
            backgroundColors={arrayWithColors}
            /> : 
          <UserAvatar src={member.user.profilePic} />

          }
       


        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2 ">
            <div className="flex items-center">
              <p onClick={onMemberClick} className=" chat_un">
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

          {


            isEditing===true ? 
           <div className="edit_messageEditor">
            {
              schemaType==="Threads" ?<EditMessageEditor  
              name={content}
              type="thread"
              apiUrl={`/api/socket/threads/update/${message.id}`}
            
              query={{
                channelId: message.channelId,
                serverId: message.serverId,
                threadId: message.id
              }}
              setisEditing={setIsEditing}
              
              /> :
              <EditMessageEditor  
            name={content}
            type="channel"
            apiUrl={`/api/socket/messages/update/${message.id}`}
            query={{
              channelId: message.channelId,
              serverId: message.serverId,
              sectionId: message.sectionId
            }}
            setisEditing={setIsEditing}
            
            />

            }
          
          
           </div>
           
            
            
            :
            <>
          <p className={cn(
              "text-sm text-zinc-200 dark:text-zinc-300",
              deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
            )}>
              {/* {content} */}
              <div dangerouslySetInnerHTML={{__html:content}} className="msg_contnt" />
              {isUpdated && !deleted && (
                <span className="text-[12px] mx-0 text-zinc-400 ">
                  (edited)
                </span>
              )}
            </p>


            {
              message.forwardedMessageId &&           
                <div className="msg_main_forwarded_container">
              <div className="forwarded_msg_body">

            
              <div onClick={onMemberClick} className="cursor-pointer hover:drop-shadow-md transition">
  
          {
     (message?.forwardedMessage.member===undefined || message?.forwardedMessage.member.user===undefined || message?.forwardedMessage?.member?.user?.profilePic===null) ? 
           <LetteredAvatar 
               name={(message?.forwardedMessage?.member===undefined || message?.forwardedMessage?.member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name }
               size={40}
               backgroundColors={arrayWithColors}
           /> : 
            <UserAvatar src={message?.forwardedMessage?.member.user.profilePic} />
  
          }
  
  
  
  </div>
  <div className="flex flex-col w-full">
  <div className="flex items-center gap-x-2 ">
    <div className="flex items-center">
      <p onClick={onMemberClick} className=" chat_un">
        {!message?.forwardedMessage?.member?.user ? "User": message?.forwardedMessage?.member?.user.name}
      </p>
      {/* <ActionTooltip label={member.role}>
        {roleIconMap[member?.role] || "user"}
      </ActionTooltip> */}
    </div>
    
  </div>
  
  <p className={cn(
                "text-sm text-zinc-200 dark:text-zinc-300",
                deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}>
                {/* {content} */}
                <div dangerouslySetInnerHTML={{__html:message?.forwardedMessage?.content}} className="msg_contnt" />
                {isUpdated && !deleted && (
                  <span className="text-[12px] mx-0 text-zinc-400 ">
                    (edited)
                  </span>
                )}
              </p>
  
              </div>
              </div>
              <div className="">
             
             <MsgFile files={fileUrl} />

              


            </div> 
            <div className="posted_tag_forw">
              posted in {message?.forwardedMessage?.channel?.type==="public"? "#": <FaLock/>} {message?.forwardedMessage?.channel?.name} | 

              {format(new Date(message.forwardedMessage.createdAt), DATE_FORMAT)}
              
            </div>
              </div>
            }








            <div className="all_imgs">
             <MsgFile files={fileUrl}  />
              
            </div>            
            
            </>


          }
         


      
          {!fileUrl && !isEditing && (
            <p className={cn(
              "text-sm text-zinc-200 dark:text-zinc-300",
              deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
            )}>
              {/* {content} */}
              <div dangerouslySetInnerHTML={{__html:content}} className="msg_contnt" />
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form 
                className="flex items-center w-full gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              disabled={isLoading}
                              className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                              placeholder="Edited message"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button disabled={isLoading} size="sm" variant="primary">
                    Save
                  </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>

        </div>
        {
          message.threads?.length>0 ?
          
            <button className="reply_count" onClick={()=>setThreadMessage(message)}><AiFillMessage/> {message.threads?.length} Reply</button>
       

          : ''
        }

      
      <div className="show_all_emoji">
        {message.Reactions!==undefined ? 
        message.Reactions.length!==0 ?
        <>
        {message.Reactions.map((reaction:Reaction, i:number)=>
        <div key={i}>
          {reaction.content}
           </div>
        )}
        <div className="show_emoji_picker"><EmojiPicker serverId={message.serverId as string} messageId={message.id} shemaType="channel" channelId={message.channelId}  /></div>
        </>
        
        : ''

        : "" }
      </div>
      </div>
      </MessageHover>
  
    </div>

   

    </>






  )
}