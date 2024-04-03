import ResultComponents from '@/app/(pages)/components/Tests/Result/ResultComponents';
import { getMyserver, myProfile } from '@/lib/db/profile'
import { db } from '@/prisma';
import { Result } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'
interface Props {
  params:{
    id:string
    testChannelId:string
    resultId:string
    testId:string
  }
}

async function ViewPage({params}:Props) {
  const user = await myProfile();
  if(!user) return redirect(`/home`);

  console.log("JJHJSHSHSDHSDSDSD")
  const server = await getMyserver();
  if(!server) return redirect(`/home`);
  const testChannel = await db.testChannel.findFirst({
    where:{
      id:params.testChannelId,
      serverId:params.id,
      Members:{
        some:{
          userId:user.id
        }
      },
      Results:{
        some:{
          id:params.resultId
        }
      }
      
    },
  });
  if(!testChannel) return redirect(`/servers/${params.id}`);

  const test = await db.test.findFirst({
    where:{
      id:params.testId,
      serverId:params.id,
      testChannelId:params.testChannelId
    },
    include:{
      questions:true
    }
  });
  if(!test) return redirect(`/servers/${params.id}/test-channel/${params.testChannelId}`);

  const result = await db.result.findFirst({
    where:{
      id:params.resultId,
      serverId:params.id,
      testId:params.testId,
      member:{
        userId:user.id
      }
    },
    include:{
      member:{
        include:{
          user:true
        }
      },
      response:{
        include:{
          question:true
        }
      },
      test:true
    }
  },

  
  )
  if(!result) return redirect(`/servers/${params.id}/test-channel/${params.testChannelId}`);
 



  return (
    <>
    
    <ResultComponents
     result={result} 
     testChannelName={testChannel.name}
     user={result.member?.user}
     test={test}

     />
    
    </>
  )
}

export default ViewPage