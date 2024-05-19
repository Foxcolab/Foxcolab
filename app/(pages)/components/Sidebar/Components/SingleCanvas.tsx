"use client";

import { 
  Canvas
} from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoIosLock } from "react-icons/io";
import { FaNoteSticky } from "react-icons/fa6";

interface ServerChannelProps {
  canvas: Canvas;
}



export const SingleCanvas = ({canvas}: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();
  // console.log(params.id);
  const pathname  =usePathname();
  
  const onClick = () => {
    router.push(`/servers/${params?.id}/canvas/${canvas.id}`)
  }

  return (
    <>
    
    <button onClick={onClick} className={params?.canvasId===canvas.id?"ch_btnn activeBg":"ch_btnn"} >
        <span> <span  className='text-lg'><FaNoteSticky /> </span> <span className="overflow_hidden">{canvas.title}</span> </span>
        <span> {canvas.type==="private"?<IoIosLock/>: '' } </span>

    </button>
    
    
    </>
  )
}

export default SingleCanvas