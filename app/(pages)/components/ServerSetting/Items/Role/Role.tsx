import React from 'react'
import ItemHeader from '../../Components/ItemHeader'

interface Props {
    setOpen: any
  }
function Role({setOpen}:Props) {
  return (
    <>
   <ItemHeader setOpen={setOpen} title='Roles' />
    
    </>
  )
}

export default Role