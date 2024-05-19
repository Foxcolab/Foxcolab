"use client";
import { 
  ForumsChannel,
} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { IoIosLock } from "react-icons/io";
import { MdForum } from "react-icons/md";

interface ServerChannelProps {
  forum:ForumsChannel
}



export const SingleForums = ({forum}: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();
  
  const onClick = () => {
    router.push(`/servers/${params?.id}/forum/${forum.id}`)
  }

  return (
    <>
    
    <button onClick={onClick} className={params?.channelId===forum.id?"ch_btnn activeBg":"ch_btnn"} >
        <span> <span  className='text-lg'><MdForum /> </span> <span className="overflow_hidden">{forum.name}</span> </span>
        <span> {forum.type==="private"?<IoIosLock/>: '' } </span>

    </button>
    
    
    </>
  )
}

export default SingleForums