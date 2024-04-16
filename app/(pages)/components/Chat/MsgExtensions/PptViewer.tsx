"use client";
import React, { useEffect, useRef } from 'react'
import {BsFileEarmarkPptFill} from "react-icons/bs"
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


function PptViewer({fileUrl, length, key, fileName, type}:Props) {
  const DownlodHandler =()=>{
    window.open(fileUrl,"_blank");
  }

  return (
    <>


    {

      type==="channelFile" ? <>
      
      <div className="doc_main_body">
<button>
<div className='doc_file_body'>
    <div className="doc_thumbnail doc_thum_imp">
    <div className="doc_icon bg-orange-700">
      <BsFileEarmarkPptFill/> 
      </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >PPT</div>
     
    </div>
   </div>
   <div className='iframe_src'></div></div>
</button> 
</div>
       </> 
          :
      type==="Grid" ? 
      <>
      <div className="file_Grid_lw_icon">
      <BsFileEarmarkPptFill/> 
      </div>
      
      </> 

        :
      
      <> 
      <button className='text-left'onClick={DownlodHandler}>
<div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_icon bg-orange-700">
      <BsFileEarmarkPptFill/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >PPT</div>
       
      </div>
     </div>
     <div className='iframe_src'>
        



     </div>

     </div>
</button>
      
      </>

    }








    {/* {
      length===1  ? 
     
      
      <Dialog>
      <DialogTrigger asChild>
      
     
      <div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_icon bg-orange-700">
      <BsFileEarmarkPptFill/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >PPT</div>
       
      </div>
     </div>
     <div className='iframe_src'>
        



     </div>

     </div>
      </DialogTrigger>
      <DialogContent className="pdf_dialog"  >
      <div>
      <embed src={fileUrl}  type="ppt" className='embed_pdf' />
      </div>
      </DialogContent>
    </Dialog>
      
      :
  
              <Dialog>
              <DialogTrigger asChild>
              <div className='pdf_container'>
      <div className="doc_thumbnail">
      <div className="doc_thum_icon">
      <BsFileEarmarkPptFill/> 
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
               <embed src={fileUrl}  type="ppt" className='embed_pdf' />


               </div>
              
              </DialogContent>
            </Dialog>
  
  } */}
  
    
    </>
  )
}

export default PptViewer;