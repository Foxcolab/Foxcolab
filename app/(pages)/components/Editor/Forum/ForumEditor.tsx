
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
import EditorEmoji from "../../Emoji/EditorEmoji";
import { AiOutlineFullscreen } from "react-icons/ai"
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons"
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { FaLock, FaRegFilePdf, FaRegFileZipper } from "react-icons/fa6";
import { BsFiletypeDocx, BsFiletypeTxt, BsRecordCircleFill } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFileEarmarkPptFill } from "react-icons/bs";
import VoiceRecorder from "../../Chat/Recorder/VoiceRecorder";
import ScreenRecording from "../../Chat/Recorder/ScreenRecording";
import VideoRecorder from "../../Chat/Recorder/VideoRecorder";
// import VideoRecorder from "../Chat/Recorder/VideoRecorder";
import Mention from "../EditorFooter/MentionComponent";
import { Channel,  Group, Member } from "@prisma/client";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-mention';
import QuillMention from 'quill-mention'
import 'quill-mention/dist/quill.mention.css';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


const formSchema = z.object({
    content: z.string().optional(),
    fileUrl: z.string().array().optional()
  });



interface Props {
  placeholder:string
    apiUrl:string
    query: Record<string, any>;
    whoCanUploadMediaInComment:boolean
    whoCanComment:boolean
    
}
  
