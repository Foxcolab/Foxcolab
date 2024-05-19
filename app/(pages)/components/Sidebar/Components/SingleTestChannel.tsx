"use client";

import { 
  TestChannel
} from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoIosLock } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";

interface ServerChannelProps {
  testChannel:TestChannel
}



export const SingleTestChannel = ({testChannel}: ServerChannelProps) => {

  const params = useParams();
  const router = useRouter();
  
  const onClick = () => {
    router.push(`/servers/${params?.id}/test-channel/${testChannel.id}`)
  }

  return (
    <>
    
    <button onClick={onClick} className={params?.testChannelId===testChannel.id?"ch_btnn activeBg":"ch_btnn"} >
        <span> <span  className='text-lg'><PiExamFill /> </span>  <span className="overflow_hidden">{testChannel.name}</span></span>
        <span> {testChannel.type==="private"?<IoIosLock/>: '' } </span>

    </button>
    
    
    </>
  )
}

export default SingleTestChannel