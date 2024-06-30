"use client";

import { Smile, SmilePlus } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
  messageId:string
  type:string
  // schemaType:"channel" | "forum" | "thread"
  schemaType:"Channel" | "Threads" | "DirectMessage" | "forum" | "thread"
  conversationId?: string | null | undefined
  channelId:string
}

export const EmojiPicker = ({
 messageId , type , schemaType, channelId, conversationId
}: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  
  const router = useRouter();
  const params = useParams();
  // const onChangeHandler=async(emoji:any)=>{
  //   setOpen(false);
  //   console.log(emoji);
  //   setContent(emoji);
  //   try {
  //     const res = await axios.post(`/api/reaction?serverId=${serverId}&messageId=${messageId}`, {content:emoji});
  //     // setOpen(false)
  //     router.refresh();
  //   } catch (error) {
  //     setOpen(false)
  //     console.log(error);
  //   }
  // }


  const onChangeHandler=async(emoji:any)=>{
    try {
      console.log("Emoji::", emoji);
      if(schemaType==="Channel"){
        const res = await axios.post(`/api/socket/messages/reaction?serverId=${params?.id}&messageId=${messageId}&channelId=${params?.channelId}`, {content:emoji});
      }else if(schemaType==="DirectMessage"){
        const res = await axios.post(`/api/socket/direct-messages/reaction?serverId=${params?.id}&messageId=${messageId}&conversationId=${conversationId}`, {content:emoji});
      }
      if(schemaType==="forum"){
        const res = await axios.post(`/api/socket/forum-response/reaction?serverId=${params?.id}&forumResponseId=${messageId}&forumId=${channelId}`, {content:emoji});
      }
      
      // setOpen(false)
      // router.refresh();
      // const res = await axios.post(`/api/reaction?serverId=${serverId}&messageId=${messageId}&channelId=${channelId}`, {content:emoji});
      // console.log(res);
      router.refresh();
      setOpen(false);
    } catch (error) {
      // setOpen(false)
      console.log(error);
    }
  }



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger 
      
      className={cn(type==="hover"?"":"h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center", schemaType==="forum" && type!=="hover"  && "flex items-center gap-1 border-none")}
      // className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
      >
      <SmilePlus   size={ schemaType==="forum" && type!=="hover" ? 15 : 20} />
      {schemaType==="forum" && type!=="hover" && " React to Post"}
    
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          theme={resolvedTheme==="dark"? "dark" : "light"}
          data={data}
          onEmojiSelect={(emoji: any) => onChangeHandler(emoji.native)}
          skin={1}
          previewPosition="none"
        />
      </PopoverContent>
    </Popover>
  )
}