"use client";
import { Member, Test, User } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
interface Props {
    Test:Test,
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";

function SingleTest({Test}:Props) {

    
    const params = useParams();

  return (
    <>



   <Link href={`/servers/${params?.id}/test-channel/${params?.testChannelId}/${Test.id}`}>

   <div className="single_test">
        <div className='test_title'>{Test.name}</div>
        <div className='tst_description'>
            {Test.description}
        </div>
        <div className='test_CreatedBy'>
            {Test.createdUser.user.name} 
        </div>
        <div className='tst_dpt'>Full Marks: {Test?.fullMarks }</div>
        <div className='tst_dpt'>Total Question: {Test?.questions?.length | 0}</div>
        <div className='tst_dpt'>Total Response: {Test?.totalResponse}</div>
        <div className='tst_dpt'>CreatedAt: {format(new Date(Test.createdAt), DATE_FORMAT)}
        <div className='level'>Level: <span className={Test.level==="easy" ? "text-green-500" : Test.level==="medium" ? "text-amber-500" : "text-rose-600" }>{Test.level}</span></div>
        </div>
    </div>
   </Link>
    
    
    
    </>
  )
}

export default SingleTest