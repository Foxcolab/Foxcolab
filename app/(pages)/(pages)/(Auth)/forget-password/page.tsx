import ForgetComponents from '@/app/(pages)/components/Auth/Forget-password/ForgetComponents'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Forgot Password | Foxcolab',
  description: "Forgot your password by enering your email id.",
}

function page() {
  return (
    <>
    

    <ForgetComponents />
    
    
    </>
  )
}

export default page