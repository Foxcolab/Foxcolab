"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';
import ComingSoon from './ComingSoon';

function Career() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);
  return (
    <>

      <ComingSoon />
    
    </>
  )
}

export default Career