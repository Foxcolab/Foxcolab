



"use client";

import { Fragment, useRef, ElementRef, useState } from "react";
import { format } from "date-fns";
import { Channel, Member, Message, Server, Threads, User } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useChatScroll } from "@/hooks/useChatScroll";
import ChannelDescription from "../Channel/ChannelDescription";
import Conversation from "../Channel/Conversation";
import {SingleThread} from "./SingleThread";
import { ChatItem } from "../Chat/ChatItem";
// import Dividor from "./Dividor";

const DATE_FORMAT = "d MMM yyyy, HH:mm";
const DATE_FORMAT2 = "d MMM yyyy";

type MessageWithMemberWithProfile = Message & {
  member: Threads & {
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
    paramKey: "channelId" | "conversationId" | 'forumId';
    paramValue: string;
    type: "channel" | "conversation" | "thread" | "forums";
    channel:Channel
    serve:Server
  }
  
function ThreadChatComponents({ 
   
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
    channel,
    server
  }: ChatMessagesProps) {
    const [previous, SetPrevious] = useState('');
    const [nextprevious, SetNextPrevious] = useState('');


    const queryKey = `chat:${chatId}`;
    
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update` 
  const deleteKey = `chat:${chatId}:messages:delete`;
    
    
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);


    const mySavedPosts = member.saveLater;
    const PinnedPosts = channel.pinnedPost;
  
    const serverMember = server.Members.filter(mem=>mem.id!==member.id);
   
    const channelMemberExceptMe = channel.Members.filter(mem=>mem.id!==member.id)




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


     


  return (
    <>
   
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage ? <div className="flex-1" /> : '' }
      
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
            {console.log("GROUPS", group)}
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <>
               
              <ChatItem
              key={message.id}
              id={message.id}
              currentMember={member}
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

              
              
              
              />
               
              {/* <SingleThread 
              key={message.id}
              id={message.id}
              content={message.content}
              member={message.member}
              timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
              deleted={message.deleted}
              fileUrl={message.fileUrl}
              currentMember={member}
              socketUrl={socketUrl}
              socketQuery={socketQuery}
              isUpdated={message.updatedAt !== message.createdAt}

              
              /> */}
    {/* <ChatItem
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
              />  */}



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

export default ThreadChatComponents



