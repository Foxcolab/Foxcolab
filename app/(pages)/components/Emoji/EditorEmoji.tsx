"use client";

import { Smile, SmilePlus } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { useTheme } from "next-themes";

  interface EmojiPickerProps {
    onChange: (value: string) => void;
    emojiDialog:boolean
    setEmojiDialog:any
  }
function EditorEmoji({onChange, emojiDialog, setEmojiDialog}:EmojiPickerProps) {
    const { resolvedTheme } = useTheme();

  return (
    <>
     <Popover open={emojiDialog} onOpenChange={setEmojiDialog}>
     <PopoverTrigger 
      
      className={"h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"}
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
          onEmojiSelect={(emoji: any) => onChange(emoji.native) }
          skin={1}
        />
      </PopoverContent>
    </Popover>
    
    </>
  )
}

export default EditorEmoji