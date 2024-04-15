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

  }

function FileType({fileType, setFileType}:Props) {
  return (
    <>
    
    <Select onValueChange={e=>setFileType(e)} defaultValue={fileType}>
      <SelectTrigger className="file_select_btn py-1">
      <SelectValue placeholder="File Type" />
      </SelectTrigger>
      <SelectContent className='w-[180px]'>
        <SelectGroup>
          
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="image">Images</SelectItem>
        <SelectItem value="video">Videos</SelectItem>
        <SelectItem value="audio">Audio</SelectItem>
        <SelectItem value="pdf">PDF</SelectItem>
        <SelectItem value="txt">TXT</SelectItem>
        <SelectItem value="ppt">PPT</SelectItem>
        <SelectItem value="docx">Docx</SelectItem>
        <SelectItem value="xlsx">Xlsx</SelectItem>
        <SelectItem value="Zip">Zip</SelectItem>
        <SelectItem value="Json">Json</SelectItem>

    



        </SelectGroup>
      </SelectContent>
    </Select>
    
    
    </>
  )
}

export default FileType