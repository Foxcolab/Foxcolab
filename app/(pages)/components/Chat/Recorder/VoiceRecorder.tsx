import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaMicrophone } from 'react-icons/fa'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import axios from 'axios'
import AudioPlayer from './AudioPlayer'
import Loader from '../../Loaders/Loader'

function VoiceRecorder({setAudioUrl, setAudioName}:{setAudioUrl:any, setAudioName:any}) {
  const [audioBlob, setAudioBlob] = useState(null);
  const [blobUrl, setBlobUrl] = useState(null)
  const [loading, setLoading] = useState(false);
    const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

    const SendHandler=async()=>{
        try {
            const formData = new FormData();
            formData.append('file', audioBlob);
            // console.log(formData.get(file));

            setLoading(true);
            const res =await axios.post('/api/upload/audio', formData);
            if(res.status===200){
              setAudioUrl(res.data.fileUrl);
              setAudioName(res.data.name)
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleStop=(blobUrl, blob)=>{
      setAudioBlob(blob);
      setBlobUrl(blobUrl);
      console.log("Blob", blob);
      
    }
    const StartHandler=(startRecording)=>{
      document.getElementById('zoom_animation')?.classList.add("zoom_animation");
      document.getElementById('zoom_animation')?.classList.remove("bg-red-600");
      document.getElementById('zoom_animation')?.classList.add("bg-green-600");
      
      startRecording();
      let player = document.getElementById("audio_player");
      player.style.display="none";
    }
    const StopHandler=(stopRecording)=>{
      document.getElementById('zoom_animation')?.classList.remove("zoom_animation");
      document.getElementById('zoom_animation')?.classList.remove("bg-green-600");
      document.getElementById('zoom_animation')?.classList.add('bg-red-600');
      stopRecording();
      let player = document.getElementById("audio_player");
      player.style.display="block";

    }
  return (
    <>
    
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center"><FaMicrophone/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voice Recorder</DialogTitle>
        </DialogHeader>
        <ReactMediaRecorder
        audio
        onStop={handleStop}

        render={({ status, startRecording, stopRecording }) => (
          <>
        <div className="audio_recorder_container">
            {/* <div className="recording_status">
                {status}
            </div> */}
            <div className="recording_container ">

                <span className={"bg-red-600"} id='zoom_animation'><FaMicrophone/></span>
            </div>
            <div className="" id='audio_player' style={{display:"none"}}>
                <AudioPlayer src={blobUrl} />
            </div>
      
            <div className='recording_action'>
                {
                    status==="recording" ?
                    <button onClick={()=>StopHandler(stopRecording)} className='stop_recording' >Stop Recording</button> :
                    <button onClick={()=>StartHandler(startRecording)} className='start_recording ' >Start Recording</button>

                }
                
            </div>
            {/* <button onClick={handleUpload}>Upload Audio</button> */}
          </div>
       
       
   
           

        <DialogFooter className=''>
          {
            loading ? <Loader/> : 
          <Button type="submit" variant={"outline"}  onClick={SendHandler} disabled={blobUrl===null}>Upload</Button>
        }
        </DialogFooter>

        </>

         )}
           />
      </DialogContent>
    </Dialog>
    </>
  )
}

export default VoiceRecorder