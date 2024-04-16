import { Server } from '@prisma/client';
import React from 'react'
import { BsSearch } from "react-icons/bs";
import {RiRadioButtonLine} from "react-icons/ri"

interface Props {
    selectedState:string
    servers:Server[]
}

function DiscoverContent({selectedState, servers}:Props) {
  return (
    <>
    <div className="discv">
    <div className='search_container'>
        <div className='cont'>
        <div className="main_heading">Find your community on Foxcolab</div>
        <div className='sub_heading'>From Science, AI, Education, to business there's place for you </div>
        <div className='search_inp'><input type="text" placeholder='Explore Coummunities' /><BsSearch/></div>
    
        </div>
        </div>
     
    <div className='featured_heading my-4 mx-2'>{selectedState}</div>
    <div className="card_container">
        <div className='featured_card'>
            <div className='img'></div>
            <div className='logo'></div>
            <div className='featured_n'>
            <div className="title">Featured title</div>
            <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, non.lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus quasi nam quibusdam, eum labore  </div>
            <div className='member'>
                <div>
                <span className='text-green-500'> <RiRadioButtonLine/></span>  1,02,400 Member
                </div>
            </div>
            </div>
        </div>
        <div className='featured_card'>
            <div className='img'></div>
            <div className='logo'></div>
            <div className='featured_n'>
            <div className="title">Featured title</div>
            <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, non.lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus quasi nam quibusdam, eum labore  </div>
            <div className='member'>
                <div>
                <span className='text-green-500'> <RiRadioButtonLine/></span>  1,02,400 Member
                </div>
            </div>
            </div>
        </div>
        <div className='featured_card'>
            <div className='img'></div>
            <div className='logo'></div>
            <div className='featured_n'>
            <div className="title">Featured title</div>
            <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, non.lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus quasi nam quibusdam, eum labore  </div>
            <div className='member'>
                <div>
                <span className='text-green-500'> <RiRadioButtonLine/></span>  1,02,400 Member
                </div>
            </div>
            </div>
        </div>
        <div className='featured_card'>
            <div className='img'></div>
            <div className='logo'></div>
            <div className='featured_n'>
            <div className="title">Featured title</div>
            <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, non.lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus quasi nam quibusdam, eum labore  </div>
            <div className='member'>
                <div>
                <span className='text-green-500'> <RiRadioButtonLine/></span>  1,02,400 Member
                </div>
            </div>
            </div>
        </div>
        <div className='featured_card'>
            <div className='img'></div>
            <div className='logo'></div>
            <div className='featured_n'>
            <div className="title">Featured title</div>
            <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, non.lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus quasi nam quibusdam, eum labore  </div>
            <div className='member'>
                <div>
                <span className='text-green-500'> <RiRadioButtonLine/></span>  1,02,400 Member
                </div>
            </div>
            </div>
        </div>
        
    </div>
    </div> 
    
    
    </>
  )
}

export default DiscoverContent