import React from 'react'
import {MdDashboardCustomize} from "react-icons/md"
import CreateQuestion from './CreateQuestion'
import { Question } from '@prisma/client'
import SingleQuestion from './SingleQuestion'
import { useParams } from 'next/navigation'

interface Props {
    questions:Question[]
  }
  
function QuestionManager({questions}:Props) {
  const params = useParams();
  return (
    <>
        <div className='w-full'>
            <div className='q_mangr'>
            <span className='d-flex w-1/6 pt-4 font-semibold gap-2 rounded-md' style={{color:"rgb(224, 224, 224)"}}><MdDashboardCustomize /> Question Manager</span>
            <CreateQuestion  />
            </div>
   
    <div className="testsidebar">
        {questions && questions.map((question, index)=>(
          <SingleQuestion question={question} index={index+1}  />
        ))}
    </div>
    </div>
    
    </>
  )
}

export default QuestionManager