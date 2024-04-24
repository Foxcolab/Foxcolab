"use client";
import { Question } from '@prisma/client'
import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { DeleteQuestion } from './DeleteQuestion';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import UpdateQuestion from './UpdateQuestion';


interface QuesitonProps {
    question:Question
    index:number
 
}

function SingleQuestion({question, index }:QuesitonProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const params = useParams();
    console.log(params);
    const router = useRouter()
    
    const DeleteHandler =async()=>{
        try {
            setLoading(true);
            const res = await axios.delete(`/api/test/question/new?serverId=${params?.id}&testId=${params?.testId}&questionId=${question.id}`);
            router.refresh();
            setLoading(false);
            setOpen(false);

        } catch (error) {
            console.log(error);
            
        }
    }

    const updateHref =()=>{
        router.push(`${params?.testId}/${question.id}`);
      }

  return (
    <>
    
    <div className=" qscontainer">
        <div className='qs_upper'>
            <span>q. {index} </span>
            <span className='d-flex gap-2'>
            <span className='text-green-500 text-sm'>Marks: {question.marks} </span>
            <span className=' px-3 py-1 font-normal c_qtype rounded text-sm'>{question.qType}</span>
            <DeleteQuestion DeleteHandler={DeleteHandler} index={index} open={open} setOpen={setOpen} />
            <button onClick={updateHref}><BiSolidEdit/></button>

            </span>
            
        </div>
        <div className="qs_body">
            <div className="qs_title">
            <div dangerouslySetInnerHTML={{__html: question.title}}/>
                
            </div>
            <div className="qs_option font-normal">
                {question.options && question.options.map((option, index)=>(
                   
                    
                    <p key={index}
                    className={`${question.answer.map((que)=>(option===que ? "d-flex align-center gap-2 text-green-600 font-bold" : "d-flex align-center gap-2" ))}   `}
                    
                    >
                   
                <RiCheckboxBlankCircleLine/>
                
                
                 <div key={index} dangerouslySetInnerHTML={{__html: option}}/>
                    </p>
                   
                    
                    
                ))}
            </div>
        </div>
    </div>
    
    
    
    </>
  )
}

export default SingleQuestion