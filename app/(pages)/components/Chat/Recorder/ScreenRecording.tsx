import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState } from 'react'
import { TbRecordMail, TbRecordMailOff, TbScreenShare, TbScreenShareOff } from 'react-icons/tb'
import { ReactMediaRecorder } from 'react-media-recorder';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import Loader from '../../Loaders/Loader';
import { useParams, useRouter } from 'next/navigation';


interface ScreenProps {
  setScreenUrl:any
  setScreenName:any
}

function ScreenRecording({setScreenUrl, setScreenName}:ScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState(null);
  const [open, setOpen] = useState(false);

 
  const StartRecordingHandler =(startRecording:any)=>{
    startRecording();
    let start_Rec = document.getElementById('start_recording');
    let stop_Rec  = document.getElementById('stop_recording');
    start_Rec.style.display="none";
    stop_Rec.style.display="flex";
  }

  const StopRecordingHandler =(stopRecording:any)=>{
    stopRecording();
    let start_Rec = document.getElementById('start_recording');
    let stop_Rec  = document.getElementById('stop_recording');
    start_Rec.style.display="flex";
    stop_Rec.style.display="none";
  }
  const handleStop=(blobUrl:any, blob:any)=>{
    setBlob(blob);
    console.log(blob);
    console.log(blobUrl);
    
  }
  const params = useParams();
  const SubmitHandler =async()=>{
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', blob);
      const res = await axios.post(`/api/upload/video?serverId=${params?.id}`, formData);
      console.log(res);
  
      
      if(res.status===200){
        setLoading(false);
        console.log(res.data.fileUrl, res.data.name);
        setScreenUrl(res.data.fileUrl);
        setScreenName(res.data.name);
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      
    }
  }
  return (
    <>
{/* 
 */}
 
 <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
  <Button className=" h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center " ><TbScreenShare/></Button>
  </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] recording__container h-3/4">
        <DialogHeader>
          <DialogTitle>Screen Sharing</DialogTitle>
       
        </DialogHeader>
        <ReactMediaRecorder
      screen
      video
      onStop={handleStop}
      render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => (
        <div>
       
          <div className="video_preview">
            {
              status==="recording" ? <VideoPreview stream={previewStream} /> :
              status==="stopped" ? 
              <video src={mediaBlobUrl} controls   /> :''
            }
          

          </div>
          <div className="screenFooterButton">
    <div className='video_controls screen_control'>
        <button onClick={()=>StartRecordingHandler(startRecording)} className='record' id='start_recording'> <TbScreenShare/>Start Recording</button>
        <button onClick={()=>StopRecordingHandler(stopRecording)} className='record' id='stop_recording' style={{display:"none"}}><TbScreenShareOff/>  Stop Recording</button>
        </div>
    </div>
        </div>
        
      )}
    />

   
        <DialogFooter className='screenFooter'>
          {
            loading ? <Loader/> : 
            <Button type="submit" onClick={SubmitHandler} disabled={blob===null}>Upload</Button>

          }
        </DialogFooter>
      </DialogContent>
    </Dialog>


    </>
  )

}

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};

export default ScreenRecording;