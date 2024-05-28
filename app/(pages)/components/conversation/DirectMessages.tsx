"use client";
import { useChatQuery } from '@/hooks/useChatQuery';
import { useChatScroll } from '@/hooks/useChatScroll';
import { Channel, Later, Member, PinnedPost, User } from '@prisma/client'
import { Loader2, ServerCrash } from 'lucide-react';
import React, { ElementRef, Fragment, useRef } from 'react'
import Conversation from '../Channel/Conversation';
import Dividor from '../Chat/Dividor';
import { format } from 'date-fns';
import { ChatItem } from '../Chat/ChatItem';
import { useChatSocket } from '@/hooks/useChatSocket';
import Polls from '../Chat/Polls/Polls';
import ChannelForm from '../Chat/form/ChannelForm';

interface Props {
    currentMember:Member & {
        user:User
    }
    otherMember:Member & {
        user:User
    }
    chatId:string
    apiUrl:string
    socketUrl:string
    PinnedPosts: PinnedPost[];
    mySavedPost: Later[]
    setThreadMessage:any
    socketQuery: Record<string, string>;
    myChannels:Channel[]
    allServerMember:Member[]


}

const DATE_FORMAT2 = "d MMM yyyy";
const DATE_FORMAT = "d MMM yyyy, HH:mm";

function DirectMessages({currentMember, otherMember, chatId, apiUrl, socketUrl, PinnedPosts, mySavedPost, setThreadMessage, socketQuery, myChannels, allServerMember}:Props) {

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const queryKey = `chat:${chatId}`;
    
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;
    const deleteKey = `chat:${chatId}:messages:delete`;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useChatQuery({
        queryKey, 
        apiUrl,
        paramKey:"conversationId",
        paramValue:chatId
        ,
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




  return (
    <>
     <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage ? <div className="flex-1" /> : '' }
      {
        !hasNextPage && <Conversation otherName={otherMember.user.name as string} />
      }
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
                message.pollId!==null && message.pollId!==undefined ? 
                
                <>
                
                <Polls
                id={message.id}
                currentMember={currentMember}
                member={message.member}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                poll={message.poll}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                message={message}
                managers={[]}
                mySavedPost = {mySavedPost}
                PinnedPosts = {PinnedPosts}
                myChannels={myChannels}
                allServerMember={allServerMember}
                setThreadMessage={setThreadMessage}
                schemaType="DirectMessage"
                whoCanPinnedPost={true}
                whoCanDeleteMessage={currentMember.id===message.member.id}
            

                />
                 </>
                : 
                message.formId!==null && message.formId!==undefined && message.form!==null && message.form!==undefined ? 
                <>
                <ChannelForm
                id={message.id}
                currentMember={currentMember}
                member={message.member}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                form={message.form}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                message={message}
                mySavedPost = {mySavedPost}
                PinnedPosts = {PinnedPosts}
                myChannels={myChannels}
                allServerMember={allServerMember}
                setThreadMessage={setThreadMessage}
                schemaType="DirectMessage"
                whoCanPinnedPost={true}
                whoCanDeleteMessage={currentMember.id===message.member.id} 
                managers={[]}
    
                />
                </>
                :
                <>
                <ChatItem
          key={message.id}
          id={message.id}
          currentMember={currentMember}
          member={message.member}
          content={message.content}
          fileUrl={message.uploadedFiles}
          deleted={message.deleted}
          timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
          isUpdated={message.updatedAt !== message.createdAt}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
          message={message}
          mySavedPost = {mySavedPost}
          PinnedPosts = {PinnedPosts}
          myChannels={myChannels}
          allServerMember={allServerMember}
          setThreadMessage={setThreadMessage}
          schemaType="DirectMessage"
          whoCanPinnedPost={true}
          whoCanDeleteMessage={currentMember.id===message.member.id}
        /> 
                </>
              }
        {
          message!==null && <>
           
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

export default DirectMessages