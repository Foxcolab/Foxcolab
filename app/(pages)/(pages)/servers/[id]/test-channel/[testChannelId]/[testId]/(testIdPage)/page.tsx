import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar';
import BasicSetting from '@/app/(pages)/components/Tests/BasicSetting';
import ExamDetails from '@/app/(pages)/components/Tests/Exam/ExamDetails';
import TestContainer from '@/app/(pages)/components/Tests/Test/Container/TestContainer';
import TestSidebar from '@/app/(pages)/components/Tests/TestSidebar';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { IoChevronBackOutline } from "react-icons/io5";


interface ParamsProps {
    params:{
        id:string,
        testId:string,
        testChannelId:string
    }
}

async function TestIdPage({params}:ParamsProps) {
    const profile = await myProfile();
    if(!profile) redirect('/home');
    

    const test = await db.test.findFirst({
        where:{
            id:params.testId,
            serverId:params.id,
            testChannelId:params.testChannelId
        },
        include:{
            questions:true,
            Results:{
                where:{
                    submitted:true
                },
                orderBy:{
                    submitTime:"desc"
                }
            },
            createdUser:{
                include:{
                    user:true
                }
            }
        }
    });
    
    if(!test) redirect(`/servers/${params.id}/test-channel/${params.testChannelId}`);
    const member = await db.member.findFirst({
        where:{
            userId:profile.id,
            serverId:test.serverId
        },
        include:{
            user:true
        }
    });
    if(!member) redirect(`/servers/${params.id}/test-channel/${params.testChannelId}`);
    // console.log()

    // const isAdmin = test.createdBy ===member.id;
    const isAdmin = false;


  return (
    <>
    
    {
        isAdmin ?
        
        <TestContainer test={test} />

    : 

        <ExamDetails  test={test} />



    }
    
    
    </>
  )
}

export default TestIdPage