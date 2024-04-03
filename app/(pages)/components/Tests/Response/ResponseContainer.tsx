"use client";
import { Question, Result, Test, Response } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import ResponseQuestion from './ResponseQuestion';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

interface Props {
    result:Result
    questions:Question[]
    test:Test
}

function ResponseContainer({result, questions, test}:Props) {
    let testDuration = test.time*60;
    let startTime = Math.floor(new Date(result.createdAt).getTime()/1000);
    console.log("START",startTime, testDuration);
    const [qIndex, setQindex] = useState(result.currentState);
    const [answered, setAnswered] = useState<null | Response[]>(result.response || []);
    const [timeRemaining, setTimeRemaining] = useState(testDuration);
    const [marked, setMarked] = useState([]);
    const [cleared, setCleared] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const params = useParams();
    const router = useRouter();
    
    useEffect(() => {
        const interval = setInterval(() => {
            if(timeRemaining<0) return;
          const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
          const elapsedTime = currentTime - startTime;
          const remainingTime = testDuration - elapsedTime;
          console.log(elapsedTime, currentTime)
          setTimeRemaining(remainingTime);
        }, 1000);
    
        return () => clearInterval(interval);
      }, [startTime, testDuration]);

      useEffect(() => {
        if (timeRemaining <= 0) {
          SubmitTest(); // Call your function to submit the test automatically
        }
      }, [timeRemaining]);
    


    const SavedToDataBase = async(currentState:number, questionId:string, answer:string[])=>{
        try {
            // console.log("SENDING DATA IS", answer);
            let isFound = false;
            if(answered){
                for(let i=0; i<answered.length; i++){
                    if(answered[i].questionId===questionId){
                        isFound=true;
                    }
                }
            }
            // console.log(isFound);
            if(answer.length==0 && !isFound) return;
            setLoading(true);
            const res =await axios.post(`/api/test/result/response?serverId=${params?.id}&testId=${test.id}&resultId=${result.id}&questionId=${questionId}`, {currentState, answer});
            // console.log(res);
            console.log(res);
            if(res.status===200){
                // console.log("RES DATA", res.data.Responses);
                setAnswered(res.data.Responses);
            }
            setMarked([]);
        
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const NextQuestion =async(questionId:string, answer:string[])=>{
        // saved to db
        // console.log("ANS FROM nextQuestion:",answer);
        await SavedToDataBase(qIndex+1, questionId, answer);
        if(qIndex===questions.length-1){
            return;
        }
        setQindex(qIndex+1);
        
    }
    const PrevQuestion =async(questionId:string, answer:string[])=>{
        // saved to db
        console.log("ANS FROM PrevQuestion:", answer);
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
            console.log("Test Submitted");
            setSubmitting(true);
            const res =await axios.put(`/api/test/result/submit?serverId=${params?.id}&testId=${test.id}&resultId=${result.id}`);
            console.log(res);
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

    const formatTime = (seconds:number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

  return (
    <>
    
    <ResponseQuestion  question={questions[qIndex]} qIndex={qIndex} setQIndex={setQindex} test={test} NextQuestion={NextQuestion} PrevQuestion={PrevQuestion} ChangeQuestion={ChangeQuestion} length={questions.length} questions={questions} loading={loading} answered={answered} setMarked={setMarked} marked={marked} 
    cleared={cleared}
    setCleared={setCleared}
    remainingTime={formatTime(timeRemaining)}
    submitting={submitting}
    submitTest={SubmitTest}
    SubmitTestDBHandler={SubmitTestDBHandler}
    />
    
    
    
    
    </>
  )
}

export default ResponseContainer