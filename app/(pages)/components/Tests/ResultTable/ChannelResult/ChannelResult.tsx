import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Result } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

interface Props {
    results:Result[]
}

const DATE_FORMAT = "d MMM yyyy";


function ChannelResult({results}:Props) {
    const router = useRouter();
    const [ids, setIds] = useState<string[]>();


    // const onChangeHandler =(id:string)=>{

    // }

    const GetTime =(date:Date)=>{
        date = new Date(date);
        return `${date.getHours()<10 ? `0${date.getHours()}`: date.getHours()} : ${date.getMinutes()<10 ? `0${date.getMinutes()}`: date.getMinutes()}`
    }


    const HrefHandler=(result:Result)=>{
        // console.log(id);
        router.push(`${result.testChannelId}/${result.testId}/${result.id}/view`);
      }


  return (
    <>
     <div className='my-4 font-bold text-gray-300 decoration-underline'>My Results</div>
    <div className="test_chann_res">
   
    <Table className='result_table'>
  <TableCaption>My Results</TableCaption>
  <TableHeader>
    <TableRow >
      {/* <TableHead className=""><input type="checkbox" value={"all"} onChange={()=>onChangeHandler("all")} /></TableHead> */}
      <TableHead className="">Id</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Obtain Marks</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="">Starting Time</TableHead>
      <TableHead className="">Ending Time</TableHead>
     
      
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      results && results.map((result:Result, i)=>(
        <>
        {console.log(result.obtainMarks, result.fullMarks, (result.obtainMarks/result.fullMarks))}
        <TableRow key={result.id}  >
          {/* <TableCell><input type="checkbox" /></TableCell> */}
          <TableCell onClick={()=>HrefHandler(result)}>{i+1}</TableCell>
          <TableCell onClick={()=>HrefHandler(result)}>{result.name}</TableCell>
          <TableCell onClick={()=>HrefHandler(result)}>{Math.floor((result.obtainMarks/result.fullMarks)*100)}% {result.obtainMarks}/{result.fullMarks}</TableCell>
          <TableCell onClick={()=>HrefHandler(result)}>{format(new Date(result.createdAt), DATE_FORMAT)}</TableCell>
          <TableCell onClick={()=>HrefHandler(result)}>{GetTime(result.createdAt)}</TableCell>
          <TableCell onClick={()=>HrefHandler(result)}>{GetTime(result.submitTime as Date)}</TableCell>
        
        </TableRow>
        </>
      ))
    }
  </TableBody>
    </Table>    
    </div>
    
    </>
  )
}

export default ChannelResult