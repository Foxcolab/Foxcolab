"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ComingSoon from './ComingSoon';

function Developer() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
    {/* <HeaderFooter>
        <div>Developer</div>
    </HeaderFooter> */}

    <ComingSoon />
    
    </>
  )
}

export default Developer