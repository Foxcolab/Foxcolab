
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
import React, { MutableRefObject, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { FaLock, FaRegFilePdf, FaRegFileZipper } from "react-icons/fa6";
import { BsFiletypeDocx, BsFiletypeTxt, BsRecordCircleFill } from "react-icons/bs";
import { GrDocumentCsv, GrPersonalComputer } from "react-icons/gr";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFileEarmarkPptFill } from "react-icons/bs";
import VoiceRecorder from "../Chat/Recorder/VoiceRecorder";
import ScreenRecording from "../Chat/Recorder/ScreenRecording";
import VideoRecorder from "../Chat/Recorder/VideoRecorder";
// import VideoRecorder from "../Chat/Recorder/VideoRecorder";
import MentionComponent from "./EditorFooter/MentionComponent";
import { Channel, Draft, Group, Member } from "@prisma/client";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillMention from 'quill-mention'
import 'quill-mention/dist/quill.mention.css';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Schedule from "./schedule/Schedule";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { FaPollH } from "react-icons/fa";
import { CgPoll } from "react-icons/cg";
import PollDialog from "../polls/PollDialog";
import FormDialog from "../forms/FormDialog";


interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
    groups:Group[]
    channelType:"public" | "private" | null
    channelMember:Member[]
    channels:Channel[]
    drafts:Draft[]
    uploadMedia:boolean
    sendMessage:boolean
    atValues:any
    hashValues:any
  }
  const formSchema = z.object({
    content: z.string().optional(),
    contentText:z.string().optional(),
    fileUrl: z.string().array().optional()
  });

  const atValues = [
    { id: 1, value: 'Fredrik Sundqvist' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  const hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]

  const mentionModule = {
    allowedChars: /^[A-Za-z\s]*$/,
    mentionDenotationChars: ["@", "#"],
    source: function (searchTerm:string, renderList:any, mentionChar:string) {
      let values;

      if (mentionChar === "@") {
        values = atValues;
      } else {
        values = hashValues;
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
        renderList(matches, searchTerm);
      }
    },
  }


const EditorFooter = ({apiUrl,
    query,
    name,
    type,
    groups,
    channelType,
    channelMember,
    channels,
    drafts,
    uploadMedia,
    sendMessage,
    atValues,
    hashValues
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
      setUplodaing(false)
    }
  };

  const RemoveImage =(id:number)=>{
    // const index = files.indexOf(id);
    // console.log(index, id);
    
  if (id > -1) {
    files.splice(id, 1);
    previewUrl.splice(id,1);
  }
 
  }

  const onGroupSelect =(e:string, onChangee:any)=>{
    const quill = reactQuillRef?.current?.getEditor();
    // let data = `${<span className="mention" data-index="0" data-denotation-char="@" data-id="1" data-value="Fredrik Sundqvist">&#xFEFF;<span contentEditable="false">@{e}</span>&#xFEFF;</span>}`
    // e=`@${e}`;
    const range = quill.getSelection(true);
    // quill.insertText(range.index, data);
    quill.insertEmbed(range.index, "mention", {
      id: 1,
      denotationChar: "@",
      value: e,
    });
    onChangee(range.index, `@${e}`);
  }


  
 function suggestPeople(searchTerm:string) {
  // console.log(searchTerm)
  const allPeople = [
    {
      id: 1,
      handle: "Fredrik Sundqvist"
    },
    {
      id: 2,
      handle: "Patrik Sjölin"
    }
  ];
    return allPeople.filter(group => group.handle.includes(searchTerm));
  }



 

const modules2 = {
  toolbar: [
    ['bold', 'italic', 'underline','strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['blockquote'],['code-block'],
    ['clean']
  ],

  
}

  const toggleToolbar =()=>{
    setToolBarToogle(!toolBarToogle);
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



  const InputHandler = (event:any) => {
    form.setValue("content", event);
    const editorRef = reactQuillRef.current.getEditor();
  

    form.setValue("contentText", editorRef.getText())
    const content = editorRef.getText()
    // if(content.includes('@')){
    //   setMentionDialog(true);
    // }
    
    setDraftContent(event);
    if (stripHtmlTags(event)==="") {
      deleteFromDatabase();
    }
  };
  const saveToDatabase = async() => {
    
    try {
      // if(drafts.length===0){
      //   const res = await axios.post(`/api/draft?serverId=${params?.id}&channelId=${params?.channelId}&sectionId=${query?.sectionId}`, { content: draftContent, fileUrl:form.getValues("fileUrl") });
      // }else {
      //   const res = await axios.put(`/api/draft?serverId=${params?.id}&channelId=${params?.channelId}&draftId=${drafts[0].id}`, { content: draftContent, fileUrl:form.getValues("fileUrl") });
      // }
      
      router.refresh();
    } catch (error) {
      // console.log(error)
    }
  };
  const deleteFromDatabase = async() => {
    try {
      // const res = await axios.delete(`/api/draft?serverId=${params?.id}&channelId=${params?.channelId}&draftId=${drafts[0].id}`);
      router.refresh();

    } catch (error) {
      console.log(error);
    }
  };
  const stripHtmlTags = (html:any) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    return doc.body.textContent || "";
  };




  const modules = {
    toolbar:[
      ['bold', 'italic', 'underline','strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['blockquote'],['code-block'],
      ['clean']
    ],
    mention:  mentionModule
    // mention:mentionModule
  }

  const handleRef = (ref:any) => {

    if (ref) {
      // Delay the assignment until the component is mounted
      setTimeout(() => {
        reactQuillRef.current = ref;
      }, 0);
    }
  };


  const handleQuillLoaded = (quill) => {
    if (quillRef.current || !quill) return;
    quillRef.current = quill.getEditor();
  };

  return(
    <>
    

    {
      sendMessage===false ? <><div className="editor_not_permit_container">
      <div>
      You don't have permission to post in this channel.
      </div>
     </div>    </> :  <>
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
            placeholder={`Message to ${(type==="channel" && channelType==="public") ? "#" :(type==="channel" && channelType==="private")? "#":""}${name}`} 
           modules={
            modules
           }
          
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
            uploadMedia===false ? 
            <HoverCard>
            <HoverCardTrigger>
            <button
             disabled
             type="button"
             className=" h-[24px] w-[24px] channel_media_plus transition rounded-full p-1 flex items-center justify-center"
           >
     {/* <RiComputerFill /> Upload from local */}
     
     <Plus className="text-white dark:text-[#29292a]" id="lucide_plus" />
  
             
           </button>
            </HoverCardTrigger>
            <HoverCardContent>
              You don't have permission to upload media in this channel
            </HoverCardContent>
          </HoverCard> :
           <>
           

           <DropdownMenu>
  <DropdownMenuTrigger className="h-[24px] w-[24px]  transition rounded-full  flex items-center justify-center">
  <Plus className="text-white dark:text-[#29292a]" id="lucide_plus" />
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-[200px]">

    <DropdownMenuItem className="flex items-center gap-2" onClick={()=>setFormOpen(true)}><span className="text-[1.2rem]"><MdOutlineLibraryBooks/></span>Create Forms</DropdownMenuItem>
    <DropdownMenuItem className="flex items-center gap-2" onClick={()=>setPollOpen(true)}>
    <span className="text-[1.2rem]"><CgPoll/></span>Create Polls
 
     </DropdownMenuItem>

    <DropdownMenuItem className="flex items-center gap-2">
    <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
    {/* <RiComputerFill /> Upload from local */}
    
    <span className="text-[1.2rem]"><GrPersonalComputer/></span> Upload From Local

<input type="file" id="file" onChange={handleChange} multiple
accept="image/jpeg,image/png,image/webp, image/svg, image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt, .svg, .mp3, .wav, .json "
/>
</label>
     </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
           {/* <button
            type="button"
            className=" h-[24px] w-[24px]  transition rounded-full p-1 flex items-center justify-center"
          >
             <label className="custum-file-upload flex items-center gap-1" htmlFor="file">

    
    <Plus className="text-white dark:text-[#29292a]" id="lucide_plus" />

<input type="file" id="file" onChange={handleChange} multiple
accept="image/jpeg,image/png,image/webp, image/svg, image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt, .svg, .mp3, .wav, .json "
/>
</label>
            
          </button>  */}
           
           </>
        
          
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
         <MentionComponent open={mentionDialog} setOpen={setMentionDialog}  groups={groups} onSelectHandler={(e:any)=>onGroupSelect(e, field.onChange)}  />
         <VideoRecorder setVideoName={setVideoName} setVideoUrl={setVideoUrl} />
         <VoiceRecorder setAudioUrl={setAudioUrl} setAudioName={setaudioName} />
         <ScreenRecording setScreenName={setScreenName} setScreenUrl={setScreenUrl}  />

         {/* <button
         className=" h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center"
         ><FaMicrophone/>
         </button> */}
         </div>

         <div  className={(loading || ((form.getValues("content")==="" || form.getValues("content") === "<p><br></p>" )&& form.getValues("fileUrl")===undefined))?'send_msg':"send_msg ssdnBg"}  >
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
          pollOpen &&  <PollDialog open={pollOpen} setOpen={setPollOpen} /> 
        }
        {
          formOpen && <FormDialog open={formOpen} setOpen={setFormOpen} />
        }


    </>
    }




    
      
    
    
    </>
  )

}



// const ReactQuill = dynamic(() => import('react-quill').then((mod) => {
  
//   const ReactQuillWithRef = forwardRef((props, ref) => {
//     console.log('Component mounted');
//     props.handleRef(ref);
//     return <mod.default {...props} />;
//   });
//   ReactQuillWithRef.displayName = 'ReactQuill';
//   return ReactQuillWithRef;
// }), {
//   loading: () => <p>Loading editor...</p>, // Fallback component while loading
//   ssr: false, // Disable server-side rendering
// });


export default EditorFooter;