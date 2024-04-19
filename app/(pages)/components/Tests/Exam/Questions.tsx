"use client";
import { Question, Result, Test } from '@prisma/client'
import React, { useState } from 'react'
import SingleQuestion from './SingleQuestion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';
interface Props {
    result:Result ,
    test:Test
}

function Questions({result, test}:Props) {
    const [loading, setLoading] = useState(false);
    const [suLoading, setSuLoading] = useState(false)
    const router = useRouter()
    const params = {
        serverId: test.serverId,
        testId:test.id,
        resultId:result.id

    }
    const ChangeQuestion =async(value:any)=>{
        try {
            setLoading(true);
        const res = await axios.post(`/api/test/result/response/next?serverId=${params.serverId}&testId=${params.testId}&resultId=${params.resultId}`, { currentState:value});
        console.log(res.status);
        
        if(res.status===200){
            router.refresh();
            // window.location.reload();
        }
        setLoading(false);
            
        } catch (error) {
            setLoading(false);
            
        }
    }

    const SubmitHandler =async()=>{
        try {
            setSuLoading(true);
            const res = await axios.put(`/api/test/result/submit?serverId=${params.serverId}&testId=${params.testId}&resultId=${params.resultId}`);
            console.log(res);
            if(res.status==200){
                // router.push(`./result`);
                router.push(`/servers/${params.serverId}&/${params.testId}/${params.resultId}/result`)
            }
            setSuLoading(false);
        } catch (error:any) {
            setSuLoading(false);
            console.log(error);
            
        }
    }
   
    const FindResult = (qid)=>{
        for(let i=0; i<result.response.length; i++){
            if(result.response[i].questionId===qid){
                return result.response[i];
            }
        }
        return null;
    }
  return (
    <>
    
    
    <div className="questionsContainer">
        <div className="question_left w-1/3 ">
            <div className='h-5/6 overflow-scroll'>
                <h6>{test.name}</h6>
            <p>Questions</p>
        <div className='qs_index '>
        {test?.questions && test?.questions.map((question, index)=>(
            <button onClick={()=>ChangeQuestion(index)} key={index} className={result.currentState===index ? "qs_ind current_qs" : "qs_ind"}>
                {index+1}
            </button>
        ))}
        </div>
            </div>
        <div className='ques_footer h-1/6'>
        {suLoading ?<button disabled className='d-flex bg-green-500 items-center justify-center'><ReloadIcon className="mr-2  w-4 animate-spin " />Submitting..</button> :
            <button className='bg-green-500 rounded-md ' onClick={SubmitHandler}>Submit Test</button>
        }
        </div>
        



        </div>
        <div className="question_right w-2/3">
            {
                loading ? <h1>Loading...</h1> :
                <SingleQuestion question={test.questions[result.currentState]} no={result.currentState}
            // result={result}
            starting={result.currentState===0}
            ending={result.currentState===test.questions.length}
            params={params}
            result={FindResult(test.questions[result.currentState].id)}
            />
            }
        </div>
    </div>
    
    
    
    
    
    </>
  )
}

export default Questions