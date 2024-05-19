"use client";

import { 
  Spreadsheets
} from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";

import { IoIosLock } from "react-icons/io";
import { BiSolidSpreadsheet } from "react-icons/bi";

interface ServerChannelProps {
    spreadsheet:Spreadsheets
}



export const SingleSpreadsheet = ({spreadsheet}: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();
  
  const onClick = () => {
    router.push(`/servers/${params?.id}/spreadsheet/${spreadsheet.id}`)
  }

  return (
    <>
    
    <button onClick={onClick} className={params?.channelId===spreadsheet.id?"ch_btnn activeBg":"ch_btnn"} >
        <span> <span  className='text-lg'><BiSolidSpreadsheet /> </span> <span className="overflow_hidden">{spreadsheet.name}</span> </span>
        <span> {spreadsheet.type==="private"?<IoIosLock/>: '' } </span>

    </button>
    
    
    </>
  )
}

export default SingleSpreadsheet