"use client";
import { Result } from '@prisma/client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns';
import { usePathname, useRouter } from 'next/navigation';
import { FaInfoCircle } from 'react-icons/fa';


interface Props {
  results:Result[]
  testName:string
  testId:string
}

const DATE_FORMAT = "d MMM yyyy";


function ResultTable({results, testName, testId}:Props) {
  const router = useRouter();
  // submitTime = new Date(submitTime);
  // startingTime = new Date(startingTime);
  // const gethhmm = startingTime.getHours() + ":" + startingTime.getMinutes();
  // const endhhmm = submitTime.getHours() + ":" + submitTime.getMinutes();
  const GetTime =(date:Date)=>{
    date = new Date(date);
    return `${date.getHours()<10 ? '0' + date.getHours() : date.getHours()} : ${date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes()}` 
    }
    const pathName = usePathname();
    console.log(pathName);


    const HrefHandler=(id:string)=>{
      console.log(id);
      router.push(`${testId}/${id}/view`);
    }

  return (
    <>
    <div className='w-full'>
    <span className='d-flex pt-4 font-semibold gap-2 rounded-md test_info' ><FaInfoCircle/> {testName}</span>
    <div className="testsidebar">
            <Table className='result_table'>
  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
  <TableHeader>
    <TableRow >
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
        <TableRow key={result.id}  onClick={()=>HrefHandler(result.id)}>
          <TableCell>{i+1}</TableCell>
          <TableCell>{result.name}</TableCell>
          <TableCell>{Math.floor((result.obtainMarks/result.fullMarks)*100)}% {result.obtainMarks}/{result.fullMarks}</TableCell>
          <TableCell>{format(new Date(result.createdAt), DATE_FORMAT)}</TableCell>
          <TableCell>{GetTime(result.createdAt)}</TableCell>
          <TableCell>{GetTime(result.submitTime as Date)}</TableCell>
        
        </TableRow>
        </>
      ))
    }
  </TableBody>
          </Table>

          </div>
        </div>


    </>
  )
}

export default ResultTable