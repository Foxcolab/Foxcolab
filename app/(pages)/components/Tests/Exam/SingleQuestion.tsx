"use client";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Question, Response, Result } from '@prisma/client'
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CgBoard } from 'react-icons/cg';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface QuestionProps {
    question:Question,
    no:number
    starting:boolean
    ending:boolean
    result:Response
    params:{
      serverId: string,
        testId:string,
        resultId:string
    }
}

function SingleQuestion({question, no, starting , ending, params, result}:QuestionProps) {
  const [state, setState] = useState(no);
  const [loading , setLoading] = useState(false);
  const [answer, setAnswers] = useState([]);
  const [currentResponse, setCurrentResponse] = useState({});
  const router = useRouter();
  console.log(result);
  
  // if(result.response!==undefined || result.response!==null){
  //   for(let i=0; i<result.response.length; i++){
  //     if(result.response[i].questionId===question.id){
  //       setCurrentResponse(result.response[i]);
  //     }
  //   }
  // }
  
  const SaveHandler =async()=>{
    try {
      setLoading(true);
      let answers= []
      if(question.qType==="Single Choice"){
        let cb = document.querySelector('.radio:checked');
          answers.push(cb?.value);
      } else{
        let cb = document.querySelectorAll('input[type="checkbox"]:checked');
          let n = cb.length;
          for(let i=0; i<n; i++){
               answers.push(cb[i].value);
          }
      }
      console.log(answers.length, answers);
      
      if(answers.length===0 || answers[0]===undefined){
        console.log("THIS IS SIS ISI ");
        
        const res = await axios.post(`/api/test/result/response/next?serverId=${params.serverId}&testId=${params.testId}&resultId=${params.resultId}&questionId=${question.id}`, { currentState:state});
        setLoading(false);
        return res;
      }      
      const res = await axios.post(`/api/test/result/response?serverId=${params.serverId}&testId=${params.testId}&resultId=${params.resultId}&questionId=${question.id}`, {answer:answers, currentState:state});
        setLoading(false);
        return res;
    } catch (error) {
        setLoading(false);
        console.log(error);
      
    }
  }

  const NextHandler =async()=>{
    setState(no+1);
    console.log(state);
    const res = await SaveHandler();
    console.log(res);
    
    if(res?.status===200){
      router.refresh();
      // window.location.reload();
    }
  }

  const PreviousHandler =async()=>{
    const num = no - 1;
    console.log(no, num, state);
    
    console.log(no-1);
    
    setState(no-1);
    console.log(state);
    const res = await SaveHandler();
    console.log(res);
    
    if(res?.status===200){
      console.log("REFRESH");
      router.refresh();
      // window.location.reload();
    }
  }
  const ClearResponse =()=>{
    if(question.qType==="Single Choice"){
      let cb = document.querySelector('.radio:checked');
      console.log(cb);
      cb.checked=false;
      console.log(cb.checked);
    }else {
      let cb = document.querySelectorAll('input[type="checkbox"]:checked');
      for(let i=0; i<cb.length; i++){
        cb[i].checked=false;
      }
      console.log(cb);

    }
  }
  const checked=(value:string)=>{
    if(result==null){
      return false;
    }
    for(let i=0; i<result.answer.length; i++){
      if(result.answer[i] === value)return true;
    }
  }
  return (
    <>
    
    <div className="exam_qu">
    <h6>Question: {no+1}  </h6>

    <div className="qust_title_con">
     
      <div className='qust_title' dangerouslySetInnerHTML={{__html:question.title}} />
      
   
    <div className="qust_options">
      {question.options.map((option, index)=>(
        <div key={index}>
         
        {question.qType==="Single Choice"?
        
        <div className='d-flex items-center gap-2'>
        
        <input type='radio' value={option} id="exam_radio" checked={option===answer[0]} className='radio' name='radio' />
        <div className='qust_title' dangerouslySetInnerHTML={{__html:option}} />
        </div>
        
        :
        <div className='d-flex items-center gap-2'><input type="checkbox" value={option} 
        checked={checked(option)}
        />
        <div className='qust_title' dangerouslySetInnerHTML={{__html:option}} />
        </div>


        }
        
        </div>
      ))}


    </div>


    <div className='question_btns'>
      {
        starting ? 
        <>
        
        <button className='bg-gray-200' onClick={ClearResponse}>Clear Response </button>
        
        {loading ?<button disabled className='d-flex bg-green-500'><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> :<button className='bg-green-500' onClick={NextHandler}>  Save & Next <IoIosArrowForward/></button>
        }
        </> :
        <>
        {
          ending ? 
          <>

{loading ?<button disabled className='d-flex bg-green-500'><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> : <button className='bg-green-500 ' onClick={PreviousHandler}><IoIosArrowBack/> Save & Previous</button>
        }
     
      <button className='bg-gray-200'  onClick={ClearResponse}>Clear Response </button>
      

      {loading ?<button disabled className='d-flex bg-green-500'><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> :<button className='bg-green-500'> Submit <IoIosArrowForward/></button>
        }
          </>:

          <>
          {loading ?<button disabled className='d-flex bg-green-500'><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> :
          <button className='bg-green-500 ' onClick={PreviousHandler}><IoIosArrowBack/> Save & Previous</button>
          }
      
      <button className='bg-gray-200'  onClick={ClearResponse}>Clear Response </button>
      {loading ?<button  disabled className='d-flex bg-green-500'><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> :<button className='bg-green-500' onClick={NextHandler}> Save & Next <IoIosArrowForward/></button>}
          </>
        }
        
        </>

      }
     
    </div>
    </div>
    </div>
    
    
    </>
  )
}

export default SingleQuestion