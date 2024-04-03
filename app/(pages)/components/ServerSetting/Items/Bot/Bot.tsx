import React from 'react'
import ItemHeader from '../../Components/ItemHeader'

interface Props {
    setOpen: any
  }
function Bot({setOpen}:Props) {
  return (
    <>

        <ItemHeader setOpen={setOpen} title='Bots' />


    </>
  )
}

export default Bot