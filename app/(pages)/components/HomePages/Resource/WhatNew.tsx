"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';

function WhatNew() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
    <HeaderFooter>
        <div>WhatNew</div>
    </HeaderFooter>
    
    </>
  )
}

export default WhatNew