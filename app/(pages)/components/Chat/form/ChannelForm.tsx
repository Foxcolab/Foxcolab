import { Channel, Form, FormField, Later, Member, Message, PinnedPost, User, formResponse } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import HoverMessage from '../Hover/HoverMessage';
import LetterAvatar from '../../UserAvatar/LetterAvatar';
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AiFillFilePpt, AiOutlineUpload } from 'react-icons/ai';
import { PiFileDoc, PiUploadSimpleBold } from 'react-icons/pi';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { FaFilePdf, FaFileVideo } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { BsBookmarkFill, BsFileEarmarkZip, BsFiletypeMp3, BsFiletypeWav, BsFiletypeXlsx } from 'react-icons/bs';
import { RiFileImageLine } from 'react-icons/ri';
import Loader from '../../Loaders/Loader';
import ViewForm from './ViewForm';
import { TbPinnedFilled } from 'react-icons/tb';
import { GoDotFill } from 'react-icons/go';


interface Props {
  id:string
  form: Form & {
    formFields:FormField[]
  } & {
    formResponses:formResponse[]
  }
  member: Member & {
      user: User;
  };
  timestamp: string;
  deleted: boolean;
  currentMember: Member;
  socketUrl: string;
  socketQuery: Record<string, string>;
  message:Message
  managers:String[]
  PinnedPosts: PinnedPost[];
  mySavedPost: Later[]
  myChannels:Channel[]
  allServerMember:Member[]
  setThreadMessage:any
  schemaType:"Channel" | "Threads"
  whoCanDeleteMessage:boolean
  whoCanPinnedPost:boolean
  


}

