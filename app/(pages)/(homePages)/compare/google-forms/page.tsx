import GoogleForms from '@/app/(pages)/components/HomePages/Compare/GoogleForms';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
    title: 'Google Forms Alternative - Foxcolab',
    description: 'Google Forms vs Foxcolab. Alternative of Google Forms',
}
function page() {
  return (
    <div><GoogleForms/></div>
  )
}

export default page