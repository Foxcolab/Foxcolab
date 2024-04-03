import React from 'react'
import ItemHeader from '../../Components/ItemHeader'

interface Props {
    setOpen: any
  }
function Language({setOpen}:Props) {
  return (
    <>
    
   <ItemHeader setOpen={setOpen} title='Language & Region' />
    
    
    </>
  )
}

export default Language