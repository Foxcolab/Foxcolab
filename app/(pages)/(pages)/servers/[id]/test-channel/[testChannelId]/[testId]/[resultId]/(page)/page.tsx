// "use client";
import Questions from '@/app/(pages)/components/Tests/Exam/Questions';
import ResponseContainer from '@/app/(pages)/components/Tests/Response/ResponseContainer';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

interface Props {
    params:{
        id:string;
        testId:string
        resultId:string
    }
}

async function ResultIdPage({params}:Props) {
    
    const profile = await myProfile();
    if(!profile) redirect('/home');
    const server = await getServer(params.id, profile.id)
    // console.log("ID SERVER",server);
    
    if(!server) redirect('/home')

    const test = await db.test.findFirst({
        where:{
            id:params.testId,
            serverId:params.id,
        },
        include:{
            questions:true,
            Results:{
                where:{
                    id:params.resultId
                },
                include:{
                    response:true
                }
            },
            createdUser:{
                include:{
                    user:true
                }
            }
        }
    });
    
    if(!test) redirect(`/servers/${params.id}`);
    const member = await db.member.findFirst({
        where:{
            userId:profile.id
        }
    });
    if(!member) redirect(`/servers/${params.id}}`);

  return (
    <>
    
    {/* <Questions test={test} result={test.Results[0]} /> */}
    <ResponseContainer result={test.Results[0]} questions={test.questions} test={test} />
    
    
    </>
  )
}

export default ResultIdPage