function ForumEditor({placeholder, apiUrl, query, whoCanUploadMediaInComment, whoCanComment}:Props) {
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);
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
    const reactQuillRef = useRef(null);
    const [toolBarToogle, setToolBarToogle] = useState(false);


    const params = useParams();



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });
 

  const isLoading = form.formState.isSubmitting;

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
      // console.log(error);
    }
  }

 

 
  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files || e.target.files.length===0){
      return;
    }
    const filess = e.target.files;
    const formData = new FormData();
    for (const file of Array.from(filess)) {
      files.push(file);
      const processFile = URL.createObjectURL(file);
      previewUrl.push(processFile);
      formData.append('file', file);
    }
    router.refresh();
    try {
      setUplodaing(true);
      const res = await axios.post('/api/upload', formData);
      if(res.status===200){
        form.setValue("fileUrl", res.data.fileUrl);
      }
      // console.log(res);
      setUplodaing(false);
    } catch (error) {
      setUplodaing(false)
    }
    
  };

  const UploadFile =async ()=>{
    try {

        setUplodaing(true);
        const formData = new FormData();
        for (const file of Array.from(files)) {
            formData.append('file', file);
          }
        const res = await axios.post('/api/upload', formData);
        if(res.status===200){
          form.setValue("fileUrl", res.data.fileUrl);
        }
        // console.log(res);
        setUplodaing(false);
      } catch (error) {
        setUplodaing(false)
      }
  }

  const RemoveImage =(id:number)=>{
    // const index = files.indexOf(id);
    // console.log(index, id);
    
  if (id > -1) {
    files.splice(id, 1);
    previewUrl.splice(id,1);
  }
 
  }



  const toggleToolbar =()=>{
    setToolBarToogle(!toolBarToogle);
  }





  const InputHandler = (event:any) => {
    form.setValue("content", event);
    
  };





  return (
    <div className='forum_editor'>
      {
        whoCanComment===false ? <div className="editor_not_permit_container">
        <div>
        You don't have permission to post in this forum.
        </div>
       </div>  : <Form {...form}>
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
      
            {/* <ReactQuill theme="snow" placeholder={`Message to ${(type==="channel" && channelType==="public") ? "#" :(type==="channel" && channelType==="private")? "#":""}${name}`}
            modules={modules} 
            onChange={e=>form.setValue("content",e)}
             defaultValue={form.getValues("content")}
            id="editor" 
            ref={reactQuillRef}
            /> */}

            <div>
            <ReactQuill ref={reactQuillRef}
            
            theme={"snow"}
            
            onChange={e=>InputHandler(e)} 
            placeholder={placeholder} 
            modules={{'toolbar':[
              ['bold', 'italic', 'underline','strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['blockquote'],['code-block'],
              ['clean']
            ]}}
            />
            </div>
        
</div>
          
            <div className="preview_imsg">
            {/* {previewUrl && (
                        <div>
                            {files.type.startsWith("image/") ?
                        <div>
                            <Image  src={previewUrl} alt="upload" height={100} width={100} />
                        </div> :
                        <div></div>    
                        
                        }
                        </div>
                    )} */}

            {
              previewUrl.length!==0 && files.length!==0 && previewUrl.map((image, i)=>(
                <div key={i}>
                  <div >
                            {files[i]?.type.startsWith("image/") ?
                        <div className="upload_img">
                           <div className="upld_img_opt">
                          {
                            uploading ? 
                            
                            <Button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </Button> 
                            : ''
                          }
                          <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        </div>
                            <Image  src={image} alt="upload" height={100} width={100} />
                        </div> :
                       files[i]?.type.startsWith("video/")?
                       <div className="upload_img">
                        <div>
                          {
                            uploading ? 
                            
                            <Button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </Button> 
                            : ''
                          }
                          <button onClick={()=>RemoveImage(i)}><RxCross2  /></button>
                        </div>
                       
                         <video  src={image} height={100} width={100} />
                     </div>  : 
                    files[i]?.type==="application/pdf" ?
                     <div className="upload_application">
                      <div className="application_cross">
                          {
                            uploading ? 
                            
                            <Button disabled className=''>
                           <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                            </Button> 
                            : ''
                          }
                          <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                           
                           <Button disabled className=''>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                           </Button> 
                           : ''
                         }
                         <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                           
                           <Button disabled className=''>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                           </Button> 
                           : ''
                         }
                         <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                           
                           <Button disabled className=''>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                           </Button> 
                           : ''
                         }
                         <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                                
                                <Button disabled className=''>
                               <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                                </Button> 
                                : ''
                              }
                              <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                                
                                <Button disabled className=''>
                               <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
                                </Button> 
                                : ''
                              }
                              <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
      
      <Button disabled className=''>
     <ReloadIcon className="mr-2 h-4 w-4 animate-spin " />
      </Button> 
      : ''
    }
    <button onClick={()=>RemoveImage(i)} className="cross_btn"><RxCross2  /></button>
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
                    <div className='editor_footer'>

          <div className="footer_action">

            {
              whoCanUploadMediaInComment===false ? 

              <HoverCard>
            <HoverCardTrigger>
            <button
             disabled
             type="button"
             className=" h-[24px] w-[24px] channel_media_plus transition rounded-full p-1 flex items-center justify-center"
           >
     <Plus className="text-white dark:text-[#29292a]" id="lucide_plus" />
  
             
           </button>
            </HoverCardTrigger>
            <HoverCardContent >
              <div className="text-md flex items-center justify-center">You don't have permission to upload media in this forum</div>
            </HoverCardContent>
          </HoverCard>  : 
           <button
           type="button"
           className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
         >
            <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
   {/* <RiComputerFill /> Upload from local */}
   <Plus className="text-white dark:text-[#29292a]" id="lucide_plus" />

<input type="file" id="file" onChange={handleChange} multiple
accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt "
/>
</label>
           
         </button>
            }



         
         
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
          
          {/* <button 
          className=" h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center"
          ><GoMention /></button> */}
          {/* <Mention open={mentionDialog} setOpen={setMentionDialog}  groups={groups} onSelectHandler={(e:any)=>onGroupSelect(e, field.onChange)}  /> */}
          {
            whoCanUploadMediaInComment && <>
            
            <VideoRecorder setVideoName={setVideoName} setVideoUrl={setVideoUrl} />
          <VoiceRecorder setAudioUrl={setAudioUrl} setAudioName={setaudioName} />
          <ScreenRecording setScreenName={setScreenName} setScreenUrl={setScreenUrl}  />
            </>
          }
          
          

          {/* <button
          className=" h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center"
          ><FaMicrophone/>
          </button> */}
          </div>

          <div  className={(isLoading || ((form.getValues("content")==="" || form.getValues("content") === "<p><br></p>" )&& form.getValues("fileUrl")===undefined))?'send_msg':"send_msg ssdnBg"}  >
            <button onClick={onSubmit} disabled={isLoading || ((form.getValues("content")==="" || form.getValues("content") === "<p><br></p>" )&& form.getValues("fileUrl")===undefined)}  >
                
              {
                isLoading ? <ReloadIcon  className='className="mr-2 h-4 w-4 animate-spin "' /> :  <IoSend/>
              }
             
              
              
              </button><span>|</span>
            <button disabled={isLoading} ><MdKeyboardArrowDown/></button>
          </div>

          
        </div>
      </div>
      </div>
      </div>
  


                    

              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
      }





    </div>
  )
}

export default ForumEditor