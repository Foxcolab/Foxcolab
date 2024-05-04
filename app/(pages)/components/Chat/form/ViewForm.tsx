import { FormField, FormFieldResponse, UploadedFile, formResponse } from '@prisma/client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns'
import { MdShortText } from 'react-icons/md'
import { BsBodyText } from 'react-icons/bs'
import { IoIosCheckbox, IoIosOptions, IoMdRadioButtonOn } from 'react-icons/io'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { LucideText } from 'lucide-react'
  


interface Props {
    open:boolean
    setOpen:any
    formResponse:formResponse[]
    formFields:FormField[]
}
function ViewForm({open, setOpen, formResponse, formFields}:Props) {

    console.log(formResponse);


  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className='max-w-[100vw] h-[100vh] rounded-none'>
    <div>
    <DialogHeader>
        <DialogTitle>All Responses</DialogTitle>
    </DialogHeader>
        <hr className='mt-4' />
    <div>

    <Table className='border'>
  {/* <TableCaption>Responder.</TableCaption> */}
  <TableHeader>
    <TableRow className='w-full overflow-scroll'>
      <TableHead className="w-[100px]">Responder</TableHead>
      <TableHead>Submitted On</TableHead>
      {
        formFields.map((formField, i)=>(
            <>
                <TableHead key={i} className=''> 
                <div className='flex items-center justify-center gap-1'>
                    <span className='text-lg'>{
                    formField.type==="shortAns" ? <MdShortText/> :
                    formField.type==="longAns" ? <BsBodyText/> :
                    formField.type==="singleChoice" ? <IoMdRadioButtonOn/> :
                    formField.type==="multipleChoice" ? <IoIosCheckbox/> : 
                    formField.type==="select" ? <IoIosOptions/> : 
                    formField.type==="file" ? <FaCloudUploadAlt/> : ''
                    }</span>
                
                
                
                
                 {formField.name}
                 </div>
                 </TableHead>
            </>
        ))
      }
      {/* <TableHead>Operation</TableHead> */}

    </TableRow>
  </TableHeader>
  <TableBody>
    {
       formResponse && formResponse.map((response, i)=>(
        <>
      

    <TableRow key={i}>
    <TableCell>{response.createdMember.user.name}</TableCell>
      <TableCell>{format(new Date(response.createdAt), 'dd MMM yyyy')}</TableCell>
      {
        response.formFieldResponses.map((fieldResponse:FormFieldResponse)=>(
            <>
            {
                fieldResponse.formFieldType==="file" ? 
                <>
                
                        <TableCell>
                    
                        {fieldResponse.fieldResponse.length ||0 } file Uploaded
                    </TableCell>
                </>
      :
      <TableCell className='border'>{fieldResponse.fieldResponse.map((field:any)=>(field))}</TableCell>

            }

            </>
        ))
      }
    </TableRow>       
        
        </>
       ))
    }
    {/* <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow> */}
  </TableBody>
</Table>


    </div>




    </div>

    
  </DialogContent>
</Dialog>

    
    
    </>
  )
}

export default ViewForm