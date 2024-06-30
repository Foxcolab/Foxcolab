import TermCondition from '@/app/(pages)/components/HomePages/Resource/TermCondition'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Terms & Conditions | Foxcolab',
  description: 'Term & Conditions | Foxcolab.',
}


function TermsConditions() {
  return (
    <div><TermCondition/></div>
  )
}

export default TermsConditions