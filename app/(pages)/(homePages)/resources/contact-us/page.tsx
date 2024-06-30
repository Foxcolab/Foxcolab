import ContactUs from '@/app/(pages)/components/HomePages/Resource/ContactUs'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Contact Us | Foxcolab',
  description: 'Be a member of world best community platform.',
}

function Contact() {
  return (
    <div><ContactUs /></div>
  )
}

export default Contact