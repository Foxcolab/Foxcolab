
import React from 'react'
import { BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXlsx } from 'react-icons/bs'
import { GrDocumentCsv } from 'react-icons/gr'

interface DocProps {
  fileUrl:string
  length : number
  key:number
  fileName:string
  type:string
}

function DocFile({fileUrl, type, length, key, fileName}:DocProps) {
  function getFileExtension(name:string) {
    let data = name.split('.').pop();
    return data;
}
const typee = getFileExtension(fileName);



  const DownlodHandler =()=>{
    window.open(fileUrl,"_blank");
  }

  return (
    <>


{


    type==="channelFile" ? 

    <>

{

type==="channelFile" && typee==="txt" ? 

<div className="doc_main_body">
<button>
<div className='doc_file_body'>
    <div className="doc_thumbnail doc_thum_imp">
    <div className="doc_icon bg-pink-700 text-white">
    <BsFiletypeTxt/>
    </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >txt</div>
     
    </div>
   </div>
   <div className='iframe_src'></div></div>
</button> 
</div>

: 
type==="channelFile" && typee==="docx" ? 
<div className="doc_main_body">
<button>
<div className='doc_file_body'>
    <div className="doc_thumbnail doc_thum_imp">
    <div className="doc_icon bg-green-700 text-white">
      <BsFiletypeDocx/> 
      </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >docx</div>
     
    </div>
   </div>
   <div className='iframe_src'></div></div>
</button> 
</div>
:
type==="channelFile" && typee==="xlsx" ?
<div className="doc_main_body">
<button>
<div className='doc_file_body'>
    <div className="doc_thumbnail doc_thum_imp">
    <div className="doc_icon bg-violet-700">
      <BsFiletypeXlsx/> 
      </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >xlsx</div>
     
    </div>
   </div>
   <div className='iframe_src'></div></div>
</button> 
</div>
: 

type==="channelFile" && typee==="csv" ? 

<div className="doc_main_body">
<button>
<div className='doc_file_body'>
    <div className="doc_thumbnail doc_thum_imp">
    <div className="doc_icon bg-yellow-700">
      <GrDocumentCsv/> 
      </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >CSV</div>
     
    </div>
   </div>
   <div className='iframe_src'></div></div>
</button> 
</div>
: ''
    
}


    </>


:

<>
{

typee==="txt" ? 

<button className='text-left' >
<div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_icon bg-pink-700 ">
      <BsFiletypeTxt/>
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >txt</div>
       
      </div>
     </div>
     <div className='iframe_src'></div></div>
</button> 
 

: 
typee==="docx" ? 
<button className='text-left' >
<div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_icon bg-green-700 ">
      <BsFiletypeDocx/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >docx</div>
       
      </div>
     </div>
     <div className='iframe_src'></div></div>
</button> :
typee==="xlsx" ?
<button className='text-left' onClick={DownlodHandler}>
<div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_icon bg-violet-700">
      <BsFiletypeXlsx/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >xlsx</div>
       
      </div>
     </div>
     <div className='iframe_src'></div></div>
</button> : 
typee==="csv" ? <button className='text-left' >
<div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_icon bg-yellow-700">
      <GrDocumentCsv/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >CSV</div>
       
      </div>
     </div>
     <div className='iframe_src'></div></div>
</button> : ''
    
}
</>


}


    
    </>
  )
}

export default DocFile