function ChannelForm({id,member, timestamp, deleted, currentMember, socketQuery, socketUrl, message, managers, PinnedPosts, mySavedPost, myChannels, allServerMember, setThreadMessage, schemaType, whoCanDeleteMessage, whoCanPinnedPost, form}:Props) {
  

  const [formResponse, setFormResponse] = useState([{formFieldId:'', response:[''],type:'' }]);
  const formFields = form.formFields;
  const [reachedMax, setReachMax] = useState(false);
  const [previewUrl, setPreviewUrl] = useState( []);
  const [files, setFiles] = useState([]);
  const [uploading, setUplodaing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const router = useRouter();
  const params = useParams();

  
  const [formResponseId, setFormResponseId] = useState('');
  const [fieldResponse, setFieldResponse] = useState([]);

  useEffect(()=>{
    for(let i=0; i<form.formResponses.length; i++){
      if(form.formResponses[i].createdBy===currentMember.id){
        setFieldResponse(form.formResponses[i].formFieldResponses);
        setFormResponseId(form.formResponses[i].id);
      }
    }
  }, [])








  useEffect(()=>{
    let temp = []
    for(let i=0; i<formFields.length; i++){
      temp.push({formFieldId:formFields[i].id, response:[''],type:formFields[i].type, files:[] });
    }
    setFormResponse(temp);
  }, [])

  let isSubmitted = false;
  let myFormResponse:any[] = []
  for(let i=0; i<form?.formResponses?.length; i++){
    if(form?.formResponses[i].createdBy===member.id){
      isSubmitted=true;
      myFormResponse=form.formResponses[i].formFieldResponses;
      // setFieldResponse(form.formResponses[i].formFieldResponses);
      break;
    }
  }








  const isAdmin = currentMember.id===member.id;
  const currentTime = new Date();
  let isExpired = false;
  if(form.expiryDate!==null){
      const expiredDate = new Date(form.expiryDate);
      if(expiredDate.getTime()<currentTime.getTime()){
          isExpired = true;
      }
  }

  let isPinnedPost=false;
let pinnedPost;
PinnedPosts && PinnedPosts.forEach(p => {
if(schemaType==="Threads"){
  if(p.threadId===id){
    isPinnedPost=true;
    pinnedPost=p;
    // pinnedPostUser=p.user;
  }
}else {
  if(p.messageId===id){
    isPinnedPost=true;
    // pinnedPostUser=p?.createdUser?.user;
    pinnedPost=p;
  }
}

});

let isSavedPost=false;
let savedPost;

mySavedPost && mySavedPost.forEach(p => {
if(schemaType==="Threads"){
  if(p.threadId===message.id){
    isSavedPost=true;
    savedPost=p;
  }
}else {
  if(p.messageId===id){
    isSavedPost=true;
    savedPost=p;
  }
}
});

console.log(mySavedPost, id);

  const onSubmitHandler =async()=>{
    try {
      setLoading(true);
      const res = await axios.post(`/api/socket/messages/forms/response/new?serverId=${params?.id}&formId=${form.id}&messageId=${id}`, {fieldResponses:formResponse});
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      
    }





  }

  const UpdateHandler =async()=>{
    try {
    let votes= []
    let checkbox = document.querySelectorAll('.checkbox');
    let radio = document.querySelectorAll('.radio');

    setLoading(true);
    const res = await axios.post(`/api/socket/messages/forms/response/update?serverId=${params?.id}&formId=${form.id}&messageId=${id}&responseId=${formResponseId}`, {fieldResponses:formResponse});
    setLoading(false);
    router.refresh();
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}


  const onChangeHandler = (index:number,fieldId:string, value:string, type:string )=>{
    if(type==="shortAns" || type==="longAns" || type==="select"){
      const values = [...formResponse];
      if(values[index].formFieldId === fieldId){
        values[index].response  = [value]; 
      }
    }else if(type==="singleChoice"){
      let radio = document.querySelectorAll('#radio');
      let counts = []
      for(let i=0; i<radio.length; i++){
        if(radio[i].checked===true){
          counts.push(radio[i].value);
        }
      }
      const values = [...formResponse];
      if(values[index].formFieldId === fieldId){
        values[index].response = counts; 
      }
      if(isSubmitted===true){
        myFormResponse[index].fieldResponse = counts;
      }

    }else if(type==="multipleChoice"){
      let checkbox = document.querySelectorAll('#checkbox');
      let counts = []
      for(let i=0; i<checkbox.length; i++){
        if(checkbox[i].checked){
          counts.push(checkbox[i].value);
        }
      }
      const values = [...formResponse];
      if(values[index].formFieldId === fieldId){
        values[index].response  = counts; 
      }

      if(isSubmitted===true){
        myFormResponse[index].fieldResponse = counts;
      }
    } else if(type==="file"){

    }else {

    }
    
    
  }
  const processFile=(file:any)=>{
    return URL.createObjectURL(file);

}
  const FileHandler = async(e: React.ChangeEvent<HTMLInputElement>, index:number, maxSize:number) => {
    setReachMax(false);
    if(!e.target.files || e.target.files.length===0){
      return;
    }
  
    const filess = e.target.files;
    if(filess[0].size >=(maxSize*1024*1024)){
      setReachMax(true);
      return;
    }
    const formData = new FormData();
    for (const file of Array.from(filess)) {
      files.push(file);
      
      previewUrl.push(processFile(file));
      formData.append('file', file);
    }
    
    router.refresh();
    try {
      setUplodaing(true);
      const res = await axios.post(`/api/upload?serverId=${params?.id}`, formData);
      if(res.status===200){
        // form.setValue("fileUrl", res.data.fileUrl);
        formResponse[index].response = res.data.fileUrl;
      }
      setUplodaing(false);
    } catch (error) {
      setUplodaing(false)
    }
  };


  const RemoveImage =(id:number, index:number)=>{
  if (id > -1) {
    files.splice(id, 1);
    previewUrl.splice(id,1);
    formResponse[index].response.splice(id, 1);
  }
 
  }

  const CalcTime =(dt:any)=>{
    if(dt===undefined || dt===null) return;
    const currentTime= new Date();
    const date = new Date(dt);  
    const diff = date.getTime() - currentTime.getTime() ;
    let format = "Minutes";
    var timeDifference = Math.abs(date.getTime() - currentTime.getTime());
    const cp = date.getTime() - currentTime.getTime();
    // Calculate differences in seconds, minutes, hours, and days
    var secondsDifference = Math.floor(timeDifference / 1000);
    var minutesDifference = Math.floor(secondsDifference / 60);
    var hoursDifference = Math.floor(minutesDifference / 60);
    var daysDifference = Math.floor(hoursDifference / 24);
  
    // Format the result based on the magnitude of the difference
    let text = "";
    if (secondsDifference < 60) {
      text = secondsDifference + " seconds";
    } else if (minutesDifference < 60) {
      text = minutesDifference + " minutes";
    } else if (hoursDifference < 24) {
      text = hoursDifference + " hours";
    } else {
      text = daysDifference + " days";
    }

  if(cp<0){
        return <span className="text-red-500 flex items-center"><GoDotFill/> Due {text} ago</span>  
      }
    return <span className="flex items-center"><GoDotFill/> Due in {text}</span>;


  }



  return (
    <>
    
    {
      schemaType==="Channel" ? <> 
      <div className="relative group flex items-center p-2 mb-2  transition w-full msg_cnbdy" id={(isPinnedPost && isSavedPost)  ? "pinnedMsgBody": isSavedPost && !isPinnedPost ? "savedMsgBody" :  isPinnedPost && !isSavedPost ?"pinnedMsgBody":  ""}>
    <HoverMessage message={message} currentMember={currentMember} socketQuery={socketQuery} socketUrl={socketUrl} isPinnedPost={isPinnedPost} isSavedPost={isSavedPost} myChannels={myChannels} allServerMember={allServerMember} setThreadMessage={setThreadMessage} schemaType={schemaType} whoCanPinnedPost={whoCanPinnedPost} whoCanDeleteMessage={whoCanDeleteMessage} pinnedPost={pinnedPost} savedPost={savedPost}>
    <div className="w-full">
    {
      isPinnedPost && isSavedPost ?  <p className="text-xs pb-2 text-yellow-700 flex items-center"><TbPinnedFilled/> Pinned By <b> &nbsp;{pinnedPost?.createdUser?.user?.name}</b></p> : isPinnedPost && !isSavedPost ?  <p className="text-xs pb-2 text-yellow-700 flex items-center"><TbPinnedFilled/> Pinned By <b> &nbsp;{pinnedPost?.createdUser?.user?.name}</b></p> : isSavedPost && !isPinnedPost ? <p className="text-xs pb-2 text-green-600 flex items-center"><BsBookmarkFill/> Saved for later  {CalcTime(savedPost?.time)} </p>  : ''
    }
    <div className="group flex gap-x-2 items-start w-full ">

<div  className="cursor-pointer hover:drop-shadow-md transition">

  {
    (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
    
    <LetterAvatar 
    name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name }
   size={40}
    />
    
    : 
  <UserAvatar src={member.user.profilePic} />

  }



</div>
<div className="flex flex-col w-full">
  <div className="flex items-center gap-x-2 ">
    <div className="flex items-center">
      <p  className=" chat_un">
        {!member?.user ? "User": member?.user.name}
      </p>
      {/* <ActionTooltip label={member.role}>
        {roleIconMap[member?.role] || "user"}
      </ActionTooltip> */}
    </div>
    <span className=" timestamp">
      {timestamp}
    </span>
  </div>
  

      {/* FORM CONTENT  */}
    
      {
       isSubmitted===true ? 

      isEditing ? <>
      
      <div className="border rounded text-sm form_container_background">
        <div className='text-lg pb-1 font-semibold'>{form.title} </div>
        <hr />
        <div className='pt-1'>{form.description}</div>
    
      </div>
      
      
      {
          formFields &&  formFields.map((formField, i)=>(
            <div key={formField.id} className='border rounded text-sm form_container_background'>
              {
                formField.type==="shortAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Input type='text' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} defaultValue={myFormResponse[i].fieldResponse[0]} /></div>
                </div>
                </> :
                formField.type==="longAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Textarea  className='resize-none' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} defaultValue={myFormResponse[i].fieldResponse[0]}  /></div>
                </div>
                </> :
                formField.type==="singleChoice" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                    {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id} onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} checked={myFormResponse[i].fieldResponse.includes(option)}  /></span>{option} </div>
                      ))
                    }
      
                  </div>
                </div>
                </> :
                formField.type==="multipleChoice" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} checked={myFormResponse[i].fieldResponse.includes(option)}  /></span> {option} </div>
                      ))
                    }
                  </div>
                </div>
                </> :
                formField.type==="select" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  <Select onValueChange={(e)=>onChangeHandler(i, formField.id, e, formField.type)} defaultValue={myFormResponse[i].fieldResponse[0]}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={myFormResponse[i].fieldResponse[0]} />
            </SelectTrigger>
            <SelectContent className='w-full p-4'>
              <SelectGroup >
                {
                  formField.options.map((option, j)=>(
                    <SelectItem key={j} value={option} className=''> <div className='flex items-center gap-2'> {option}</div> </SelectItem>
                  ))
                }
                
              </SelectGroup>
            </SelectContent>
          </Select>
                  </div>
                </div>
                </> :
                formField.type==="file" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                 
                 
      
      
      
                  </div>
      
                </> :
                ''
      
      
              }
      
            </div>
          ))
        }
          <div className='form_container_background flex justify-between items-center border rounded'>
       <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold' onClick={()=>setEditing(false)}>Cancel</button>
       <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold bg-green-500 text-white' onClick={UpdateHandler}>Save Changes</button>
      </div>
      
       </> :
      <div>

      <div className="border rounded text-sm form_container_background">
        <div className='text-lg pb-1 font-semibold'>{form.title} </div>
        <hr />
        <div className='pt-1'>{form.description}</div>
    
      </div>
      {formFields?.length!==0  && 
      
        formFields.map((formField, i)=>(
          <div key={i}>

            
          <div key={formField.id} className='border rounded text-sm form_container_background'>
            {
              formField.type==="shortAns" ?
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'><Input type='text' disabled value={myFormResponse[i].fieldResponse[0]} /></div>
              </div>
              </> :
              formField.type==="longAns" ?
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'><Textarea  className='resize-none' disabled value={myFormResponse[i].fieldResponse[0]}  /></div>
              </div>
              </> :
              formField.type==="singleChoice" ?
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'>
                  {
                    formField.options.map((option, j)=>(
                      <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id}  checked={option===myFormResponse[i].fieldResponse[0]} disabled /></span>{option} </div>
                    ))
                  }
    
                </div>
              </div>
              </> :
              formField.type==="multipleChoice" ? 
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'>
                {
                    formField.options.map((option, j)=>(
                      <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox'  checked={option===myFormResponse[i].fieldResponse[0]} disabled  /></span> {option} </div>
                    ))
                  }
                </div>
              </div>
              </> :
              formField.type==="select" ? 
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'>
                <Select defaultValue={myFormResponse[i].fieldResponse[0]} disabled >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Field Type" />
          </SelectTrigger>
          <SelectContent className='w-full p-4'>
            <SelectGroup >
              {
                formField.options.map((option, j)=>(
                  <SelectItem key={j} value={option} className=''> <div className='flex items-center gap-2'> {option}</div> </SelectItem>
                ))
              }
              
            </SelectGroup>
          </SelectContent>
        </Select>
                </div>
              </div>
              </> :
              formField.type==="file" ? 
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='my-2'>
                <div className='border  h-8 flex justify-center items-center rounded w-[8rem]'>
                  Uploaded {myFormResponse[i].fieldResponse.length} file
                </div>

    
    
                </div>
    
              </div>
              </> :
              ''
    
    
            }
    
          </div>
            
      
        
          </div>
          
        ))
      
      }


      <div className='form_container_background flex justify-between items-center border rounded'>
       <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold' onClick={()=>setEditing(true)}>Edit Response</button>
       {
        isAdmin && <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold bg-yellow-500 text-white' onClick={()=>setViewDialog(true)}>View Response ({form.formResponses.length || 0})</button>
       }
       
      </div>
    
    
 
    
    
      </div>  


       :


      //  submitted False 
        <div>

        <div className="border rounded text-sm form_container_background">
          <div className='text-lg pb-1 font-semibold'>{form.title} </div>
          <hr />
          <div className='pt-1'>{form.description}</div>
      
        </div>
      
        {
          formFields &&  formFields.map((formField, i)=>(
            <div key={formField.id} className='border rounded text-sm form_container_background'>
              {
                formField.type==="shortAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Input type='text' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} /></div>
                </div>
                </> :
                formField.type==="longAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Textarea  className='resize-none' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)}  /></div>
                </div>
                </> :
                formField.type==="singleChoice" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                    {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id} onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)}  /></span>{option} </div>
                      ))
                    }
      
                  </div>
                </div>
                </> :
                formField.type==="multipleChoice" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} /></span> {option} </div>
                      ))
                    }
                  </div>
                </div>
                </> :
                formField.type==="select" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  <Select onValueChange={(e)=>onChangeHandler(i, formField.id, e, formField.type)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Field Type" />
            </SelectTrigger>
            <SelectContent className='w-full p-4'>
              <SelectGroup >
                {
                  formField.options.map((option, j)=>(
                    <SelectItem key={j} value={option} className=''> <div className='flex items-center gap-2'> {option}</div> </SelectItem>
                  ))
                }
                
              </SelectGroup>
            </SelectContent>
          </Select>
                  </div>
                </div>
                </> :
                formField.type==="file" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='my-2'>
                  <div className='preview_files mb-2'>
      
      
      
      
                    {
                      files && files.map((file, j)=>(
                        <>
                        {
                          files[j]?.name.endsWith(".pdf") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><FaFilePdf/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j].name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".docx") || files[j]?.name.endsWith(".doc") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><PiFileDoc/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".xls") || files[j]?.name.endsWith(".xlsx") || files[j]?.name.endsWith(".csv") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><BsFiletypeXlsx/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".ppt") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><AiFillFilePpt/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".mp3")? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><BsFiletypeMp3/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".wav") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><BsFiletypeWav/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.type.startsWith("image/") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><RiFileImageLine/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j].name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.type.startsWith("video/") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><FaFileVideo/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j].name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".zip") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><BsFileEarmarkZip/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j].name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
      
                          <> </> 
                        }
                        </>
                      ))
                    }
                  </div>
      
                  {
                    formField.fileType==="PDF" ?  <>
                    {
                      formField?.fileCount>files.length &&  <label className="custum-file-upload flex items-center gap-1 " htmlFor="file">
                      <div className='border rounded flex items-center gap-1 px-2 py-1 text-green-500 border-green-500 hover:bg-green-500 hover:text-white'><span className='text-lg'>< PiUploadSimpleBold/></span> Add File</div>
                      <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                      accept="application/pdf, .pdf, .PDF"
                      />
                      </label> 
                    }
                  
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                  
                    </> :
                    formField.fileType==="Spreadsheet" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="application/vnd.ms-excel,  .xlsx, .csv, .xls"
                  />
                  </label>
                    }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Word" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept=" .doc, .docx "
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Presentation" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept=" .ppt, .PPT "
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Image" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="image/jpeg,image/png,image/webp, image/svg, image/gif"
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Audio" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept=".mp3, .wav"
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Video" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="video/mp4,video/webm"
                  />
                  </label>
                    }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Zip" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="application/zip, .zip"
                  />
                  </label>
                    }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                  <>
                  {
                      formField?.fileCount>files.length && 
                  <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="image/jpeg,image/png,image/webp, image/svg, image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt, .svg, .mp3, .wav "
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                  
                  
                  </>
                  }
      
      
                  </div>
      
                </div>
                </> :
                ''
      
      
              }
      
            </div>
          ))
        }
      
      
      
      
      <div className='mt-4 flex items-center justify-between form_container_background border rounded-md'>
      {
        loading ? <Loader/> :<button onClick={onSubmitHandler} className='px-4 py-[0.3rem] rounded bg-green-500 text-white'>Submit </button>
      }

     {
      isAdmin && <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold bg-yellow-500 text-white' onClick={()=>setViewDialog(true)}>View Response ({form.formResponses.length || 0})</button>
     }
      </div>
      
      
        </div>


      // Submitteddd 

          







      }




  </div>
  </div>
  </div>
    </HoverMessage>
    </div>
    
      
      </> : <>

      <div className="relative group flex items-center p-2 mb-2  transition w-full msg_cnbdy" >
     <div className="w-full">
    {
      isPinnedPost && isSavedPost ?  <p className="text-xs pb-2 text-yellow-700 flex items-center"><TbPinnedFilled/> Pinned By <b> &nbsp;{pinnedPost?.createdUser?.user?.name}</b></p> : isPinnedPost && !isSavedPost ?  <p className="text-xs pb-2 text-yellow-700 flex items-center"><TbPinnedFilled/> Pinned By <b> &nbsp;{pinnedPost?.createdUser?.user?.name}</b></p> : isSavedPost && !isPinnedPost ? <p className="text-xs pb-2 text-green-600 flex items-center"><BsBookmarkFill/> Saved for later  {CalcTime(savedPost?.time)} </p>  : ''
    }
    <div className="group flex gap-x-2 items-start w-full ">

