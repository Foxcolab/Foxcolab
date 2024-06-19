import { Question, Response } from '@prisma/client'
import React, { useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import Options from './Options';


interface Props {
    responses:Response[],
    index:number
    expand:boolean
    question:Question
}

function ResultQuestion({responses, index, expand, question}:Props) {
    const [sexpand, setExpand] = useState(expand);
    const response = responses.find(r=>r.questionId===question.id);
    const qMarks = question.marks;
    const obtainMark = response?.marks || 0;
  return (
    <>
    
    <div className=" qscontainer qs_qcon2">
        <button onClick={()=>setExpand(!sexpand)}>
        <div className='qs_upper'>
            <div className='flex items-center gap-1'>
            <span className='font-semibold flex items-center '><span>Q. </span> <span>{index+1} </span></span>
            {
                !sexpand && <span className='text-left flex items-center gap-1 font-[400]'> <span className='text-[#e2ecf1]'>|</span> <div dangerouslySetInnerHTML={{__html: question.title}}/></span>
            }
            </div>
            <span className='d-flex gap-2'>
            <span className={qMarks===obtainMark ? "text-green-500 text-sm" : "text-red-500 text-sm"}> {obtainMark}/{qMarks} </span>
            <button onClick={()=>setExpand(!sexpand)}> {sexpand ? <><MdExpandMore/> </> :<>< MdExpandLess/></>} </button>

            </span>
            
        </div>
        </button>
        {
            sexpand && <div className="qs_body">
            <div className="qs_title my-4">
            <div dangerouslySetInnerHTML={{__html: question.title}}/>
                
            </div>
            <div className="qs_option font-normal">
                {question.options && question.options.map((option, index)=>(
                   
                    
                   <Options key={index} option={option} rightAns={question.answer} selectedAns={response?.answer} />
                   
                    
                    
                ))}
            </div>
            <div className='p-2 my-4'>
                <div className='font-semibold text-[#204d68]'>Explanation:</div>
                <div className='pt-2 text-[#6c828f]'><div dangerouslySetInnerHTML={{__html: question.explanation as string}}/></div>
            </div>
        </div>
        }
        
    </div>
    
    
    </>
  )
}

export default ResultQuestion