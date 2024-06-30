
import Personalisation from '@/app/(pages)/components/HomePages/Feature/Personalisation';
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Foxcolab Personalisation | Customize workspace according to your mood',
  description: 'Customize workspace with themes, features according to your mood.',
}


function PersonalisationProduct() {


  return (
    <>
    
    <Personalisation />
    </>
  )
}

export default PersonalisationProduct