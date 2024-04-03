"use client";
import React, { useState } from 'react'
import webcam, { useRecordWebcam } from 'react-record-webcam'
import type { RecordWebCamOptions,RecordWebCamHook  } from 'react-record-webcam';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Video } from 'lucide-react'
import { BsCameraVideoFill, BsRecordCircle } from 'react-icons/bs';
import { HiVideoCameraSlash } from 'react-icons/hi2';
import { TbRecordMail, TbRecordMailOff } from 'react-icons/tb';
import axios from 'axios';
import Loader from '../../Loaders/Loader';

const options:RecordWebCamOptions = { 
    fileName: "test", 
    fileType: "mp4", 
    mimeType: "video/webm",
    height:1080,
    width:1920
 }

 interface ScreenProps {
  setVideoUrl:any
  setVideoName:any
 }
function VideoRecorder({setVideoUrl, setVideoName}:ScreenProps) {
    const {openCamera, startRecording, stopRecording,createRecording, closeCamera, activeRecordings} = useRecordWebcam();
    const [recordingId, setRecordingId] = useState(null);
    const [recording, setRecording] = useState(null);
    const [loading, setLoading] = useState(false);

    const processFile=(file:any)=>{
      console.log(URL.createObjectURL(file));
      
      return URL.createObjectURL(file);

  }

    const SubmitHandler=async()=>{
      try {
        console.log(activeRecordings);
        setLoading(true);
        const formData = new FormData();
        console.log("Before Processed");
        
        const file = activeRecordings[0].previewRef;
        console.log(file);
        
        const src = URL.createObjectURL(activeRecordings[0]);
        console.log(src);
        
        const src2 = URL.createObjectURL(activeRecordings[0].previewRef);
        console.log(src2);
        
        formData.append('file', file);
        console.log(activeRecordings[0]);
        
        const res = await axios.post('/api/upload/video', formData);
        console.log(res);
        setVideoUrl(res.data.fileUrl);
        setVideoName(res.data.fileName);
        setLoading(false);
        
      } catch (error) {
        setLoading(false);
        
      }
    }
    const StartRecordingHandler =async()=>{
            const recording = await createRecording();
            if(!recording) return;
            const reId = recording.id;
            setRecordingId(reId);
        console.log(recording);
        
        await openCamera(recording.id);
        await startRecording(recording.id);
        let start_Rec = document.getElementById('start_recording');
        let stop_Rec  = document.getElementById('stop_recording');
        let webcam_preview = document.getElementById('webcam_preview');
        let webcam_record = document.getElementById('webcam_record');
        let submitBtn = document.getElementById('submitHandler');
        submitBtn.style.display="none";
        start_Rec.style.display="none";
        stop_Rec.style.display="flex";
        webcam_record.style.display="block";
        webcam_preview.style.display="none";
    }
    const StopRecordingHandler =async()=>{
      const res = await stopRecording(recordingId!);
      console.log("STOP",res);
      CloseCameraHandler();
      console.log(recording);
      // const res2 = window.URL.createObjectURL(res.previewRef);
      // console.log(res2);
      
      console.log(activeRecordings);
      let submitBtn = document.getElementById('submitHandler');
      submitBtn.style.display="inline";
      let start_Rec = document.getElementById('start_recording');
      let stop_Rec  = document.getElementById('stop_recording');
      let webcam_preview = document.getElementById('webcam_preview');
      let webcam_record = document.getElementById('webcam_record');
      start_Rec.style.display="flex";
      stop_Rec.style.display="none";
      webcam_record.style.display="none";
      webcam_preview.style.display="block";
  }
    const OpenCameraHandler =async()=>{
        const recording = await createRecording();
        if(!recording) return;
        setRecordingId(recording.id)
        await openCamera(recording.id);
        let open_cam = document.getElementById('open_cam');
        let close_cam = document.getElementById('close_cam');
        open_cam.style.display="none";
        close_cam.style.display="inline";
    }
    const CloseCameraHandler =()=>{
        if(!recordingId) return;
        closeCamera(recordingId);
        setRecordingId(null);
        let open_cam = document.getElementById('open_cam');
        let close_cam = document.getElementById('close_cam');
        open_cam.style.display="inline";
        close_cam.style.display="none";

    }
    

  return (
    <>
    
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center"><Video/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] recording__container">
        <DialogHeader>
          <DialogTitle>Record Video Clip</DialogTitle>
        </DialogHeader>

        <div className='video_preview'>
            {
                activeRecordings.map((recording:any)=>(
                    <div key={recording.id}>
                    <video ref={recording.webcamRef}  id='webcam_record'  />
                    <video ref={recording.previewRef} autoPlay id='webcam_preview' style={{display:"none"}}  controls />
             </div>
                ))
            }

           
        </div>
        <div className='video_controls'>
        <button onClick={OpenCameraHandler} className='open_cam' id='open_cam'><HiVideoCameraSlash/></button>
        <button onClick={CloseCameraHandler} className='open_cam' id='close_cam' style={{display:"none"}}><BsCameraVideoFill/></button>
        <button onClick={StartRecordingHandler} className='record' id='start_recording'> <span><TbRecordMail/></span> Start Recording</button>
        <button onClick={StopRecordingHandler} className='record' id='stop_recording' style={{display:"none"}}> <span><TbRecordMailOff/> </span> Stop Recording</button>
        </div>
        
        <DialogFooter>
            {
              loading ? <Loader /> : 
              <Button onClick={SubmitHandler} id='submitHandler' style={{display:"none"}}>
                Upload
              </Button> 
            }
            
            
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </>

  )
}






export default VideoRecorder