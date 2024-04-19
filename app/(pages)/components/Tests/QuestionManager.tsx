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
            <span className='d-flex w-1/6 pt-4 font-semibold gap-2 rounded-md test_info'><MdDashboardCustomize /> Question Manager</span>
            <button className='cnvs_cnote' onDoubleClick={hrefHandler}><FaPlusCircle/> Create Question</button>
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