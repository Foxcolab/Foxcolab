"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ComingSoon from './ComingSoon';

function Partners() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>
    {/* <HeaderFooter>
        <div>Partners</div>
    </HeaderFooter> */}

    <ComingSoon />
    
    </>
  )
}

export default Partners