"use client";

import { Fragment, useRef, ElementRef, useState } from "react";
import { format } from "date-fns";
import { Channel, Later, Member, Message, PinnedPost, User } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import {ChatItem} from "./ChatItem";
import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useChatScroll } from "@/hooks/useChatScroll";
import ChannelDescription from "../Channel/ChannelDescription";
import Conversation from "../Channel/Conversation";
import Dividor from "./Dividor";

const DATE_FORMAT = "d MMM yyyy, HH:mm";
const DATE_FORMAT2 = "d MMM yyyy";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: User
  }
}

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation" | "thread";
    channel:Channel
    PinnedPosts: PinnedPost[];
    mySavedPost: Later[]
    myChannels:Channel[]
    allServerMember:Member[]
    setThreadMessage:any
  }
  
function ChatMessages({ 
  
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
    channel,
    mySavedPost,
    PinnedPosts,
    myChannels,
    allServerMember,
    setThreadMessage
  }: ChatMessagesProps) {
    const [previous, SetPrevious] = useState('');
    const [nextprevious, SetNextPrevious] = useState('');


    const queryKey = `chat:${chatId}`;
    
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;
  const deleteKey = `chat:${chatId}:messages:delete`;
    
    
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useChatQuery({
    queryKey, 
    apiUrl,
    paramKey,
    paramValue,
  });
 
  
  useChatSocket({ queryKey, addKey, updateKey, deleteKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    )
  }


  const CheckDividorTime =(time1:string, time2:string)=>{
    if(time2===undefined)return true;
    time1 = format(new Date(time1), DATE_FORMAT2);
    time2 = format(new Date(time2), DATE_FORMAT2);
    if(time1===time2) return false;
    return true;
  }


  const isAdmin = member.id === channel.createdBy ;
  // console.log(isAdmin);
  const isManager = channel.manager.memberIds.includes(member.id);
  const isMember = channel.memberIds.includes(member.id);
  // console.log("A M MEM",isAdmin, isManager, isMember)
  let whoCanDeleteMessage = false;
  let whoCanPinnedPost = false;

  if(((isAdmin || isManager || isMember) && channel.whoCanDeleteMessage==="member") || ((isManager || isAdmin) && channel.whoCanDeleteMessage==="manager") || (isAdmin && channel.whoCanDeleteMessage==="admin") ){
    whoCanDeleteMessage = true;
  }

  if(((isAdmin || isManager || isMember) && channel.whoCanPinnedPost==="member") || ((isManager || isAdmin) && channel.whoCanPinnedPost==="manager") || (isAdmin && channel.whoCanPinnedPost==="admin") ){
    whoCanPinnedPost = true;
  }
  

  // console.log("Delet Pinn", whoCanDeleteMessage, whoCanPinnedPost)
     


  return (
    <>
   
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage ? <div className="flex-1" /> : '' }
      {!hasNextPage && (
       
        type==="conversation" ? <Conversation otherName={name} />: 
        type==="channel" ? 
        <ChannelDescription
          channel={channel}

        />
        :
        ''
       
        

      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items &&  group.items.map((message:any, j:number) => (
              <>
        {
          message!==null && <>
           <ChatItem
          key={message.id}
          id={message.id}
          currentMember={member}
          member={message.member}
          content={message.content}
          fileUrl={message.fileUrl}
          deleted={message.deleted}
          timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
          isUpdated={message.updatedAt !== message.createdAt}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
          message={message}
          managers={channel?.manager?.memberIds}
          mySavedPost = {mySavedPost}
          PinnedPosts = {PinnedPosts}
          myChannels={myChannels}
          allServerMember={allServerMember}
          setThreadMessage={setThreadMessage}
          schemaType="Channel"
          whoCanPinnedPost={whoCanPinnedPost}
          whoCanDeleteMessage={whoCanDeleteMessage}
        /> 
        {
          CheckDividorTime(message.createdAt, group.items[j+1]?.createdAt)==true && 
        <Dividor timestamp={message.createdAt} nextTime={group.items[j+1]?.createdAt} /> 

        }
         </> 
        }
              

              </>
              
            ))}





          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
    
    
    </>
  )
}

export default ChatMessages