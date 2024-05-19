"use client";
import { Test, User } from '@prisma/client'
import React, { useState } from 'react'
import CreateTest from '../CreateTest'
import { IoSearch } from 'react-icons/io5'
import SingleTest from '../SingleTest'
import { useParams } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox"

interface Props {
    tests:Test[]
    sectionId:string
    attemptedTests:Test[]
    whoCanCreateTest:boolean
    memberId:string
}

function TestChannelContainer({tests, sectionId, attemptedTests, whoCanCreateTest, memberId }:Props) {
    const params = useParams();
    const [testsType, setTestsType] = useState('All Tests');
    const myTests = tests && tests.filter(test=>test.createdBy===memberId);
    const activatedTest = tests && tests.filter(test=>test.activated)

    const HandlerChange =(e:any)=>{
      console.log(e)
      if(e===false){
        setTestsType("My Tests");
      }else {
        setTestsType("All Active Tests");
      }
    }
    
  return (
    <>
    
    <div className="canvas_container">
      <div className='cnvs_sch'>
        <button><IoSearch/></button>
        <input type='search' placeholder='Search for tests..' />
      </div>
      
      <div className='flex items-center gap-1'>
      <Checkbox id="terms" onCheckedChange={HandlerChange} checked={testsType==="All Active Tests"} />
      <div className='cnvs_sc flex justify-between w-full'>
        <div>  <div>   </div> <b>{testsType}</b></div>
        {
          whoCanCreateTest && <CreateTest serverId={params?.id as string} testChannelId={params?.testChannelId as string} sectionId={sectionId} />
        }       
      </div>
      </div>

      {
        tests.length!==0 && 

        <div className="tstcont">
          {
          testsType==="All Active Tests" && activatedTest.map((test:Test)=>(
              <SingleTest Test={test} attemptedTests={attemptedTests} key={test.id} />
            ))
          }
          {
          testsType==="My Tests" && myTests.map((test:Test)=>(
              <SingleTest Test={test} attemptedTests={attemptedTests}  key={test.id} />
            ))
          }
         
          </div>
      }


      </div>
    
    </>
  )
}

export default TestChannelContainer