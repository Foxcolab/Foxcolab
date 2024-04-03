import React from 'react'
import { BsFillXCircleFill } from 'react-icons/bs'

interface Props {
  title:string
  setOpen:any

}
function ItemHeader({title, setOpen}:Props) {
  return (
    <div>
      <div className='item_header flex items-center justify-between mr-8'>
        <div className='item_title'>{title}</div>
        <div className='item_close' onClick={()=>setOpen(false)}><BsFillXCircleFill/>
        <span>ESC</span>
        </div>
      </div>
    </div>
  )
}

export default ItemHeader