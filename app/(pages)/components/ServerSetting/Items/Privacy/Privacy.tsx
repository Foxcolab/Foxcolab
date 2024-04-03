import React from 'react'
import ItemHeader from '../../Components/ItemHeader'

interface Props {
    setOpen: any
  }
function Privacy({setOpen}:Props) {
  return (
   <>
   <ItemHeader setOpen={setOpen} title='Privacy Settings' />
   
   
   </>
  )
}

export default Privacy