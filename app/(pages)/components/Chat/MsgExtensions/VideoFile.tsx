import Image from 'next/image'
import React from 'react'
import { FaVideo } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Video } from 'lucide-react'


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

        type==="Grid" ? 
        <>

    <Dialog>
<DialogTrigger asChild>

{/* <Image src={fileUrl} alt='' width={100} height={100} unoptimized  quality={50}  />  */}
     <div className='file_Grid_lw_icon'>
     <FaVideo/> 
     </div>
     
     

</DialogTrigger>
<DialogContent className="max-w-[705px]"  >
  <DialogTitle>
    {fileName}
  </DialogTitle>
<div>
  
<div className="grid_video_player">
                <ReactPlayer url={fileUrl}  controls loop  pip  />
                </div>

</div>

</DialogContent>
</Dialog>


        
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