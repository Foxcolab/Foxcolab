"use client";
import { Test, User } from '@prisma/client'
import React from 'react'
import CreateTest from '../CreateTest'
import { IoSearch } from 'react-icons/io5'
import SingleTest from '../SingleTest'
import { useParams } from 'next/navigation';


interface Props {
    tests:Test[]
    sectionId:string
    attemptedTests:Test[]
    whoCanCreateTest:boolean
}

function TestChannelContainer({tests, sectionId, attemptedTests, whoCanCreateTest }:Props) {
    const params = useParams();
  return (
    <>
    
    <div className="canvas_container">
      <div className='cnvs_sch'>
        <button><IoSearch/></button>
        <input type='search' placeholder='Search for tests..' />
      </div>
      <div className='cnvs_sc'>
        <div><b>All Test</b></div>
        {
          whoCanCreateTest && <CreateTest serverId={params?.id as string} testChannelId={params?.testChannelId as string} sectionId={sectionId} />
        }
       
      </div>

      {
        tests.length!==0 && 

        <div className="tstcont">
          {
            tests.map((test:Test)=>(
              <SingleTest Test={test} attemptedTests={attemptedTests}  />
            ))
          }
          </div>
      }


      </div>
    
    </>
  )
}

export default TestChannelContainer