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
    fileType:string
    setFileType:any
    onFiltering:any

  }

function FileType({fileType, setFileType,onFiltering}:Props) {
  return (
    <>
    
    <Select onValueChange={e=>onFiltering(e, "fileType")} defaultValue={fileType}>
      <SelectTrigger className="file_select_btn py-1">
      <SelectValue placeholder="File Type" />
      </SelectTrigger>
      <SelectContent className='w-[180px]'>
        <SelectGroup>
          
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="image">Images</SelectItem>
        <SelectItem value="video">Videos</SelectItem>
        <SelectItem value="PDF">PDF</SelectItem>
        <SelectItem value="TXT">TXT</SelectItem>
        <SelectItem value="/vnd.ms-powerpoint">PPT</SelectItem>
        <SelectItem value="Docx">Docx</SelectItem>
        <SelectItem value="csv">csv</SelectItem>
    



        </SelectGroup>
      </SelectContent>
    </Select>
    
    
    </>
  )
}

export default FileType