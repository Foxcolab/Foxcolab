import UpdateQuestion from '@/app/(pages)/components/Tests/TestChannel/Question/UpdateQuestion';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

interface ParamsProps {
  params:{
      id:string,
      testId:string,
      testChannelId:string
      questionId:string
  }
}

async function UpdateQuestionPage({params}:ParamsProps) {

  const test = await db.test.findFirst({
    where:{
        id:params.testId,
        serverId:params.id,
        testChannelId:params.testChannelId
    }
});
if(!test) return redirect(`/servers/${params.id}/test-channel/${params.testChannelId}`);

  const question = await db.question.findFirst({
    where:{
      id:params.questionId,
      testId:params.testId,
      testChannelId:params.testChannelId
    }
  });
if(!question) return redirect(`/servers/${params.id}/test-channel/${params.testChannelId}/${test.id}`);


  return (
    <>
    

    <UpdateQuestion  testId={test.id} testTitle={test.name} question={question} />
    
    
    
    </>
  )
}

export default UpdateQuestionPage