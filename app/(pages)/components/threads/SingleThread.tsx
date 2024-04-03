"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { Member, MemberRole, User } from "@prisma/client";
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
import Message from "@/app/(pages)/components/Chat/Hover/HoverMessage"
import MsgFile from "../Chat/MsgFile";


interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    user: User;
  };
  timestamp: string;
  fileUrl: string[]
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
};

const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const SingleThread = ({
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
}: ChatItemProps) => {
  
  
  const [isEditing, setIsEditing] = useState(false);
  // const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

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

  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [content]);

  // const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.admin;
  const isModerator = currentMember.role === MemberRole.moderator;
  const isOwner = currentMember.id === member?.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
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
  return (

    <>
    
    <div className="relative group flex items-center  p-4 transition w-full msg_cnbdy">
      <div className="group flex gap-x-2 items-start w-full">
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
       
      </div>
      <div className="all_imgs">
              {fileUrl?.length!==0 && 
              
             fileUrl &&  fileUrl.map((file, i)=>(
                <>
                <MsgFile fileUrl={file} key={i} length={length} type="msgFile" />

                </>
              ))
              
              }
            </div>            
            
    </div>
    </div>
    </>
  
 






  )
}