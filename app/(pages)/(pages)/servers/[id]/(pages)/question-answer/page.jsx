import React from 'react'
import MainSidebar from "../../../../../components/Sidebar/MainSidebar";
import Question from "../../../../../components/Question/Question";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { IoEye } from "react-icons/io5";

const Questions = [
    {
        qid:1,
        title:"what is CPU?",
        answer:"wkasdkf jkas dsadf ssd"
    },
    {
        qid:2,
        title:"lsadfasdf a",
        answer:"wkasdkf jkas dsadf ssd"
    },
    {
        qid:3,
        title:"lkskdjsd kjdf as ",
        answer:"wkasdkf jkas dsadf ssd"
    },
]


function page() {
  return (
    <>
    
   <MainSidebar>
   <div className="section_container">
        <div className="section_title d-flex">
         <RiQuestionAnswerFill/> Question & Answer
        </div>
        <div className='pt'>
        <div className="section_search">
        <GoSearch />
        <input type="text" placeholder='search by question name or keyword' />
        </div>
        <div>
          <div className="fiter_sec">
          <button><FaFilter /> Filter: All</button>
          <button><TbArrowsSort/> Sort: Recently viewed</button>
          <hr className='filter' />
          <hr />
          </div>
          </div>
          </div>
          <hr className='filter' />
    <div className="question_container">
        <div className="questions">
            {
                Questions.map((question)=>(
                    <Question question={question} key={question.qid}  />
                ))
            }
        </div>
    </div>
    </div>
   </MainSidebar>
    
    </>
  )
}

export default page