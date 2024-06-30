import NewPassword from '@/app/(pages)/components/Auth/New-password/NewPassword'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'New Passowrd | Foxcolab',
  description: "Create your strong password.",
}

function page() {
  return (
    <>
    
    <NewPassword />
    
    </>
  )
}

export default page