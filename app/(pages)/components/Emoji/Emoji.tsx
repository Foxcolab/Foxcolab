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

interface EmojiPickerProps {
  serverId:string
  messageId:string
  channelId:string
  type:string
}

export const EmojiPicker = ({
  serverId, messageId , channelId, type
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
      console.log(emoji);
      console.log("CHannel ID",params?.channelId)
      const res = await axios.post(`/api/socket/messages/reaction?serverId=${serverId}&messageId=${messageId}&channelId=${params?.channelId}`, {content:emoji});
      // setOpen(false)
      // router.refresh();
      // const res = await axios.post(`/api/reaction?serverId=${serverId}&messageId=${messageId}&channelId=${channelId}`, {content:emoji});
      console.log(res);
      router.refresh();
      setOpen(false);
      console.log("REFRESH DONNNEEE")
    } catch (error) {
      // setOpen(false)
      console.log(error);
    }
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger 
      
      className={type==="hover"?"":"h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"}
      // className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
      >
      <SmilePlus size={20} />
    
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          theme="dark"
          data={data}
          onEmojiSelect={(emoji: any) => onChangeHandler(emoji.native)}
          skin={1}
          previewPosition="none"
        />
      </PopoverContent>
    </Popover>
  )
}