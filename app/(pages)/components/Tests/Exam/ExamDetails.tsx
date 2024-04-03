"use client"
import { Test } from '@prisma/client'
import React, { useState } from 'react'
import { PiHandsPrayingLight } from "react-icons/pi";
import { IoTime } from "react-icons/io5";
import { FaCirclePause } from "react-icons/fa6";
import { TiWiFi } from "react-icons/ti";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Loader from '../../Loaders/Loader';
import { ReloadIcon } from '@radix-ui/react-icons';


function ExamDetails({test}:{test:Test}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useParams();
    const SubmitHandler=async()=>{
        try {
            setLoading(true);
            const res = await axios.post(`/api/test/result/new?serverId=${test.serverId}&sectionId=${test.sectionId}&testId=${test.id}`);
            console.log(res);
            
            if(res.status===200){
                router.push(`/servers/${test.serverId}/test-channel/${params?.testChannelId}/${test.id}/${res.data.resultId}`);
            }
            setLoading(false);

        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className="exam_container">
        <div className='exam_con_left w-1/2'>
            <div className='font-semibold text-4xl item-center text-yellow-300 welcome'>
               <PiHandsPrayingLight/> Welcome
            </div>
            <div className="test_dts">
                <div className='tst_title'>{test.name} </div>
                <div className='test_qs'> {test?.questions?.length} questions, {test.time} minutes</div>

            </div>
            <div className="test_dts text-slate-500 font-semibold text-center" style={{color:"rgb(161, 162, 161)"}}>
                {test.description}
            </div>
        </div>
        <div className='exam_con_right w-1/2'>
            
            <div className='h-5/6 overflow-scroll ex_c_container'>
                <p>INSTRUCTIONS</p>
                <div className="single_ins">
                    <div className='ins_icon'><IoTime/></div>
                    <div>
                        <div className='inst_head'>Test will run for {test.time} minutes</div>
                        <div className='inst_minor'>This is a timed test. At the end of it your responses will be auto saved</div>
                    </div>
                </div>
                <div className="single_ins">
                    <div className='ins_icon'><FaCirclePause/></div>
                    <div>
                        <div className='inst_head'>You cannot pause the test</div>
                        <div className='inst_minor'>Make sure you make time for the test</div>
                    </div>
                </div>
                <div className="single_ins">
                    <div className='ins_icon'><IoCheckmarkCircle/></div>
                    <div>
                        <div className='inst_head'>Pass marks is {test.passmarks}%</div>
                        <div className='inst_minor'>You need {test.passmarks}% marks of {test.fullMarks} to pass the exam</div>
                    </div>
                </div>
                <div className="single_ins">
                    <div className='ins_icon'><TiWiFi/></div>
                    <div>
                        <div className='inst_head'>Make sure you have a stable internet connection</div>
                        <div className='inst_minor'>A stable internet connection is crucial to run this test</div>
                    </div>
                </div>
                <div className="single_ins">
                    <div className='ins_icon'><MdAdminPanelSettings/></div>
                    <div>
                        <div className='inst_head'>Test Admin: {test.createdUser.user.name}</div>
                        <div className='inst_minor'>Test is created by {test.createdUser.user.name}. You can start the test clicking the start button.</div>
                    </div>
                </div>
            </div>
            <div className='h-1/6 ex_lower'>
                {
                    loading ?
                    
                    <button disabled className='d-flex items-center'>
            <ReloadIcon className="mr-2  w-4 animate-spin " />
            Starting..
          </button> 
                    :
                <button onClick={SubmitHandler} >Start test</button>
            }
            </div>
        </div>
    </div>
  )
}

export default ExamDetails