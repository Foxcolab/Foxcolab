
"use client";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import EditorEmoji from "../Emoji/EditorEmoji";
import { AiOutlineFullscreen } from "react-icons/ai"
import { MdKeyboardArrowDown, MdOutlineLibraryBooks } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons"
import React, {  useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { FaRegFilePdf, FaRegFileZipper } from "react-icons/fa6";
import { BsFiletypeDocx, BsFiletypeTxt, BsRecordCircleFill } from "react-icons/bs";
import { GrDocumentCsv, GrPersonalComputer } from "react-icons/gr";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFileEarmarkPptFill } from "react-icons/bs";
// import VideoRecorder from "../Chat/Recorder/VideoRecorder";
import MentionComponent from "./EditorFooter/MentionComponent";
import { Channel, Draft, Group, Member } from "@prisma/client";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-mention/dist/quill.mention.css';
import Schedule from "./schedule/Schedule";

import { CgPoll } from "react-icons/cg";
import PollDialog from "../polls/PollDialog";
import FormDialog from "../forms/FormDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    drafts:Draft[]
    conversationId:string
  }
  const formSchema = z.object({
    content: z.string().optional(),
    contentText:z.string().optional(),
    fileUrl: z.string().array().optional(),
    attachments:z.any().optional()

  });




