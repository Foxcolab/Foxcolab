"use client";

import { ModalType, useModal } from "@/hooks/modal";
import { 
  Channel,
  Type, 
  MemberRole,
  Server
} from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { cn } from "@/lib/cn";
import { ActionTooltip } from "../tooolkit/Toolkit";
import { IoIosLock } from "react-icons/io";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}



export const SingleChannel = ({channel,server,role}: ServerChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  // console.log(params.id);
  const pathname  =usePathname();
  
  const onClick = () => {
    router.push(`/servers/${params?.id}/channels/${channel.id}`)
  }

  return (
    <>
    
    <button onClick={onClick} className={params?.channelId===channel.id?"ch_btnn activeBg":"ch_btnn"} >
        <span># {channel.name}</span>
        <span> {channel.type==="private"?<IoIosLock/>: '' } </span>

    </button>
    
    
    </>
  )
}

export default SingleChannel