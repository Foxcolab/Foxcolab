"use client";
import { useChatQuery } from '@/hooks/useChatQuery';
import { useChatScroll } from '@/hooks/useChatScroll';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ForumManager, ForumResponse, Forums, Member } from '@prisma/client';
import { Loader2, ServerCrash } from 'lucide-react';
import React, { ElementRef, Fragment, useRef } from 'react'
import Dividor from '../../Chat/Dividor';
import { format } from 'date-fns';
import SingleForumResponse from './SingleForumResponse';
import ForumHeader from '../ForumHeader';
import ForumResponseHeader from './ForumResponseHeader';
import Dividor2 from './Dividor2';

const DATE_FORMAT = "d MMM yyyy, HH:mm";
const DATE_FORMAT2 = "d MMM yyyy";


interface Props {
    member:Member
    chatId:string
    apiUrl:string
    socketUrl:string
    socketQuery:Record<string,string>
    paramKey:"forumId"
    paramValue:string
    ManagerIds:string[]
    forum:Forums
    // whoCanDelete:boolean
}

function ForumMessages({
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    ManagerIds,
    forum ,
    
    // whoCanDelete
    
}:Props) {
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


  return (
    <>
    <div className="forum_messages">
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage ? <div className="flex-1" /> : '' }

    {
        !hasNextPage && 
        <ForumResponseHeader forums={forum} />
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
              Load previous comments
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
   
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items &&  group.items.map((forumResponse:any, j:number) => (
              <>
            
            <SingleForumResponse  
            id={forumResponse.id}
            forumResponse={forumResponse}
            member={forumResponse.member}
            timestamp={format(new Date(forumResponse.createdAt), DATE_FORMAT)}
            fileUrl={forumResponse.fileUrl}
            content={forumResponse.content}
            deleted={forumResponse.deleted}
            currentMember={member}
            isUpdated={forumResponse.updatedAt !== forumResponse.createdAt}
            socketUrl={socketUrl}
            socketQuery={socketQuery}
            managers={ManagerIds}
            index={j}
            totallength={group.items.length}
            forumId={forum.id}
            Reactions={forumResponse.Reactions}
            // canDelete={canDelete}
            />
         {
          CheckDividorTime(forumResponse.createdAt, group.items[j+1]?.createdAt)==true && 
        <Dividor2 timeStamp={forumResponse.createdAt}  /> 

        }

              </>
              
            ))}





          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>   
    </div>
    
    </>
  )
}

export default ForumMessages