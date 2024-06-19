"use client";
import { Question, Result, Test, Response } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import ResponseQuestion from './ResponseQuestion';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

interface Props {
    result:Result & {
        response:Response[]
    }
    questions:Question[]
    test:Test
}

function ResponseContainer({result, questions, test}:Props) {
    console.log("Result Id:", result.id);
    const [qIndex, setQindex] = useState(result.currentState);
    const [answered, setAnswered] = useState<null | Response[]>(result.response || []);
    // const [marked, setMarked] = useState([]);
    const [cleared, setCleared] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const params = useParams();
    const router = useRouter();
    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if(timeRemaining<0) return;
    //       const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    //       const elapsedTime = currentTime - startTime;
    //       const remainingTime = testDuration - elapsedTime;
          
    //       setTimeRemaining(remainingTime);
    //     }, 1000);
    
    //     return () => clearInterval(interval);
    //   }, [startTime, testDuration]);

    //   useEffect(() => {
    //     if (timeRemaining <= 0) {
    //       SubmitTest(); // Call your function to submit the test automatically
    //     }
    //   }, [timeRemaining]);
    

    //   console.log("Answered::",answered);
    const SavedToDataBase = async(currentState:number, questionId:string, answer:string[])=>{
        try {
            // console.log("SENDING DATA IS", answer);
            // let isFound = false;
            // if(answered){
            //     for(let i=0; i<answered.length; i++){
            //         if(answered[i].questionId===questionId){
            //             isFound=true;
            //         }
            //     }
            // }
            // // console.log(isFound);
            // if(answer.length==0 && !isFound) return;
            console.log("Submitting Ans:", answer);
            setLoading(true);
            const res =await axios.post(`/api/test/result/response?serverId=${params?.id}&testId=${test.id}&resultId=${result.id}&questionId=${questionId}`, {currentState, answer});
            console.log("Save :", res);
            if(res.status===200){
                setAnswered(res.data.Responses);
            }
            // setMarked([]);
        
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const NextQuestion =async(questionId:string, answer:string[])=>{
        // saved to db
        console.log("ANS FROM nextQuestion:",answer);
        await SavedToDataBase(qIndex+1, questionId, answer);
        if(qIndex===questions.length-1){
            return;
        }
        setQindex(qIndex+1);
        
    }
    const PrevQuestion =async(questionId:string, answer:string[])=>{
        
        await SavedToDataBase(qIndex+1, questionId, answer);
        if(qIndex===0){
            return;
        }
        setQindex(qIndex-1);
        
    }
    const ChangeQuestion =async(value:string, questionId:string, answer:string[])=>{
        let val = parseInt(value);
        await SavedToDataBase(val, questionId, answer);
        if(val>=0 && val<=questions.length-1){
            setQindex(val);
        }
    }

    const SubmitTest =async()=>{
        try {
            setSubmitting(true);
            const res =await axios.put(`/api/test/result/submit?serverId=${params?.id}&testId=${test.id}&resultId=${result.id}`);
            if(res.status===200){
                router.push(`${result.id}/view`);
            }
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            setLoading(false);
            console.log(error);
        }
    }

    const SubmitTestDBHandler=async(questionId:string, answer:string[])=>{
        await SavedToDataBase(0, questionId, answer);
        await SubmitTest();
    }

    // useEffect(()=>{
    //     if(answered!==null){
    //         if(answered?.length!==0 && loading==false && cleared===false){
    //             for(let i=0; i<answered?.length; i++){
    //               if(answered[i].questionId===questions[qIndex].id){
    //                 console.log("Match question::", answered[i])
    //                 setMarked(answered[i]?.answer);
    //                 // setAnswer(answered[i].answer);
    //                 console.log("Checking..", i, answered.length);
    //                 break;
    //               }
    //               console.log("Not Found!!!");
    //             //   setAnswer([]);
    //               setMarked([]);
    //             }
    //           }
    //     }
    //   }, [answered]);

      

    console.log("Container::", answered);




   

  return (
    <>
    
    <ResponseQuestion  
    question={questions[qIndex]}
    qIndex={qIndex} 
    setQIndex={setQindex} 
    test={test} 
    NextQuestion={NextQuestion} 
    PrevQuestion={PrevQuestion} 
    ChangeQuestion={ChangeQuestion} 
    length={questions.length} 
    questions={questions} 
    loading={loading} 
    // setMarked={setMarked} 
    // marked={marked} 
    answered={answered}
    cleared={cleared}
    setCleared={setCleared}
    createdAt={result.createdAt}
    submitting={submitting}
    submitTest={SubmitTest}
    SubmitTestDBHandler={SubmitTestDBHandler}
    />
    
    
    
    
    </>
  )
}

export default ResponseContainer