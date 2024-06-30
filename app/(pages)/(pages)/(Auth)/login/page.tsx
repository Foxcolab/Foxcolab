import LoginComponent from '@/app/(pages)/components/Auth/Login/LoginComponent'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Login | Foxcolab',
  description: "Login in to your profile to communicate with our teams",
}


function page() {
  return (
    <>
    
    <LoginComponent />
    
    </>
  )
}

export default page