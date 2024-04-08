import React from 'react'
import ReactPlayer from 'react-player'
import AudioPlayerr from '../Recorder/AudioPlayer'
interface Props {
    key:number
    fileUrl:string
    type:string
}
function Mp3File({key, fileUrl, type}:Props) {
  return (
    <>
    
    <div className="audio_preview">
        <div className="">
            <div className="">
              <AudioPlayerr src={fileUrl} />
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Mp3File