"use client";
import { ScrollArea } from '@radix-ui/react-scroll-area'
import React, { useState } from 'react'
import ServerCategory from '../LoginHome/ServerCategory'
import DiscoverContent from '../../DiscoverContent/DiscoverContent';
import { Server } from '@prisma/client';

interface Props {
  servers:Server[]
}

function HomeContainer({servers}:Props) {

  const [selectedCategory, setSelectedCategory] = useState('Home');

    
  return (
    <>
    <div className='home_contents'>

    
    <div className='server_cateogry_container'>
      <div className='category_label'>Categories</div>
  <ScrollArea>
    <ServerCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
  </ScrollArea>

  </div>
  
  <div className="server_category_content">
    <ScrollArea>
    <DiscoverContent selectedState={selectedCategory} servers={servers}  />
    {/* hiiiii */}
    </ScrollArea>
  </div>
  </div>
    
    </>
  )
}

export default HomeContainer