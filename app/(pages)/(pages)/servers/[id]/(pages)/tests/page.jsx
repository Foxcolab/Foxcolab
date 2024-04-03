import MainSidebar from '@/app/(pages)/components/Sidebar/MainSidebar'
import React from 'react'
import {FaSquareThreads, FaDharmachakra} from "react-icons/fa6"
import { FaRegUserCircle } from "react-icons/fa";
import { AiTwotoneBook } from "react-icons/ai";
function Tests() {
  return (
    <>
    <MainSidebar>
    <div className="section_container">
    <div className="section_title">
          All Tests
        </div>
        <div className="pt">
    <div className="test_select">
      <div>
        <label htmlFor=""><FaDharmachakra/>&nbsp;Select Section: </label>
        <select name="" id="">
          <option value="">Select--</option>
          <option value="">Welcome</option>
          <option value="">A</option>
          <option value="">B</option>
        </select>
      </div>
      <div>
        <label htmlFor=""># Select Channel: </label>
        <select name="" id="">
          <option value="">Select--</option>
          <option value="">A</option>
          <option value="">B</option>
        </select>
      </div>
    </div>
    </div>
    <div className="test mt">
      <div className="test_card">
        <h6><AiTwotoneBook /> Test 1</h6>
        <div className='section_channel'>
          <div>Section: Welcome </div>
          <div>Channel: lala</div>
        </div>
        <div className='total_q'>
          Total Question:10
        </div>
        <div className='total_q'>
        Total Response: 112

        </div>
        <div className="user_n">
        Created By: Rabin
        </div>
      </div>
      <div className="test_card">
        <h6><AiTwotoneBook /> Test 2</h6>
        <div className='section_channel'>
          <div>Section: Welcome </div>
          <div>Channel: lala</div>
        </div>
        <div className='total_q'>
          Total Question:10
        </div>
        <div className='total_q'>
        Total Response: 112

        </div>
        <div className="user_n">
        Created By: Rabin
        </div>
      </div>
      <div className="test_card">
        <h6><AiTwotoneBook /> Test 3</h6>
        <div className='section_channel'>
          <div>Section: Welcome </div>
          <div>Channel: lala</div>
        </div>
        <div className='total_q'>
          Total Question:10
        </div>
        <div className='total_q'>
        Total Response: 112

        </div>
        <div className="user_n">
        Created By: Rabin
        </div>
      </div>
      <div className="test_card">
        <h6><AiTwotoneBook /> Test 4</h6>
        <div className='section_channel'>
          <div>Section: Welcome </div>
          <div>Channel: lala</div>
        </div>
        <div className='total_q'>
          Total Question:10
        </div>
        <div className='total_q'>
        Total Response: 112

        </div>
        <div className="user_n">
        Created By: Rabin
        </div>
      </div>
    </div>
    </div>
    </MainSidebar>
    
    
    
    </>
  )
}

export default Tests