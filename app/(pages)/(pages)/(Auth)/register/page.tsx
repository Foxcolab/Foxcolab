import RegisterComponent from '@/app/(pages)/components/Auth/Register/RegisterComponent'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Register | Foxcolab',
  description: "Register to Foxcolab to communicate with our teams",
}

function page() {
  return (
    <>
    
    <RegisterComponent />
    
    </>
  )
}

export default page