"use client";
import React, { useEffect, useRef } from 'react'
import { FaRegFilePdf } from 'react-icons/fa6';
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog"




interface Props {
    fileUrl:string
    length: number
    key:number
    fileName:string
    type:string
}


function PdfFile({fileUrl, length, key, fileName, type}:Props) {
  

  return (
    <>
    {
      length===1  ? 
     
      
      <Dialog>
      <DialogTrigger asChild>
      
     
      <div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_thum_icon">
      <FaRegFilePdf/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >PDF</div>
       
      </div>
     </div>
     <div className='iframe_src'>
    
    <iframe src={fileUrl} />

     </div>

     </div>
      </DialogTrigger>
      <DialogContent className="pdf_dialog"  >
      <div>
      <embed src={fileUrl}  type="application/pdf" className='embed_pdf' />
      </div>
      </DialogContent>
    </Dialog>
      
      :
  
              <Dialog>
              <DialogTrigger asChild>
              <div className='pdf_container'>
      <div className="doc_thumbnail">
      <div className="doc_thum_icon">
      <FaRegFilePdf/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >PDF</div>
       
      </div>
     </div>
     </div>
              </DialogTrigger>
              <DialogContent className="image_dialog"  >
               <div className="another_img_blur" style={{backgroundImage:`url(${fileUrl})`}}>
               </div>
        
               <div className="dialog_img_container">
               <embed src={fileUrl}  type="application/pdf" className='embed_pdf' />


               </div>
              
              </DialogContent>
            </Dialog>
  
  }
  
    
    </>
  )
}

export default PdfFile