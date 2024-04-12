import CreateQuestion from '@/app/(pages)/components/Tests/CreateQuestion'
import { db } from '@/prisma'
import { redirect } from 'next/navigation'
import React from 'react'


interface ParamsProps {
    params:{
        id:string,
        testId:string,
        testChannelId:string
    }
}


async function AddQuestion({params}:ParamsProps) {

    const test = await db.test.findFirst({
        where:{
            id:params.testId,
            serverId:params.id,
            testChannelId:params.testChannelId
        }
    });
    if(!test) return redirect(`/servers/${params.id}/test-channel/${params.testChannelId}`);
  return (
    <>
    
    <CreateQuestion testTitle={test.name} testId={test.id}  />
    
    
    </>
  )
}

export default AddQuestion