<div  className="cursor-pointer hover:drop-shadow-md transition">

  {
    (member===undefined || member.user===undefined || member?.user?.profilePic===null) ? 
    
    <LetterAvatar 
    name={(member===undefined || member?.user===undefined || member?.user?.name===undefined) ? 'Y': member.user.name }
   size={40}
    />
    
    : 
  <UserAvatar src={member.user.profilePic} />

  }



</div>
<div className="flex flex-col w-full">
  <div className="flex items-center gap-x-2 ">
    <div className="flex items-center">
      <p  className=" chat_un">
        {!member?.user ? "User": member?.user.name}
      </p>
      {/* <ActionTooltip label={member.role}>
        {roleIconMap[member?.role] || "user"}
      </ActionTooltip> */}
    </div>
    <span className=" timestamp">
      {timestamp}
    </span>
  </div>
  

      {/* FORM CONTENT  */}
    
      {
       isSubmitted===true ? 

      isEditing ? <>
      
      <div className="border rounded text-sm form_container_background">
        <div className='text-lg pb-1 font-semibold'>{form.title} </div>
        <hr />
        <div className='pt-1'>{form.description}</div>
    
      </div>
      
      
      {
          formFields &&  formFields.map((formField, i)=>(
            <div key={formField.id} className='border rounded text-sm form_container_background'>
              {
                formField.type==="shortAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Input type='text' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} defaultValue={myFormResponse[i].fieldResponse[0]} /></div>
                </div>
                </> :
                formField.type==="longAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Textarea  className='resize-none' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} defaultValue={myFormResponse[i].fieldResponse[0]}  /></div>
                </div>
                </> :
                formField.type==="singleChoice" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                    {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id} onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} checked={myFormResponse[i].fieldResponse.includes(option)}  /></span>{option} </div>
                      ))
                    }
      
                  </div>
                </div>
                </> :
                formField.type==="multipleChoice" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} checked={myFormResponse[i].fieldResponse.includes(option)}  /></span> {option} </div>
                      ))
                    }
                  </div>
                </div>
                </> :
                formField.type==="select" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  <Select onValueChange={(e)=>onChangeHandler(i, formField.id, e, formField.type)} defaultValue={myFormResponse[i].fieldResponse[0]}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={myFormResponse[i].fieldResponse[0]} />
            </SelectTrigger>
            <SelectContent className='w-full p-4'>
              <SelectGroup >
                {
                  formField.options.map((option, j)=>(
                    <SelectItem key={j} value={option} className=''> <div className='flex items-center gap-2'> {option}</div> </SelectItem>
                  ))
                }
                
              </SelectGroup>
            </SelectContent>
          </Select>
                  </div>
                </div>
                </> :
                formField.type==="file" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                 
                 
      
      
      
                  </div>
      
                </> :
                ''
      
      
              }
      
            </div>
          ))
        }
          <div className='form_container_background flex justify-between items-center border rounded'>
       <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold' onClick={()=>setEditing(false)}>Cancel</button>
       <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold bg-green-500 text-white' onClick={UpdateHandler}>Save Changes</button>
      </div>
      
       </> :
      <div>

      <div className="border rounded text-sm form_container_background">
        <div className='text-lg pb-1 font-semibold'>{form.title} </div>
        <hr />
        <div className='pt-1'>{form.description}</div>
    
      </div>
      {formFields?.length!==0  && 
      
        formFields.map((formField, i)=>(
          <div key={i}>

            
          <div key={formField.id} className='border rounded text-sm form_container_background'>
            {
              formField.type==="shortAns" ?
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'><Input type='text' disabled value={myFormResponse[i].fieldResponse[0]} /></div>
              </div>
              </> :
              formField.type==="longAns" ?
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'><Textarea  className='resize-none' disabled value={myFormResponse[i].fieldResponse[0]}  /></div>
              </div>
              </> :
              formField.type==="singleChoice" ?
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'>
                  {
                    formField.options.map((option, j)=>(
                      <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id}  checked={option===myFormResponse[i].fieldResponse[0]} disabled /></span>{option} </div>
                    ))
                  }
    
                </div>
              </div>
              </> :
              formField.type==="multipleChoice" ? 
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'>
                {
                    formField.options.map((option, j)=>(
                      <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox'  checked={option===myFormResponse[i].fieldResponse[0]} disabled  /></span> {option} </div>
                    ))
                  }
                </div>
              </div>
              </> :
              formField.type==="select" ? 
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='mt-2'>
                <Select defaultValue={myFormResponse[i].fieldResponse[0]} disabled >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Field Type" />
          </SelectTrigger>
          <SelectContent className='w-full p-4'>
            <SelectGroup >
              {
                formField.options.map((option, j)=>(
                  <SelectItem key={j} value={option} className=''> <div className='flex items-center gap-2'> {option}</div> </SelectItem>
                ))
              }
              
            </SelectGroup>
          </SelectContent>
        </Select>
                </div>
              </div>
              </> :
              formField.type==="file" ? 
              <>
              <div>
                <label htmlFor="" className='font-semibold'>{formField.name}</label>
                <div style={{color:"var(--color3)"}}>{formField.description}</div>
                <div className='my-2'>
                <div className='border  h-8 flex justify-center items-center rounded w-[8rem]'>
                  Uploaded {myFormResponse[i].fieldResponse.length} file
                </div>

    
    
                </div>
    
              </div>
              </> :
              ''
    
    
            }
    
          </div>
            
      
        
          </div>
          
        ))
      
      }


      <div className='form_container_background flex justify-between items-center border rounded'>
       <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold' onClick={()=>setEditing(true)}>Edit Response</button>
       {
        isAdmin && <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold bg-yellow-500 text-white' onClick={()=>setViewDialog(true)}>View Response ({form.formResponses.length || 0})</button>
       }
       
      </div>
    
    
 
    
    
      </div>  


       :


      //  submitted False 
        <div>

        <div className="border rounded text-sm form_container_background">
          <div className='text-lg pb-1 font-semibold'>{form.title} </div>
          <hr />
          <div className='pt-1'>{form.description}</div>
      
        </div>
      
        {
          formFields &&  formFields.map((formField, i)=>(
            <div key={formField.id} className='border rounded text-sm form_container_background'>
              {
                formField.type==="shortAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}  :</label><br/>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Input type='text' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} /></div>
                </div>
                </> :
                formField.type==="longAns" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'><Textarea  className='resize-none' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)}  /></div>
                </div>
                </> :
                formField.type==="singleChoice" ?
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                    {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='radio' className='h-[1.1rem] w-[1.1rem] ' id='radio' value={option} name={formField.id} onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)}  /></span>{option} </div>
                      ))
                    }
      
                  </div>
                </div>
                </> :
                formField.type==="multipleChoice" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  {
                      formField.options.map((option, j)=>(
                        <div key={j} className='flex items-center gap-[0.3rem] mt-1'> <span ><input type='checkbox' value={option} className='h-[1.1rem] w-[1.1rem] ' id='checkbox' onChange={(e)=>onChangeHandler(i, formField.id, e.target.value, formField.type)} /></span> {option} </div>
                      ))
                    }
                  </div>
                </div>
                </> :
                formField.type==="select" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='mt-2'>
                  <Select onValueChange={(e)=>onChangeHandler(i, formField.id, e, formField.type)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Field Type" />
            </SelectTrigger>
            <SelectContent className='w-full p-4'>
              <SelectGroup >
                {
                  formField.options.map((option, j)=>(
                    <SelectItem key={j} value={option} className=''> <div className='flex items-center gap-2'> {option}</div> </SelectItem>
                  ))
                }
                
              </SelectGroup>
            </SelectContent>
          </Select>
                  </div>
                </div>
                </> :
                formField.type==="file" ? 
                <>
                <div>
                  <label htmlFor="" className='font-semibold'>{formField.name}</label>
                  <div style={{color:"var(--color3)"}}>{formField.description}</div>
                  <div className='my-2'>
                  <div className='preview_files mb-2'>
      
      
      
      
                    {
                      files && files.map((file, j)=>(
                        <>
                        {
                          files[j]?.name.endsWith(".pdf") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><FaFilePdf/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j].name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".docx") || files[j]?.name.endsWith(".doc") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><PiFileDoc/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".xls") || files[j]?.name.endsWith(".xlsx") || files[j]?.name.endsWith(".csv") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><BsFiletypeXlsx/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".ppt") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><AiFillFilePpt/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".mp3")? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><BsFiletypeMp3/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".wav") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><BsFiletypeWav/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j]?.name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.type.startsWith("image/") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><RiFileImageLine/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j].name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.type.startsWith("video/") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><FaFileVideo/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j].name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
                          files[j]?.name.endsWith(".zip") ? 
                          <>
                      <div className="flex items-center gap-2 border rounded overflow-hidden p-1 w-[12rem]">
                      <div className='w-8 h-8 bg-red-500 flex items-center justify-center text-[1.5rem] rounded text-white flex-none'><BsFileEarmarkZip/></div>
                        <div className='flex items-center justify-between w-full'>
                        <div className='overflow-hidden'>{files[j].name}</div>
                        <button className='text-lg rounded hover:bg-gray-200 p-1' onClick={()=>RemoveImage(j, i)}  ><RxCross2/></button>
                        </div>
                    </div>
                          </> :
      
                          <> </> 
                        }
                        </>
                      ))
                    }
                  </div>
      
                  {
                    formField.fileType==="PDF" ?  <>
                    {
                      formField?.fileCount>files.length &&  <label className="custum-file-upload flex items-center gap-1 " htmlFor="file">
                      <div className='border rounded flex items-center gap-1 px-2 py-1 text-green-500 border-green-500 hover:bg-green-500 hover:text-white'><span className='text-lg'>< PiUploadSimpleBold/></span> Add File</div>
                      <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                      accept="application/pdf, .pdf, .PDF"
                      />
                      </label> 
                    }
                  
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                  
                    </> :
                    formField.fileType==="Spreadsheet" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="application/vnd.ms-excel,  .xlsx, .csv, .xls"
                  />
                  </label>
                    }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Word" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept=" .doc, .docx "
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Presentation" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept=" .ppt, .PPT "
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Image" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="image/jpeg,image/png,image/webp, image/svg, image/gif"
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Audio" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept=".mp3, .wav"
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Video" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="video/mp4,video/webm"
                  />
                  </label>
                    }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                    formField.fileType==="Zip" ? <>
                    {
                      formField?.fileCount>files.length && 
                      <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="application/zip, .zip"
                  />
                  </label>
                    }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                    </> :
                  <>
                  {
                      formField?.fileCount>files.length && 
                  <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                  <span>< AiOutlineUpload/></span> Add File
                  <input type="file" id="file" onChange={(e)=>FileHandler(e, i, formField?.fileMaxSize)} 
                  accept="image/jpeg,image/png,image/webp, image/svg, image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt, .svg, .mp3, .wav "
                  />
                  </label>
                  }
                  {
                    reachedMax && <div className='text-sm text-red-500'>Selected file exceeed the maximum size limit ( {formField.fileMaxSize} MB )</div>             
                  }
                  
                  
                  </>
                  }
      
      
                  </div>
      
                </div>
                </> :
                ''
      
      
              }
      
            </div>
          ))
        }
      
      
      
      
      <div className='mt-4 flex items-center justify-between form_container_background border rounded-md'>
      {
        loading ? <Loader/> :<button onClick={onSubmitHandler} className='px-4 py-[0.3rem] rounded bg-green-500 text-white'>Submit </button>
      }

     {
      isAdmin && <button className='border px-3 py-[0.35rem] rounded text-sm font-semibold bg-yellow-500 text-white' onClick={()=>setViewDialog(true)}>View Response ({form.formResponses.length || 0})</button>
     }
      </div>
      
      
        </div>


      // Submitteddd 

          







      }




  </div>
  </div>
  </div>
    </div>
    





      </>
    } 



    {
      viewDialog && <ViewForm open={viewDialog} setOpen={setViewDialog} formResponse={form.formResponses} formFields={form.formFields} />
    }
    
    </>
  )
}

export default ChannelForm