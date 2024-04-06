"use client";
import { Result, Test } from '@prisma/client';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaDatabase } from 'react-icons/fa';
import { IoChevronBackOutline, IoSettings } from 'react-icons/io5';
import { MdDashboardCustomize } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import BasicSetting from '../../BasicSetting';
import QuestionManager from '../../QuestionManager';
import UpdateTest from '../../UpdateTest';
import ResultTable from '../../ResultTable/ResultTable';

interface Props{
    test:Test
}
function TestContainer({test}:Props) {
    const [state, setState] = useState("Basic");
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const onHref = ()=>{
        router.push(`/servers/${params?.id}/test-channel/${params?.testChannelId}`);
    }
  return (
    <>
            <div className="testcontainer">
        <div className='d-flex gap-5'>

        <div className='w-1/4'>
          <button onClick={onHref} className='flex items-center bg-white py-2 px-3 font-bold text-gray-600 rounded-sm'> <IoChevronBackOutline/> Back</button>
            
            <div className="testsidebar">
        <button className='sidebutton'>{test.activated===true ? "ACTIVATED" : "SET UP IN PROGRESS"}</button>
            <button className={state==="Basic" ?"active_link":"" } onClick={()=>setState("Basic")} ><IoSettings/> Basic Setting </button>
            <button className={state==="Questions" ?"active_link":"" } onClick={()=>setState("Questions")}><MdDashboardCustomize /> Question Manager</button>
            <button className={state==="Update" ?"active_link":"" } onClick={()=>setState("Update")}><TbEdit/> Update </button>
            <button className={state==="Result" ?"active_link":"" } onClick={()=>setState("Result")}><FaDatabase/> Results </button>
            </div>

        </div>
          
          
          
          {
            state=="Basic" ? <BasicSetting test={test} /> :
            state==="Questions" ? <QuestionManager questions={test?.questions} /> :
            state==="Update" ?
            <UpdateTest test={test} />
            : <ResultTable results={test.Results} testName={test.name} testId={test.id} />
            
          }
            
        </div>
        
    </div>
    
    
    
    </>
  )
}

export default TestContainer