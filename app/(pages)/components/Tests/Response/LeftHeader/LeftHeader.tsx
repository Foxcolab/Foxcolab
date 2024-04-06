import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Question } from '@prisma/client'
import { ModeToggle } from '../../../mode-toggle/Toggle'

interface Props {
    testName:string
    qIndex:number
    questions:Question[]
    length:number
    ChangeQuestion:any
    questionId:string
    answer:string[]
}
function LeftHeader({testName, qIndex, questions, length, ChangeQuestion, questionId, answer}:Props) {
  return (
    <>
    
    <div className="question_l_header">
            <div className='qtest_name'>{testName}  <ModeToggle/> </div>
          
          <div className="second_header">
            <div className='q_index'>Question {qIndex+1} of {length} </div>
            <div className='index_select'>

            {/* <Select onValueChange={(e)=>ChangeQuestion(e)} >
      <SelectTrigger className="w-[80px] bg-gray-700 text-white">
        <SelectValue placeholder={`${qIndex+1}`} />
      </SelectTrigger>
      <SelectContent className='qind_con_body'>
        <SelectGroup>
          {
            questions && questions.map((question:Question, i:number)=>(
              <SelectItem value={i} key={i} >{i+1}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select> */}
      <select name="" id="" onChange={(e)=>ChangeQuestion(e.target.value, questionId, answer)}>
        {
          questions && questions.map((question:Question, i:number)=>(
            <option value={i} key={i} selected={i===qIndex}>{i+1}</option>
          ))
        }
      </select>




            </div>
            </div>
    
</div>
    </>
  )
}

export default LeftHeader