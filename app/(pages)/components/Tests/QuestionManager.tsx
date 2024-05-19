import React from 'react'
import {MdDashboardCustomize} from "react-icons/md"
import CreateQuestion from './CreateQuestion'
import { Question } from '@prisma/client'
import SingleQuestion from './SingleQuestion'
import { useParams, useRouter } from 'next/navigation'
import { FaPlusCircle } from 'react-icons/fa'

interface Props {
    questions:Question[]
    testId:string
  }
  
function QuestionManager({questions, testId}:Props) {
  const params = useParams();
  const router = useRouter();
  const hrefHandler =()=>{
    router.push(`${testId}/add-question`);
  }

  return (
    <>
        <div className='w-full'>
            <div className='q_mangr'>
              <div className='flex items-center justify-center'>
              <span className='d-flex font-semibold gap-2 rounded-md test_info'><MdDashboardCustomize /> Question Manager</span>
              </div>
            
            <div className='flex items-center justify-center'>
            <button className='cnvs_cnote' onDoubleClick={hrefHandler}><FaPlusCircle/> Create Question</button>
              </div>
            {/* <CreateQuestion  /> */}
            </div>
   
    <div className="testsidebar">
        {questions && questions.map((question, index)=>(
          <SingleQuestion question={question} index={index+1} key={index}  />
        ))}
    </div>
    </div>
    
    </>
  )
}

export default QuestionManager