const DirectEditor = ({apiUrl,
    query,
    name,
    drafts,
   conversationId
  }: ChatInputProps)=> {

    const reactQuillRef = useRef(null);

   
    

    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState( []);
    const [uploading, setUplodaing] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioName, setaudioName] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoName, setVideoName] = useState(null);
    const [screenUrl, setScreenUrl] = useState(null);
    const [ScreenName, setScreenName] = useState(null);
    const [mentionDialog, setMentionDialog] = useState(false);
    const [hadlerName, setHandlerName] = useState('');
    const [mentions, setMentions] = useState([]);
    const [value, setValue ] =useState('')
    const [emojiDialog, setEmojiDialog] = useState(false);
    const [pollOpen, setPollOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [plusDialog, setPlusDialog] = useState(false);
    // const reactQuillRef = useRef(null);
    // const reactQuillRef: MutableRefObject<HTMLDivElement> = React.useRef(null);

    const [toolBarToogle, setToolBarToogle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [scheduleDialog, setScheduleDialog] = useState(false);
    // const [scheduleTime, setScheduleTime] = useState<null | Date> (null)

    const params = useParams();

 



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });
 

  // const isLoading = form.formState.isSubmitting;

  const insertEmoji = (emoji:any, onChangee:any) => {
    const quill = reactQuillRef?.current?.getEditor();
    const range = quill.getSelection(true);
    quill.insertText(range.index, emoji);
    onChangee(range.index, emoji);
    // field.onChange(`${field.value}${emoji}`)}

  };

  const RemoveQuillText =()=>{
    const quill = reactQuillRef?.current?.getEditor();
    quill.deleteText(0, quill.getLength())
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      // const res = await axios.post('/api/upload')
      // console.log("Submit fun", values);
      setLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });


      if(screenUrl){
        form.setValue('fileUrl', [screenUrl]);
      }
      if(audioUrl){
        form.setValue('fileUrl', [audioUrl]);
      }
      if(videoUrl){
        form.setValue('fileUrl', [videoUrl]);
      }
      
      if(uploading) return;
      await axios.post(url, values);
      await deleteFromDatabase();
      setLoading(false);
      form.reset();
      RemoveQuillText();
      router.refresh();
      form.setValue("content", "");
      form.setValue("fileUrl", []);
      setFiles([]);
      setPreviewUrl([]);
      setScreenUrl(null);
      setScreenName(null);
      setAudioUrl(null);
      setaudioName(null);
      setVideoUrl(null)
      setVideoName(null);
      setMentionDialog(false);
      setEmojiDialog(false);
      setMentions([]);
      setHandlerName('');
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  }

    
  const processFile=(file:any)=>{
      return URL.createObjectURL(file);
  }

  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {

    setPlusDialog(false);
    if(!e.target.files || e.target.files.length===0){
      return;
    }
    const filess = e.target.files;
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
        form.setValue("fileUrl", res.data.fileUrl);
      }
      // console.log(res);
      setUplodaing(false);
    } catch (error) {
      setUplodaing(false);
    }
  };

  const RemoveImage =(id:number)=>{
    if (id > -1) {
     files.splice(id, 1);
      previewUrl.splice(id,1);
    
    }
  }

  





 
  const modules = {
    toolbar:[
      ['bold', 'italic', 'underline','strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['blockquote'],['code-block'],
      ['clean']
    ],
    // mention:mentionModule
  }

  const draft = ()=>{
    try {
      
    } catch (error) {
      
    }
  }

  const [draftContent, setDraftContent] = useState('');
  const [typingTimer, setTypingTimer] = useState(null);

  useEffect(() => {
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    const timer = setTimeout(() => {
      if(stripHtmlTags(draftContent)!==""){
        saveToDatabase();
      }
    }, 2000);
    setTypingTimer(timer);
    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    };
  }, [draftContent]); 




  // useEffect(() => {
  //   form.reset({
  //     content: ,
  //   })
  // }, [form]);



  // useEffect(()=>{
  //   if(reactQuillRef.current){
  //     const quill = reactQuillRef.current.editor;
  //     quill.keyboard.addBinding({
  //       key: 'S', // The key you want to use for the shortcut
  //       ctrlKey: true, // Whether the Ctrl key should be pressed
  //       handler: () => {
  //         // console.log('Ctrl+S pressed'); // Perform any action you want here
  //       }
  //     });

  //     quill.keyboard.addBinding({
  //       key: 'Z',
  //       ctrlKey: true,
  //       handler: () => {
  //         // console.log('Ctrl+Z pressed');
  //       }
  //     });
  //     // quill.keyboard.addBinding({
  //     //   key: 'Enter',
  //     //   handler: (range: any, context: any) => {
  //     //     if (!range) {
  //     //       console.log('Enter pressed without selection');
  //     //       return true;
  //     //     }
  //     //     return false; 
  //     //   }
  //     // });

  //   }
  // }, [])

  const FindMetaData =async(url:string)=>{
    try {
      console.log("finding meta data");
      const res = await axios.post(`/api/etc/fetch-url`, {url});
      if(res.status===200){
        return res?.data?.attachments;
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  function extractHref(anchorTag:string) {
    let tempElement = document.createElement('div');
    tempElement.innerHTML = anchorTag.trim();
    let anchorElement = tempElement.querySelector('a');
    if (anchorElement) {
        let hrefValue = anchorElement.href;
        return hrefValue;
    } else {
        console.error('Anchor element not found in the provided HTML');
        return null;
    }
  }

  const InputHandler = (event:any) => {
    form.setValue("content", event);
    const editorRef = reactQuillRef.current.getEditor();
  

    form.setValue("contentText", editorRef.getText())
    const content = editorRef.getText()
    const extractUrl = extractHref(event);
 
    if(extractUrl!==null){
      const attachement = await FindMetaData(extractUrl);
      
      if(attachement!==null){
        form.setValue("attachments", attachement);
      }else {
        form.setValue("attachments", null);

      }
    }else {
      form.setValue("attachments", null);
    }
    
    setDraftContent(event);
    if (stripHtmlTags(event)==="") {
      deleteFromDatabase();
    }
  };
  const saveToDatabase = async() => {
    
    try {
      if(drafts.length===0){
        const res = await axios.post(`/api/draft?serverId=${params?.id}&channelId=${params?.channelId}&sectionId=${query?.sectionId}`, { content: draftContent, fileUrl:form.getValues("fileUrl") });
      }else {
        const res = await axios.put(`/api/draft?serverId=${params?.id}&channelId=${params?.channelId}&draftId=${drafts[0].id}`, { content: draftContent, fileUrl:form.getValues("fileUrl") });
      }
      
      router.refresh();
    } catch (error) {
      // console.log(error)
    }
  };
  const deleteFromDatabase = async() => {
    try {
      const res = await axios.delete(`/api/draft?serverId=${params?.id}&channelId=${params?.channelId}&draftId=${drafts[0].id}`);
      router.refresh();

    } catch (error) {
      console.log(error);
    }
  };
  const stripHtmlTags = (html:any) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    return doc.body.textContent || "";
  };




 


 
  return(
    <>
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>

              <div className='msg_footer'>
      <div className="editor_container">
           
                    
     <div>

     
     <div id="editor_htigh">
     

           <div>
           <ReactQuill
          ref={reactQuillRef}

           
           theme={"snow"}
           
           onChange={e=>InputHandler(e)} 
           // onKeyPress={()=>KeyPressHandler()}
           defaultValue={drafts && drafts[0]?.content}
           // placeholder={form.getValues("content")}
            placeholder={`Message to ${name}`} 
           modules={
            modules
           }
          
           />



     

           </div>
       
</div>
         {
          (previewUrl.length>0 || audioUrl || screenUrl || videoUrl) && 
          <div className="preview_imsg">
          

          {
            previewUrl.length!==0 && files.length!==0 && previewUrl.map((image, i)=>(
              <div key={i}>
                <div >
                          {files[i]?.type.startsWith("image/") ?
                      <div className="upload_img">
                       <div className="upld_img_opt">
                        {
                          uploading ? 
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
                        
                      </div>
                        <div className="upload_img_container">
                        <Image  src={image} alt="upload" height={100} width={100} />
                        </div>

                          
                      </div> :
                     files[i]?.type.startsWith("video/")?
                     <div className="upload_img">
                      <div>
                        {
                          uploading ? 
                          
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
                        
                      </div>
                     
                       <video  src={image} height={100} width={100} />
                   </div>  : 
                  files[i]?.type==="application/pdf" ?
                   <div className="upload_application">
                    <div className="application_cross">
                    {
                          uploading ? 
                          
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
                      </div>
                      <div className="doc_thumbnail doc_thumbnail_width">
                       <div className="doc_thum_icon">
                       <FaRegFilePdf/> 
                       </div>
                       <div className="doc_thum_nm">
                        <div className="extn">{files[i].name}</div>
                        <div >PDF</div>
                        
                       </div>
                      </div>
                   </div> 
                   
                   : 

                   files[i]?.type==="application/zip" ? 
                  
                   <div className="upload_application">
                   <div className="application_cross">
                   {
                          uploading ? 
                          
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
                     </div>
                     <div className="doc_thumbnail doc_thumbnail_width">
                      <div className="doc_icon bg-yellow-500">
                      <FaRegFileZipper/> 
                      </div>
                      <div className="doc_thum_nm">
                       <div className="extn">{files[i].name}</div>
                       <div >Zip</div>
                       
                      </div>
                     </div>
                  </div>                      
                   
                   
                   
                   : 
                   
                   
                   files[i]?.name.endsWith(".docx") || files[i]?.name.endsWith(".doc") ? 
                  
                   <div className="upload_application">
                   <div className="application_cross">
                   {
                          uploading ? 
                          
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
                     </div>
                     <div className="doc_thumbnail doc_thumbnail_width">
                      <div className="doc_icon bg-green-700">
                      <BsFiletypeDocx/> 
                      </div>
                      <div className="doc_thum_nm">
                       <div className="extn">{files[i].name}</div>
                       <div >Word</div>
                       
                      </div>
                     </div>
                  </div>                      
                   
                   
                   
                   : 
                   files[i]?.name.endsWith(".xls") || files[i]?.name.endsWith(".xlsx") ? 
                  
                   <div className="upload_application">
                   <div className="application_cross">
                   {
                          uploading ? 
                          
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
                     </div>
                     <div className="doc_thumbnail doc_thumbnail_width">
                      <div className="doc_icon bg-violet-700">
                      <BsFiletypeXlsx/> 
                      </div>
                      <div className="doc_thum_nm">
                       <div className="extn">{files[i].name}</div>
                       <div >Excel</div>
                       
                      </div>
                     </div>
                  </div> : 
                        files[i]?.name.endsWith(".csv")? 
                  
                        <div className="upload_application">
                        <div className="application_cross">
                        {
                          uploading ? 
                          
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
                          </div>
                          <div className="doc_thumbnail doc_thumbnail_width">
                           <div className="doc_icon bg-yellow-700">
                           <GrDocumentCsv/> 
                           </div>
                           <div className="doc_thum_nm">
                            <div className="extn">{files[i].name}</div>
                            <div >CSV</div>
                            
                           </div>
                          </div>
                       </div> :
                        files[i]?.name.endsWith(".txt")? 
                  
                        <div className="upload_application">
                        <div className="application_cross">
                        {
                          uploading ? 
                          
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
                          </div>
                          <div className="doc_thumbnail doc_thumbnail_width">
                           <div className="doc_icon bg-pink-700">
                           <BsFiletypeTxt/> 
                           </div>
                           <div className="doc_thum_nm">
                            <div className="extn">{files[i].name}</div>
                            <div >txt</div>
                            
                           </div>
                          </div>
                       </div> :

files[i]?.name.endsWith(".ppt")? 
                  
<div className="upload_application">
<div className="application_cross">
{
                          uploading ? 
                          
                          <button disabled className=''>
                         <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                          </button> 
                          : <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        }
</div>
<div className="doc_thumbnail doc_thumbnail_width">
 <div className="doc_icon bg-orange-700">
 <BsFileEarmarkPptFill/> 
 </div>
 <div className="doc_thum_nm">
  <div className="extn">{files[i].name}</div>
  <div >PPT</div>
  
 </div>
</div>
</div> :


                   ''

                      
                      }
                      </div>
              </div>
            ))
          }
          {
            audioUrl && 
            <div className="upload_application">
<div className="application_cross">
  
  <button onClick={()=>setAudioUrl(null)} className="cross_btn"><RxCross2  /></button>
</div>
<div className="doc_thumbnail doc_thumbnail_width">
 <div className="doc_icon bg-orange-700">
 <BsRecordCircleFill/> 
 </div>
 <div className="doc_thum_nm">
  <div className="extn">{audioName}</div>
  <div >wav</div>
  
 </div>
</div>
</div>
          }

          {
            screenUrl &&
            <div className="upload_img">
             <div>
                 
                 
               <button onClick={()=>setScreenUrl(null)}><RxCross2  /></button>
             </div>
            
              <video  src={screenUrl} height={100} width={100} />
            </div> 
          }
    {
            videoUrl &&
            <div className="upload_img">
             <div>
                 
                 
               <button onClick={()=>setVideoUrl(null)}><RxCross2  /></button>
             </div>
            
              <video  src={videoUrl} height={100} width={100} />
            </div> 
          }
          </div> 
         }
                 
                   <div className='editor_footer'>

         <div className="footer_action">


         <>
           

          

           <Popover open={plusDialog} onOpenChange={setPlusDialog}>
                 <PopoverTrigger asChild>
                   <button className="h-[24px] w-[24px]  transition rounded-full  flex items-center justify-center"><Plus className="text-white dark:text-[#29292a]" id="lucide_plus" /></button>
                 </PopoverTrigger>
                 <PopoverContent className="w-[200px]">
                   <div>
                     <button className="flex items-center gap-2 text-sm font-semibold hover:bg-[#222F3E] hover:text-white w-full p-[0.3rem] rounded" onClick={()=>{setFormOpen(true); setPlusDialog(false)}}><span className="text-[1.2rem]"><MdOutlineLibraryBooks/></span>Create Forms</button>
                     <button className="flex items-center gap-2 text-sm font-semibold hover:bg-[#222F3E] hover:text-white w-full p-[0.3rem] rounded"   onClick={()=>{setPollOpen(true); setPlusDialog(false)}}>
               <span className="text-[1.2rem]"><CgPoll/></span>Create Polls</button>
                   
                     <button className="flex items-center gap-2 text-sm font-semibold hover:bg-[#222F3E] hover:text-white w-full p-[0.3rem] rounded"  >
                     <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                     <span className="text-[1.2rem]"><GrPersonalComputer/></span> Upload From Local
                   <input type="file" id="file" onChange={handleChange} multiple
                   accept="image/jpeg,image/png,image/webp, image/svg, image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt, .svg, .mp3, .wav, .json "
                     />
           </label>
                     </button>
                   </div>
                 </PopoverContent>
               </Popover>
           
           
           
           
                      
                      </>


        
         <button className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center" ><AiOutlineFullscreen/></button>
         <div className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center overflow-hidden">
         <EditorEmoji
                     // onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}
                     setEmojiDialog={setEmojiDialog}
                     emojiDialog={emojiDialog}
                     onChange={(emoji: string) =>
                         // {
                         //   {console.log(field.value, emoji)}
                         //   field.onChange(`${field.value} ${emoji}`)
                         // }
                         insertEmoji(emoji, field.onChange)

                     
                     }

                   />
         </div>
         
      

        
         </div>

         <div  className={(loading || ((form.getValues("content")==="" || form.getValues("contentText")==="" || form.getValues("content") === "<p><br></p>" )&& form.getValues("fileUrl")===undefined))?'send_msg':"send_msg ssdnBg"}  >
           <button onClick={onSubmit} disabled={loading || ((form.getValues("contentText")===undefined ||  form.getValues("contentText")!==undefined && form.getValues("contentText")==="" )&& files.length===0)}  >
               
             {
               loading ? <ReloadIcon  className='className="mr-2 h-4 w-4 animate-spin "' /> :  <IoSend/>
             }
            
             
             
             </button><span>|</span>
           <button type="button" disabled={loading || ((form.getValues("contentText")===undefined ||  form.getValues("contentText")!==undefined && form.getValues("contentText")=="" )&& files.length===0)} onClick={()=>setScheduleDialog(true)}><MdKeyboardArrowDown/></button>
         </div>
       
         
         
       </div>
     </div>
     {
          scheduleDialog && <Schedule open={scheduleDialog} setOpen={setScheduleDialog}   form={form} loading={loading} sectionId={query?.sectionId}  />
         }
      </div>
      </div>
  
            

                    

              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form> 
           
        {
          pollOpen &&  <PollDialog open={pollOpen} setOpen={setPollOpen} schema="DirectMessage" conversationId={conversationId} /> 
        }
        {
          formOpen && <FormDialog open={formOpen} setOpen={setFormOpen} schema="DirectMessage" conversationId={conversationId}  />
        }





    
      
    
    
    </>
  )

}






export default DirectEditor;