import { ReloadIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import LeftHeader from './LeftHeader/LeftHeader'
import { Question, Response } from '@prisma/client'
import RightHeader from './RightHeader/RightHeader'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface Props {
    testName:string
    qIndex:number
    length:number
    ChangeQuestion:any
    marks:number
    qType:string
    questionId:string
    title:string
    time:number
    questions:Question[]
    options:string[]
    OnChangeHandler:any
    isChecked:any
    isStarting:boolean
    isEnding:boolean
    NextQuestion:any
    PrevQuestion:any
    loading:boolean
    marked:string[]
    setMarked:any
    // answer:string[]
    // setAnswer:any
    setCleared:any
    createdAt:any
    submitting:boolean
    submitTest:any
    SubmitTestDBHandler:any
}



function SingleQuestion({testName, qIndex, length, ChangeQuestion, marks, qType, questionId, title, time, questions, options, OnChangeHandler, isChecked, isEnding, isStarting,  loading, NextQuestion, PrevQuestion, marked, setMarked, setCleared, createdAt, submitting, submitTest, SubmitTestDBHandler}:Props) {

  // useEffect(()=>{
  //   if(answered.length!==0 && loading===false){
  //     for(let i=0; i<answered.length; i++){
  //       if(answered[i].questionId===questionId){
  //         setMarked(answered[i].answer);
  //         setAnswer(answered[i].answer);
  //       }
  //     }
  //   }
  // }, [NextQuestion, PrevQuestion, ChangeQuestion]);





  // console.log("Loading",loading, marked, answer);
  const isOptionSelected = (option:string)=>{
    return marked.includes(option);
  }

  const onChangeCheck=(e:any)=>{
    if(qType==="Single Choice"){
      setMarked([e]);
      console.log([e]);
    }
    else {
      let cb = document.querySelectorAll('input[type="checkbox"]:checked');
      const chek = []
      for(let i=0; i<cb.length; i++){
        if(cb[i].checked){
          chek.push(cb[i].value);
        }
      }
      // console.log(chek);
      setMarked(chek);    
    }
  }


  const ClearResponse =(qType:string)=>{
    setCleared(true);
    setMarked([]);
    setMarked([]);
    if(qType==="Single Choice"){
      let cb = document.querySelector('.radio:checked');
      if(cb===null) return;
      cb.checked=false;
    }else {
      let cb = document.querySelectorAll('input[type="checkbox"]:checked');
      for(let i=0; i<cb.length; i++){
        cb[i].checked=false;
      }
    }
  }

  // console.log("Answer", answer);


  console.log("Markeddd::", marked)

  return (
    <>
            <div className="questionsContainer">
        

          <ResizablePanelGroup direction="horizontal">
  <ResizablePanel minSize={30}>
  <div className="question_left h-full">
          <LeftHeader testName={testName} qIndex={qIndex} questions={questions} length={length}  ChangeQuestion={ChangeQuestion} questionId={questionId} answer={marked}  />
          <div className='testq_content'>
          <div dangerouslySetInnerHTML={{__html:title}} />
          </div>
          </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel minSize={30}>
  <div className="question_right h-full">
          
          <RightHeader  testName={testName} marks={marks} time={time} createdAt={createdAt} submitting={submitting} submitTest={submitTest} length={length}  />
          <div className='font-bold text-lg  pt-6 pb-2 px-4'>
          {
            qType==="Single Choice" ? <>
            Select a option...
            </> : <>You can select multiple options...</>
          }
          </div>


          <div className="qust_options">

<div className="qust_options">
{
        qType==="Single Choice" ? <> 
          {
          options.map((option, index)=>(
            <div className="qus_s_option" key={index}>
            <div key={index} className='d-flex items-center gap-2'>
          
            <input type='radio' value={option} id="exam_radio" className='radio' name={`${questionId}`} onChange={(e)=>onChangeCheck(e.target.value)} checked={isOptionSelected(option) }  />
       
            <div className='qust_title' dangerouslySetInnerHTML={{__html:option}} />
            </div>
            </div>
          ))
        }
        </> : <>
        {
          options.map((option, index)=>(
            <div className="qus_s_option" key={index}>
            <div  className='d-flex items-center gap-2'>
     
            <input type="checkbox" value={option} onChange={(e)=>onChangeCheck(e.target.value)}  name={`${questionId}`}
             checked={isOptionSelected(option)}
            />
            <div className='qust_title' dangerouslySetInnerHTML={{__html:option}} />
            </div>
            </div>
          ))
        }
        
        </>
      }
</div>

    </div>



        <div className='next_pre_btns'>
        <div className='question_btns'>
      {
        isStarting ? 
        <>
        
        <button className='bg-gray-200 hover:bg-gray-100 text-black' onClick={ClearResponse}>Clear Response </button>
        
        {loading ?<button disabled className='flex bg-green-500 text-white '><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> :<button className='bg-green-500 text-white hover:bg-green-600' onClick={()=>NextQuestion(questionId, marked)}>  Save & Next <IoIosArrowForward/></button>
        }
        </> :
        <>
        {
          isEnding ? 
          <>

{loading ?<button disabled className='flex bg-green-500 text-white'><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> : <button className='bg-green-500 hover:bg-green-600 text-white' onClick={()=>PrevQuestion(questionId, marked)}><IoIosArrowBack/> Save & Previous</button>
        }
     
      <button className='bg-gray-200 hover:bg-gray-100 text-black'  onClick={ClearResponse}>Clear Response </button>
      

      {submitting ?<button disabled className='flex bg-green-500 text-white'><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> :
      
      <button className='bg-green-500 text-white hover:bg-green-600' onClick={()=>SubmitTestDBHandler(questionId,marked)}> Submit <IoIosArrowForward/></button>
        }
          </>:

          <>
          {loading ?<button disabled className='flex bg-green-500 text-white '><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> :
          <button className='bg-green-500 hover:bg-green-600' onClick={()=>PrevQuestion(questionId, marked)}><IoIosArrowBack/> Save & Previous</button>
          }
      
      <button className='bg-gray-200 hover:bg-gray-100 text-black'  onClick={ClearResponse}>Clear Response </button>
      {loading ?<button  disabled className='flex text-white bg-green-500 '><ReloadIcon className="mr-2  w-4 animate-spin " />Saving..</button> :<button className='bg-green-500 text-white hover:bg-green-600' onClick={()=>NextQuestion(questionId, marked)}> Save & Next <IoIosArrowForward/></button>}
          </>
        }
        
        </>

      }
     
    </div>
        </div>



        </div>
  </ResizablePanel>
</ResizablePanelGroup>
          
        
    </div>
    
    
    </>
  )
}

export default SingleQuestion