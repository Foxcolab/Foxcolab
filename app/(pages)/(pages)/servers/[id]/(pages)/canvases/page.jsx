import React from 'react'
import { GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { IoEye } from "react-icons/io5";
import MainSidebar from '../../../../../components/Sidebar/MainSidebar';
function Canvas() {
  return (
    <>
    
    <MainSidebar>
    <div className="section_container">
        <div className="section_title">
          Canvases
        </div>
        <div className='pt'>
        <div className="section_search">
        <GoSearch />
        <input type="text" placeholder='search by canvas name or keyword' />
        </div>
        <div>
          <div className="fiter_sec">
          <button><FaFilter /> Filter: All</button>
          <button><TbArrowsSort/> Sort: Recently viewed</button>
          <hr className='filter' />
          <hr />
          </div>
          <hr className='filter' />

        <div className="canvas_msg">
          <div className='canvas_content'>
          <button><IoEye /> </button>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, ipsa?
          </div>
          </div>
          <div className='canvas_content'>
          <button><IoEye /> </button>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, ipsa?
          </div>
          </div>
          <div className='canvas_content'>
          <button><IoEye /> </button>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, ipsa?
          </div>
          </div>
        </div>
        </div>
</div>
</div>
    </MainSidebar>
    
    
    </>
  )
}

export default Canvas