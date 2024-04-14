import Image from 'next/image'
import React from 'react'
import { FaVideo } from 'react-icons/fa'
import ReactPlayer from 'react-player'

function VideoFile({fileUrl, type, fileName}:{fileUrl:string, type:string, fileName:string}) {
  return (
    <>

      {
        type==="channelFile" ? 
        <>
        
<div className="doc_main_body">
<button>
<div className='doc_file_body'>
    <div className="doc_thumbnail doc_thum_imp">
    <div className="doc_icon bg-yellow-700">
      <FaVideo/> 
      </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >Video</div>
     
    </div>
   </div>
   <div className='iframe_src'></div></div>
</button> 
</div>

        </> :
        <> 
  <div className="img_wrapper">
            <div className="img_preview">
                <div className="video">
                <ReactPlayer url={fileUrl}  controls loop  pip  />
                </div>
           
            </div>
            </div>
        </>
      }






    </>
  )
}

export default VideoFile