import React from 'react'
import ReactPlayer from 'react-player'
import AudioPlayerr from '../Recorder/AudioPlayer'
import { SiApplemusic } from 'react-icons/si'
interface Props {
    key:number
    fileUrl:string
    type:string
}
function Mp3File({key, fileUrl, type}:Props) {
  return (
    <>
  

    {
      type==="Grid" ? 
      <>
<div className='file_Grid_lw_icon'>
     <SiApplemusic/> 
     </div>
      </> :
      <> 
  
  <div className="audio_preview">
        <div className="">
            <div className="">
              <AudioPlayerr src={fileUrl} />
            </div>
        </div>
    </div>
      </>
    }
    
    </>
  )
}

export default Mp3File