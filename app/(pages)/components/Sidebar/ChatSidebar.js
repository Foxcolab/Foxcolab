import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

function ChatSidebar() {
  return (
    <>
    
    <div className='contacts'>
        <div className="search_contact">
          <div>
         <button> <IoIosSearch/></button>
          <input type="text" placeholder='search or start new chat' />
          </div>
          <IoFilter/>
        </div>
        <hr />

        <div className="all_contacts">
          <div className="single_contact">
            <div className="c_logo"></div>
            <div className="c_name">
              <div className="c_username">
                <span className='bold'>Ram Manna</span>
                <span style={{fontSize:"0.8rem"}}>Oh</span>
              </div>
              <div className="c_time">
                6:10 PM
              </div>
              </div>
          </div>
          <div className="single_contact">
            <div className="c_logo"></div>
            <div className="c_name">
              <div className="c_username">
                <span className='bold'>Rabindranath Tagore</span>
                <span style={{fontSize:"0.8rem"}}>Oh</span>
              </div>
              <div className="c_time">
                6:10 PM
              </div>
              </div>
          </div>
          <div className="single_contact">
            <div className="c_logo"></div>
            <div className="c_name">
              <div className="c_username">
                <span className='bold'>Harin Roy</span>
                <span style={{fontSize:"0.8rem"}}>Oh</span>
              </div>
              <div className="c_time">
                6:10 PM
              </div>
              </div>
          </div>
        </div>
        </div>
    
    </>
  )
}

export default ChatSidebar