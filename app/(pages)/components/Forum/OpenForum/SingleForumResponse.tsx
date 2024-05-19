import { ForumResponse, Member, MemberRole, Message, Reaction, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go';
import { useRouter, useParams } from "next/navigation";
import { useForm } from 'react-hook-form';
import qs from "query-string";
import * as z from "zod";
import axios from "axios";
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import LetterAvatar from '../../UserAvatar/LetterAvatar';
import EditMessageEditor from '../../Editor/EditorFooter/EditMessageEditor';
import { cn } from '@/lib/utils';
import MsgFile from '../../Chat/MsgFile';
import { EmojiPicker } from '../../Emoji/Emoji';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import HoverResponse from './Hover/HoverResponse';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from '../../Loaders/Loader';



const formSchema = z.object({
  content: z.string().min(1),
});

interface Props {
  id: string;
  content: string;
  member: Member & {
    user: User;
  };
  timestamp: string;
  fileUrl: string[];
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  forumResponse:ForumResponse
  managers:String[]
  index:number
  totallength:number
  forumId:string
  Reactions:Reaction[]
}


function SingleForumResponse({id, content, member, timestamp, fileUrl, deleted, currentMember, isUpdated, socketUrl, socketQuery, forumResponse, managers, index, totallength, forumId, Reactions}:Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
 
  // const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();


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
      content:content
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

  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [content]);

  
  const Reply:ForumResponse = forumResponse?.repliedResponse;
  // const isAdmin = currentMember.role === MemberRole.admin;
  // const isModerator = currentMember.role === MemberRole.moderator;
  // const isOwner = currentMember.id === member?.id;
  //  const isManager = managers?.some(m => m === member?.id);
  // const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner || isManager);
  // const canEditMessage = !deleted && isOwner && !fileUrl;
  // const isPDF = fileType === "pdf" && fileUrl;
  // const isImage = !isPDF && fileUrl;

  const [loading, setLoading] = useState(false);

  const length = fileUrl?.length;



    

  
  const DeleteHandler=async()=>{
    try {
        // setLoading(true);
        setLoading(true)
        const res = await axios.delete(`/api/socket/forum-response/delete/${forumResponse.id}?forumResponseId=${forumResponse.id}&forumId=${forumResponse.forumsId}&forumsChannelId=${forumResponse.forumsChannelId}&serverId=${forumResponse.serverId}`);
        router.refresh();
        setLoading(false);
        setOpen(false);
    } catch (error) {
        console.log(error);
    }
}
  
  const isMsgCreator = currentMember.id === member.id;
  

  
  return (
    <>
 {
    totallength===index+1 && 
    <>



    <div className='forum_response_hr'>

    </div>
    <div className='forum_response_react'>
          <EmojiPicker 
      messageId={id} channelId={forumId} type=''  schemaType='forum'
      /> 
     
    </div>
    </>
   }
  
   <HoverResponse forumResponse={forumResponse} setIsEditing={setIsEditing} setDOpen={setOpen} dOpen={open} isMsgCreator={isMsgCreator} >
   <div  

  
className={cn("relative group flex items-center p-2 mb-2  transition w-full msg_cnbdy",  totallength!==index+1 && "mb-2")}
    
    >
    {/* <MessageHover message={message} currentMember={currentMember} socketUrl={socketUrl} socketQuery={socketQuery} setIsEditing={setIsEditing} isPinnedPost={isPinnedPost} isSavedPost={isSavedPost} pinnedPost={pinnedPost} savedPost={savedPost} myChannels={myChannels} allServerMember={allServerMember} setThreadMessage={setThreadMessage} > */}
    
    <div className="w-full">
    


   
      <div className="group flex gap-x-2 items-start w-full ">

        <div  className="cursor-pointer hover:drop-shadow-md transition">

          {
            (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
            <LetterAvatar
            name={member.user.name || "Y"}
           size={40}
           radius={50}
            /> : 
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

          {


            isEditing===true ? 
           <div className="edit_messageEditor">
          <EditMessageEditor  
            name={content}
            type="forum"
            apiUrl={`/api/socket/forum-response/update/${forumResponse.id}`}
            query={{
              forumId:forumResponse.forumsId,
              forumsChannelId:forumResponse.forumsChannelId,
              serverId: forumResponse.serverId,
              sectionId: forumResponse.sectionId
            }}
            setisEditing={setIsEditing}
            
            />
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
                forumResponse?.uploadedFiles?.length!==0 && 
                <div className="all_imgs">
                  <MsgFile files={forumResponse.uploadedFiles} type="" length={forumResponse.uploadedFiles.length} />
                </div>
              }


                     
            
            </>


          }
         


      

        </div>

        </div>


      
      <div className="show_all_emoji">
        {forumResponse.Reactions!==undefined ? 
        forumResponse.Reactions.length!==0 ?
        <>
        {forumResponse.Reactions.map((reaction:Reaction, i:number)=>
        <div key={i}>
          {reaction.content}
           </div>
        )}
      
        </>
        
        : ''

        : "" }
      </div>
      </div>
      {/* </MessageHover> */}
  
    </div>
    
   </HoverResponse>
    
  
   <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deleting Comment</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p >  Are you sure you want to delete this comment? This action cannot be undone.</p>
        </div>
        <DialogFooter>
         {
          loading ? <Loader/> :
          <>
           <Button onClick={() => setOpen(false)} variant={"outline"} autoFocus={false}>Cancel</Button>
          <Button type="submit" className='bg-red-600 text-white' onClick={DeleteHandler} autoFocus={false}>Delete </Button>
          </>
         }
        </DialogFooter>
      </DialogContent>
    </Dialog>

    </>
  )
}

export default SingleForumResponse