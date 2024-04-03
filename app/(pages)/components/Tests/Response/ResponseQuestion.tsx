import { Question, Response, Test } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import LeftHeader from './LeftHeader/LeftHeader'
import RightHeader from './RightHeader/RightHeader'
import { ReloadIcon } from '@radix-ui/react-icons'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import SingleQuestion from './SingleQuestion'


interface Props {
    question:Question
    qIndex:number
    setQIndex:any
    test:Test
    NextQuestion:any
    PrevQuestion:any
    ChangeQuestion:any
    length: number
    questions:Question[]
    setMarked:any
    loading:boolean 
    answered:Response[]
    marked:string[]
    cleared:boolean
    setCleared:any
    remainingTime:any
    submitting:boolean
    submitTest:any
    SubmitTestDBHandler:any
}
function ResponseQuestion({question, qIndex, test, NextQuestion, PrevQuestion, ChangeQuestion, length, questions, setMarked, loading, answered, marked, cleared, setCleared, remainingTime, submitting, submitTest, SubmitTestDBHandler}:Props) {
  // setMarked(answered.find((ans)=>ans.questionId===question.id ? answ));
  const [answer, setAnswer] = useState<string[]>([]);

  useEffect(()=>{
    if(answered.length!==0 && loading==false && cleared===false){
      for(let i=0; i<answered.length; i++){
        if(answered[i].questionId===question.id){
          setMarked(answered[i].answer);
          setAnswer(answered[i].answer);
        }
      }
    }
  }, [NextQuestion, PrevQuestion, ChangeQuestion]);

  
  const SubmitHandler =()=>{}
 
  const isEnding = qIndex ===(length- 1);
  const isStarting = qIndex===0;
  const testName = test.name;

  const OnChangeHandler =()=>{
    if(question.qType==="Single Choice"){
      let cb = document.querySelector('.radio:checked');
      if(cb===null)return;
      setMarked([cb.value]);
      setAnswer([cb.value]);
    }else {
      let cb = document.querySelectorAll('input[type="checkbox"]:checked');
      const chek = []
      for(let i=0; i<cb.length; i++){
        if(cb[i].checked){
          chek.push(cb[i].value);
        }
      }
      setMarked(chek);
      setAnswer(chek);
    }
  }

  

 


  const isChecked =(value:string)=>{
    return answer.includes(value);
  }

  const SubmitTestHandler =async(ans:string[])=>{
    await savedToDB();
    await submitTest();


  }



  return (
    <>

    <SingleQuestion
    
    testName={testName}
    qIndex={qIndex}
    length={length}
    ChangeQuestion={ChangeQuestion}
    marks={question.marks}
    qType={question.qType}
    questionId={question.id}
    title={question.title}
    time={test.time}
    remainingTime={remainingTime}
    options={question.options}
    OnChangeHandler={OnChangeHandler}
    isChecked={isChecked}
    isStarting={isStarting}
    isEnding={isEnding}
    // ClearResponse={ClearResponse}
    // SubmitTest ={SubmitTest}
    setMarked={setMarked}
    PrevQuestion={PrevQuestion}
    NextQuestion={NextQuestion}
    loading={loading}
    questions={questions}
    marked={marked}
    // setMarked={setMarked}
    setAnswer={setAnswer}
    answer={answer}
    answered={answered}
    setCleared={setCleared}
    submitting={submitting}
    submitTest={submitTest}
    SubmitTestDBHandler={SubmitTestDBHandler}
    />
    </>
  )
}

export default ResponseQuestion;