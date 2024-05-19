"use client";
import { Member, Test, User } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/cn';
import { BsThreeDots } from 'react-icons/bs';
interface Props {
    Test:Test,
    attemptedTests:Test[]
}
const DATE_FORMAT = "dd MMM yyyy";

function SingleTest({Test, attemptedTests}:Props) {

    
    const params = useParams();
    let isAttempted = false;
    for(let i=0; i<attemptedTests.length; i++){
      if(attemptedTests[i].id===Test.id){
        isAttempted=true;
        break;
      }
    }

  return (
    <>



   <Link href={`/servers/${params?.id}/test-channel/${params?.testChannelId}/${Test.id}`}>
   
   <div className={cn("", Test.activated ? "border-green-500 " : "border-gray-400" )}>
    <div className='border single_test'>
    <div className="flex justify-between items-center">
      <div className={cn("text-xs font-bold py-1 px-2 rounded-sm" , Test.activated?"border-green-500 border-solid border text-green-500": "text-violet-500 border-violet-500 border border-solid")}>{Test.activated ? "ACTIVE" : "SET UP IN PROGRESS"}</div>
      <div className='text-xs font-bold text-gray-400'>Created: {format(new Date(Test.createdAt), DATE_FORMAT)}</div>
      </div>
   
        <div className='test_title'>{Test.name}</div>
        <div className='tst_dpt '>
           Created By: <span className='text-green-500'>{Test.createdUser.user.name} </span>
        </div>
        <div className='tst_dpt'>Full Marks: <span className='text-gray-500 dark:text-gray-200'>{Test?.fullMarks }</span> </div>
        <div className='tst_dpt'>Total Question: <span className='text-gray-500 dark:text-gray-200'> {Test?.questions?.length | 0}</span></div>
        <div className='tst_dpt'>Total Response: <span className='text-gray-500 dark:text-gray-200'>{Test?.totalResponse}</span></div>
        <div className='tst_dpt flex justify-between'>
          <div className='flex items-center gap-4'>
          <div>Time: <span className='text-gray-500 dark:text-gray-200'>{Test.time} Minutes</span></div>
         
        </div>
        {
          isAttempted && <div className='text-green-500 border border-green-500  rounded p-1 text-sm'>
            Attempted
          </div>
        }
        <div className='level'>Level: <span className={Test.level==="easy" ? "text-green-500" : Test.level==="medium" ? "text-amber-500" : "text-rose-600" }>{Test.level}</span></div>
        </div>
    </div>
    </div>
   </Link>
    
    
    
    </>
  )
}

export default SingleTest