import React from 'react'
import ItemHeader from '../../Components/ItemHeader'
import { Server } from '@prisma/client'

interface Props {
  setOpen: any
  server:Server
}
function Analytics({setOpen, server}: Props) {
  return (
    <>
    
    <ItemHeader setOpen={setOpen} title="Server Analystics" />
    
    
    </>
  )
}

export default Analytics