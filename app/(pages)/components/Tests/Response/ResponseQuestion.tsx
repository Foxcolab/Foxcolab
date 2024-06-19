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
    // marked:string[]
    // setMarked:any
    loading:boolean 
    cleared:boolean
    setCleared:any
    createdAt:any
    submitting:boolean
    submitTest:any
    SubmitTestDBHandler:any
    answered:any

}
function ResponseQuestion({question, qIndex, test, NextQuestion, PrevQuestion, ChangeQuestion, length, questions, loading, cleared, setCleared, createdAt, submitting, submitTest, SubmitTestDBHandler, answered}:Props) {
  // setMarked(answered.find((ans)=>ans.questionId===question.id ? answ));
  // const [answer, setAnswer] = useState<any[]>(marked);
    const [marked, setMarked] = useState([]);

    useEffect(()=>{
      if(answered!==null){
            if(answered?.length!==0 && loading==false && cleared===false){
                for(let i=0; i<answered?.length; i++){
                  if(answered[i].questionId===questions[qIndex].id){
                    setMarked(answered[i]?.answer);
                    // setAnswer(answered[i].answer);
                    break;
                  }
                //   setAnswer([]);
                  setMarked([]);
                }
              }
        }
    },[question, answered])


//   if(answered!==null){
//     if(answered?.length!==0 && loading==false && cleared===false){
//         for(let i=0; i<answered?.length; i++){
//           if(answered[i].questionId===questions[qIndex].id){
//             console.log("Match question::", answered[i])
//             setMarked(answered[i]?.answer);
//             // setAnswer(answered[i].answer);
//             console.log("Checking..", i, answered.length);
//             break;
//           }
//           console.log("Not Found!!!");
//         //   setAnswer([]);
//           setMarked([]);
//         }
//       }
// }
  
  const SubmitHandler =()=>{}
 
  const isEnding = qIndex ===(length- 1);
  const isStarting = qIndex===0;
  const testName = test.name;

  const OnChangeHandler =()=>{
    if(question.qType==="Single Choice"){
      let cb = document.querySelector('.radio:checked');
      if(cb===null)return;
      setMarked([cb.value]);
    }else {
      let cb = document.querySelectorAll('input[type="checkbox"]:checked');
      const chek = []
      for(let i=0; i<cb.length; i++){
        if(cb[i].checked){
          chek.push(cb[i].value);
        }
      }
      setMarked(chek);
      // setAnswer(chek);
    }




  }

  

 


  const isChecked =(value:string)=>{
    return marked.includes(value);
  }

 

  // console.log("Marked:", marked);
  // console.log("Answer:", answer);
  // console.log("Answered:", answered);
  // console.log(question.id);
  console.log(answered);

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
    createdAt={createdAt}
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
    // setAnswer={setAnswer}
    // answer={answer}
    setCleared={setCleared}
    submitting={submitting}
    submitTest={submitTest}
    SubmitTestDBHandler={SubmitTestDBHandler}
    />
    </>
  )
}

export default ResponseQuestion;