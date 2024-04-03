"use client";
import { ReloadIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Button } from '@/components/ui/button'

function Loader() {
  return (
    <>
    
    <Button disabled className=''>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
            Please wait
          </Button> 
    
    </>
  )
}

export default Loader