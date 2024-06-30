import Spreadsheet from '@/app/(pages)/components/HomePages/Components/Spreadsheet'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Foxcolab Spreadsheets | Advancement of data storing with Spreadsheets',
  description: 'Advancement of data storing with foxcolab Spreadsheets',
}


function SpreedsheetProduct() {
  return (
    <div><Spreadsheet/></div>
  )
}

export default SpreedsheetProduct