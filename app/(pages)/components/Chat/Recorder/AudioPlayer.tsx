import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


function AudioPlayerr({src}:{src:string}) {
  return (
    <>
    
    <AudioPlayer
    showSkipControls={false}
    showJumpControls={false}
    autoPlayAfterSrcChange={false}
    showFilledVolume={false}
    src={src}
    hasDefaultKeyBindings={false}
    loop={false}
    // onPlay={e => console.log("onPlay")}
    // other props here
  />
    </>
  )
}

export default AudioPlayerr