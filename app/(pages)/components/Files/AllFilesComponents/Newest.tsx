import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


interface Props {
  SortingOrderHandler:any
}

function Newest({SortingOrderHandler}:Props) {
  return (
    <>
    <div className='select_sorting_div'>
    <Select onValueChange={e=>SortingOrderHandler(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Newest" className='file_filtering' />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
        <SelectItem value="Oldest file">Oldest file</SelectItem>
        <SelectItem value="Newest file">Newest file</SelectItem>
        <SelectItem value="A to Z">A to Z</SelectItem>
        <SelectItem value="Z to A">Z to A</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
 
    
    
    </>
  )
}

export default Newest