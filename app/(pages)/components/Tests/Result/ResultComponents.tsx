"use client";
import { Question, Response, Result, Test, User } from '@prisma/client';
import React, { useState } from 'react'
import { VscNote } from "react-icons/vsc";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaAngleLeft, FaUserAlt } from 'react-icons/fa';
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import LetterAvatar from '../../UserAvatar/LetterAvatar';
import { GoCodescanCheckmark } from 'react-icons/go';
import { GrStatusInfoSmall } from 'react-icons/gr';
import { Button } from '@/components/ui/button';
import ResultQuestion from './ResultQuestion';
import { RiExpandUpDownFill, RiExpandUpDownLine } from 'react-icons/ri';
import { BiCollapseVertical } from 'react-icons/bi';
import ResultChart from './ResultChart';
import { useParams, useRouter } from 'next/navigation';
import { ModeToggle } from '../../mode-toggle/Toggle';


interface Props {
  result:Result
  testChannelName:string
  user:User | null | undefined
  test:Test
}

function ResultComponents({result, testChannelName, user, test}:Props) {
  const [expand, setExpand] = useState(false);
  const router = useRouter()
  const params = useParams();
  const testName = test.name;
  const responses:Response[] = result.response;
  const passMarks = test.passmarks;
  const fullMarks = test.fullMarks;
  const obtainMarks = result.obtainMarks;
  const perc = (obtainMarks/fullMarks)*100;
  const isPass = perc - passMarks;
  const questions:Question[] = test.questions;
  const totalQuestion = test.questions.length;
  let totalRight = 0;
  for(let i=0; i<result.response.length; i++){
    if(result.response[i].marks ===result.response[i].qMarks){
      totalRight++;
    }
  }



  return (

    <>

    <div className='r_des_container'>
      <Button color='r_bck_btn' onClick={()=>router.push(`/servers/${params?.id}/test-channel/${params?.testChannelId}`)}><FaAngleLeft/> Back</Button>

        <div className='r_des mt-4'><span>{testChannelName}</span> - {testName}</div>
        {/* <div className='r_des'>{} </div> */}
        <div className="respondent">
          <label htmlFor="">RESPONDENT</label>
        <div className='resp_prf'>
        {
            ((user.profilePic===null || user.profilePic===undefined)) ? 
          //   <LetterAvatar 
          //   name={(user.name===undefined) ? 'Y': user.name as string }
          //  size={40}
          //  radius={50}
          //   /> 
          <LetterAvatar
           name={user.name===undefined ? "Y" : user.name as string}
           size={40}
           radius={50}
            />
            : 
          <UserAvatar src={user.profilePic} />

          }
        
          {user.name}
        </div>

        </div>
        <div className="respondent">
          <label htmlFor="">SUMMARY</label>
          <div className='flex gap-1 items-center font-bold'>
            <GrStatusInfoSmall /> 
            <span>
              {isPass<0 ? "Thank you for taking the test! Your score was too low to pass this test." : "Thank you for taking the test! Congratulations on passing the test!" }
            </span>

          </div>
        </div>

        <ResultChart totalTime={test.time} submitTime={result.submitTime as Date} startingTime={result.createdAt} attempt={result.attempt} isPass={isPass<0 ? false : true} totalQuestion={totalQuestion} totalRight={totalRight} obtainMarks={result.obtainMarks} totalMarks={result.fullMarks}  />


        <div className="all_re_q" >
          <div className='flex justify-between pr-4'>
          <label>QUESTIONS ({test.questions.length})</label>
          <button className='flex items-center text-sm' onClick={()=>setExpand(!expand)}>
            {
              expand===false ? <> Expand all <RiExpandUpDownLine/> </> :
              <> Collapse all <BiCollapseVertical/></>
            }
            
            </button>
          </div>

          {/* {
           expand &&  responses.length!==0 && responses.map((response, i)=>(
              <ResultQuestion key={response.id} response={response} index={i} expand={true}  />
            ))
          } */}
          {
            expand && questions.map((question, i)=>(

              <ResultQuestion key={question.id} responses={responses} index={i} expand={true} question={question}  />

            ))
          }
          {
           !expand && questions.length!==0 && questions.map((question, i)=>(
            <ResultQuestion key={question.id} responses={responses} index={i} expand={false} question={question}  />

              // <ResultQuestion key={response.id} response={response} index={i} expand={false}  />
            ))
          }
        </div>
    </div>

    



    
    
    
    </>
  )
}

export default ResultComponents