"use client";

import { 
  Channel,
} from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { cn } from "@/lib/cn";
import { ActionTooltip } from "../../tooolkit/Toolkit";
import { IoIosLock } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";

interface ServerChannelProps {
  channel: Channel;
}



export const SingleChannel = ({channel}: ServerChannelProps) => {

  const params = useParams();
  const router = useRouter();
  
  const onClick = () => {
    router.push(`/servers/${params?.id}/channels/${channel.id}`)
  }

  return (
    <>
    
    <button onClick={onClick} className={params?.channelId===channel.id?"ch_btnn activeBg":"ch_btnn"} >
        <span className="overflow_hidden"> <span  className='text-lg'><FaHashtag /> </span> <span className="overflow_hidden">{channel.name}</span> </span>
        <span> {channel.type==="private"?<IoIosLock/>: '' } </span>

    </button>
    
    
    </>
  )
}

export default SingleChannel