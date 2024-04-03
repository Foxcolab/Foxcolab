import React from 'react'
import ReactPlayer from 'react-player'

function VideoFile({fileUrl, type}:{fileUrl:string, type:string}) {
  return (
    <>
  <div className="img_wrapper">
            <div className="img_preview">
                <div className="video">
                <ReactPlayer url={fileUrl}  controls loop  pip  />
                </div>
           
            </div>
            </div>
    </>
  )
}

export default VideoFile