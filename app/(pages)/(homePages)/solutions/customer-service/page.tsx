import CustomerService from '@/app/(pages)/components/HomePages/Solutions/CustomerService'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Customer Service | Foxcolab',
  description: 'Customer Service | Foxcolab',
}

function CustomerServiceSolutions() {
  return (
    <div><CustomerService/></div>
  )
}

export default CustomerServiceSolutions