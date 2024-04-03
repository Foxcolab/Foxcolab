import React from 'react'
import ItemHeader from '../../Components/ItemHeader'

interface Props {
  setOpen:any
}
function Cutomize({setOpen}:Props) {
  return (
    <ItemHeader title="Customize Server" setOpen={setOpen} />
  )
}

export default Cutomize