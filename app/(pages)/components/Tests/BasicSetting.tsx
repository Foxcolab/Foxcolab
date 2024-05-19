import { Test } from '@prisma/client'
import React from 'react'
import { FaInfoCircle } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";


function BasicSetting({test}:{test:Test}) {
  return (
    <>
    <div className='w-full'>
    <span className='d-flex  pt-4 font-semibold gap-2 rounded-md test_info ' ><FaInfoCircle/> Test Info</span>
    <div className="testsidebar">
        <div className='respdnt'>
            <p>RESPONDENTS MONITORING</p>
            <div><span><MdPeopleAlt/> {test.Results.length | 0}</span> Active respondents</div>
        </div>

        <div className="respdnt">
            <div className='test_dex'><VscDebugBreakpointLog/>{test.questions.length | 0} questions has been created.</div>
            <div className="test_dex"><VscDebugBreakpointLog/>Full mark: {test.fullMarks} </div>
            <div className='test_dex'><VscDebugBreakpointLog/>{test.passmarks | 0}% marks required to pass the test.</div>
            <div className='test_dex'><VscDebugBreakpointLog/>{test.time} minutes for complete the test.</div>
            <div className='test_dex'><VscDebugBreakpointLog/>Test created By: @{test.createdUser.user.name}.</div>
            <div className='test_dex'><VscDebugBreakpointLog/>Click activate  button below to start the test.</div>
        </div>
    </div>
    </div>
    
    
    </>
    
  )
}

export default BasicSetting