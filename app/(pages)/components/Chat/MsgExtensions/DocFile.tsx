
import React from 'react'
import { BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXlsx } from 'react-icons/bs'
import { GoFileZip } from 'react-icons/go'
import { GrDocumentCsv } from 'react-icons/gr'
import { VscJson } from 'react-icons/vsc'

interface DocProps {
  fileUrl:string
  fileName:string
  type:string
  fileType: string
}

function DocFile({fileUrl, type, fileType, fileName}:DocProps) {
  function getFileExtension(name:string) {
    let data = name.split('.').pop();
    return data;
}
// const fileType = getFileExtension(fileName);



  const DownlodHandler =()=>{
    window.open(fileUrl,"_blank");
  }

  return (
    <>


{


    type==="channelFile" ? 

    <>

{

type==="channelFile" && fileType==="txt" ? 

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
type==="channelFile" && fileType==="docx" ? 
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
type==="channelFile" && fileType==="xlsx" ?
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

type==="channelFile" && fileType==="csv" ? 

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
:

type==="channelFile" && fileType==="zip" ?
<div className="doc_main_body">
<button>
<div className='doc_file_body'>
    <div className="doc_thumbnail doc_thum_imp">
    <div className="doc_icon bg-yellow-700">
      <GoFileZip/> 
      </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >Zip</div>
     
    </div>
   </div>
   <div className='iframe_src'></div></div>
</button> 
</div> :
type==="channelFile" && fileType==="json" ?
<div className="doc_main_body">
<button>
<div className='doc_file_body'>
    <div className="doc_thumbnail doc_thum_imp">
    <div className="doc_icon bg-yellow-700">
      <VscJson/> 
      </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >Json</div>
     
    </div>
   </div>
   <div className='iframe_src'></div></div>
</button> 
</div> :






''
    
}


    </>


:


   type==="Grid" ?
   <>

    {
      fileType==="txt" ?
      <div className="file_Grid_lw_icon">
      <BsFiletypeTxt/>
      </div> :
      fileType==="docx" ?
      <div className="file_Grid_lw_icon">
        <BsFiletypeDocx/> 
      </div> :
      fileType==="xlsx" ?
      <div className="file_Grid_lw_icon">
        <BsFiletypeXlsx/> 
      </div> :
      fileType==="csv" ?
      <div className='file_Grid_lw_icon'>
        <GrDocumentCsv/> 
      </div> :
      fileType==="json" ?
      <div className="">
        <VscJson />

      </div> :
      fileType==="zip" ?
      <div className="">
        <GoFileZip />

      </div> :
     ''

    }

   </>

    :


<>
{

fileType==="txt" ? 

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
fileType==="docx" ? 
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
fileType==="xlsx" ?
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
fileType==="csv" ? <button className='text-left' >
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
</button> : 

fileType==="zip" ? <button className='text-left' >
<div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_icon bg-yellow-700">
      <GoFileZip/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >Zip</div>
       
      </div>
     </div>
     <div className='iframe_src'></div></div>
</button> :

fileType==="json" ? <button className='text-left' >
<div className='pdf_iframe'>
      <div className="doc_thumbnail doc_thumbnail_impo w-full">
      <div className="doc_icon bg-yellow-700">
      <VscJson/> 
      </div>
      <div className="doc_thum_nm">
       <div className="extn">{fileName}</div>
       <div >Json</div>
       
      </div>
     </div>
     <div className='iframe_src'></div></div>
</button> :

''
    
}
</>


}


    
    </>
  )
}

export default DocFile