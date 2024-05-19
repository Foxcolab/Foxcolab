"use client";
import React, { useState } from 'react'
import {  FaHeartCirclePlus } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'
import { RxCrossCircled } from 'react-icons/rx';
import EditorEmoji from '../Emoji/EditorEmoji';
import { BiMessageSquareAdd, BiSolidImageAdd } from 'react-icons/bi';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { BsFileEarmarkZipFill, BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXls, BsFillFileEarmarkPdfFill, BsFillFileEarmarkPptFill } from "react-icons/bs";
import Image from 'next/image';
import { FaFileCsv } from 'react-icons/fa';
import { ReloadIcon } from '@radix-ui/react-icons';


interface Props {
  sectionId:string
  canCreateForum:boolean
}

function ForumHeader({sectionId, canCreateForum}:Props) {
    const [search, setSearch] = useState(false);
    const [emojiDialog, setEmojiDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [fileUrl, setFileUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUplodaing] = useState(false);
    const [showFiles, setShowFiles] = useState(false);

    const router = useRouter();
    const params = useParams();

    const processFile=(file:any)=>{
        return URL.createObjectURL(file);
    }

    const SubmitHandler =async()=>{
        try {
            setLoading(true);
            if(files.length!==0){
              await UploadFiles();
            }
            await axios.post(`/api/forums/post?serverId=${params?.id}&forumId=${params?.forumId}&sectionId=${sectionId}`, {title, content:title, fileUrl});
            setLoading(false);
            router.refresh();
            setTitle('');
            setMessage('');
            setFileUrl([]);
            setPreviewUrl([]);
            setFiles([]);
        } catch (error) {
            setLoading(false);
            console.log(error);
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
          
          previewUrl.push(processFile(file));
          formData.append('file', file);
        }
        
        router.refresh();
        try {
          setUplodaing(true);
        //   const res = await axios.post('/api/upload', formData);
        //   if(res.status===200){
        //     // fileUrl.push(res?.data?.fileUrl);
        //     for(let i=0; i<res.data.fileUrl.length; i++){
        //         fileUrl.push(res.data.fileUrl[i]);
        //     }
        //   }
          // console.log(res);
          setUplodaing(false);
        } catch (error) {
          setUplodaing(false)
        }
      };

    const UploadFiles = async()=>{
      try {
          setUplodaing(true);
          const formData = new FormData();
          for (const file of Array.from(files)) {
            formData.append('file', file);
          }
          const res = await axios.post('/api/upload', formData);
          if(res.status===200){
            // fileUrl.push(res?.data?.fileUrl);
            for(let i=0; i<res.data.fileUrl.length; i++){
                fileUrl.push(res.data.fileUrl[i]);
            }
          }
          // console.log(res);
          setUplodaing(false);
      } catch (error) {
        
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


  const ShowAllFiles =()=>{
    setShowFiles(true);
  }

  const HideAllFiles =()=>{
  setShowFiles(false);

  }




  return (
    <>
    
    {
        !search ? <>
        <div className='cnvs_sch'>
        <button><IoSearch/></button>
        <input type='search' placeholder='Search for forums..' />
        {
          canCreateForum &&  <button className='new_forums' onClick={()=>setSearch(true)}><FaHeartCirclePlus/>New Post </button>
        }
       
      </div>
        </> :
        <>

            <div className='forums_input_containerr mb-2'>
                <div className='forums_input_upper'>
                    <button className='forums_cross' onClick={()=>setSearch(false)}><RxCrossCircled/></button>
                    <div className='forums_inputs'>
                        <div className="forum_input1">
                            <textarea  placeholder='Title' maxLength={100} onChange={(e)=>setTitle(e.target.value)} defaultValue={title} rows={1} />
                        </div>
                        <div className="forum_input2">
                            <textarea  placeholder='Enter a message...' onChange={e=>setMessage(e.target.value)} defaultValue={message} value={message} rows={1} />
                        </div>
                    </div>
                    {/* <label htmlFor="">
                    <div className='forums_image'>
                    <input type='file' />
                        <BiSolidImageAdd />
                    </div>
                    </label> */}
                    <div className='forums_image_container' onMouseEnter={ShowAllFiles} onMouseLeave={HideAllFiles}>
                    
                    {
                      !showFiles && <>
                      {
                        previewUrl.length===0 ? <>
                        <label className="forums_image" htmlFor="file">
                        <div className="plus_file">
                          <div className="icon">
                            <BiSolidImageAdd/>
                          </div>
                          <input type="file" id="file" accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt' multiple onChange={handleChange} />
                          </div>
                        </label> 
                     </> : <>
                     
                        {
                          // images
                        files && files[0].type.startsWith("image/") ? 
                        <div className="forums_image">
                          <div className="img_count">{files.length}</div>

                        <Image src={previewUrl[0]} width={200} height={200} alt="preview" />
                        </div>       :

                        files && files[0].type.startsWith("video/") ? 
                        <div className="forums_image">
                          <div className="img_count">{files.length}</div>
                      <video src={previewUrl[0]} width={200} height={200} alt="preview" />
                      </div>
                        :
  
                        files && files[0]?.type==="application/pdf" ? 
                        <div className="forums_image">
                          <div className="img_count">{files.length}</div>
                        <div className="forum_doc_container bg-red-500">
                          <BsFillFileEarmarkPdfFill/>
                        </div>
                      </div> : 
                      files && files[0]?.type==="application/zip" ? 
                      <div className="forums_image">
                          <div className="img_count">{files.length}</div>
                      <div className="forum_doc_container bg-gray-500">
                        <BsFileEarmarkZipFill/>
                      </div>
                    </div> :
                  files[0]?.name.endsWith(".docx") || files[0]?.name.endsWith(".doc")  ? 
                  <div className="forums_image">
                          <div className="img_count">{files.length}</div>
                  <div className="forum_doc_container bg-yellow-500">
                    <BsFiletypeDocx/>
                  </div>
                </div> :
                files[0]?.name.endsWith(".xls") || files[0]?.name.endsWith(".xlsx")? 
                <div className="forums_image">
                          <div className="img_count">{files.length}</div>
                <div className="forum_doc_container bg-green-700">
                  <BsFiletypeXls/>
                </div>
              </div> :
               files[0]?.name.endsWith(".csv") ? 
              <div className="forums_image">
                          <div className="img_count">{files.length}</div>
              <div className="forum_doc_container bg-green-500">
                <FaFileCsv/>
              </div>
            </div> :
            files &&  files[0]?.name.endsWith(".txt") ? 
            <div className="forums_image">
                          <div className="img_count">{files.length}</div>
            <div className="forum_doc_container bg-orange-500">
              <BsFiletypeTxt />
            </div>
          </div> :
          files && files[0]?.name.endsWith(".ppt") ? 
          <div className="forums_image">
                          <div className="img_count">{files.length}</div>
          <div className="forum_doc_container bg-cyan-600">
            <BsFillFileEarmarkPptFill/>
          </div>
        </div> :
              
              ""   

                    }





                         </>
                      }
                      
                      </>
                    }

                    {
                      showFiles && <>
                      {
                        previewUrl.length===0 ? <>
                        <label className="forums_image" htmlFor="file">
                        <div className="plus_file">
                      
                          <div className="icon">
                            <BiSolidImageAdd/>
                          </div>
                          <input type="file" id="file" accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt' multiple onChange={handleChange} />
                          </div>
                        </label> 
                     </> : <>
                     
                     {
                      previewUrl && previewUrl.map((preview, i)=>(
                        <>
{
                          files && files[i].type.startsWith("image/") ?
                          <div className="forums_image">
                          <button className="img_count cross_bg" onClick={()=>RemoveImage(i)}>X</button>
                            <Image src={preview} width={200} height={200} alt="preview" />
                          </div> :
                          files && files[i].type.startsWith("video/") ? 
                          <div className="forums_image">
                        <video src={previewUrl[0]} width={200} height={200} alt="preview" />
                        </div>
                          :
    
                          files && files[i]?.type==="application/pdf" ? 
                          <div className="forums_image">
                          <button className="img_count cross_bg" onClick={()=>RemoveImage(i)}>X</button>
                          <div className="forum_doc_container bg-red-500">
                            <BsFillFileEarmarkPdfFill/>
                          </div>
                        </div> : 
                        files && files[i]?.type==="application/zip" ? 
                        <div className="forums_image">
                          <button className="img_count cross_bg" onClick={()=>RemoveImage(i)}>X</button>
                        <div className="forum_doc_container bg-gray-500">
                          <BsFileEarmarkZipFill/>
                        </div>
                      </div> :
                    files[i]?.name.endsWith(".docx") || files[i]?.name.endsWith(".doc")  ? 
                    <div className="forums_image">
                          <button className="img_count cross_bg" onClick={()=>RemoveImage(i)}>X</button>
                    <div className="forum_doc_container bg-yellow-500">
                      <BsFiletypeDocx/>
                    </div>
                  </div> :
                  files[i]?.name.endsWith(".xls") || files[i]?.name.endsWith(".xlsx")? 
                  <div className="forums_image">
                          <button className="img_count" onClick={()=>RemoveImage(i)}>X</button>
                  <div className="forum_doc_container bg-green-700">
                    <BsFiletypeXls/>
                  </div>
                </div> :
                 files[i]?.name.endsWith(".csv") ? 
                <div className="forums_image">
                          <button className="img_count" onClick={()=>RemoveImage(i)}>X</button>
                <div className="forum_doc_container bg-green-500">
                  <FaFileCsv/>
                </div>
              </div> :
              files &&  files[i]?.name.endsWith(".txt") ? 
              <div className="forums_image">
                          <button className="img_count" onClick={()=>RemoveImage(i)}>X</button>
              <div className="forum_doc_container bg-orange-500">
                <BsFiletypeTxt />
              </div>
            </div> :
            files && files[i]?.name.endsWith(".ppt") ? 
            <div className="forums_image">
                          <button className="img_count" onClick={()=>RemoveImage(i)}>X</button>
            <div className="forum_doc_container text-cyan-600">
              <BsFillFileEarmarkPptFill/>
            </div>
          </div> :
                
                ""


                        }

                        </>
                      ))

                    }

                        <label className="forums_image" htmlFor="file">
                        <div className="plus_file">
                      
                          <div className="icon">
                            <BiSolidImageAdd/>
                          </div>
                          <input type="file" id="file" accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt' multiple onChange={handleChange} />
                          </div>
                        </label> 
                      
                      {/* <label className="forums_image" htmlFor="file">
                        <div className="plus_file">
                          <div className="icon">
                            <BiSolidImageAdd/>
                          </div>
                          <input type="file" id="file" accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt' multiple onChange={handleChange} />
                          </div>
                      </label>  */}
                      
                     
                      
                      
                     </>
                    
                    }
                    </>
                }
                </div>
                    
                      
                        
                    
                    </div>
                <div className='forum_input_lower'>
                    <div>
                    <EditorEmoji emojiDialog={emojiDialog} setEmojiDialog={setEmojiDialog} onChange={
                        (emoji)=>{
                            setMessage(`${message} ${emoji}`)
                            setEmojiDialog(false)
                        }
                        
                        } />
                    </div>
                    <div className='forums_post'>
                        {
            
            loading? <button className='disabled'><ReloadIcon className="mr-1 h-4 w-4 animate-spin " /> Posting..  </button> :
                            <> {
                              title!=='' ? <button onClick={SubmitHandler} className='bg-green-500' ><BiMessageSquareAdd/> Post</button> :
                              <button disabled className='cursor-not-allowed'><BiMessageSquareAdd/> Post</button>
                            }
                            
                            </>
                            
                            
                        }
                        
                    </div>
                    
                </div>
            </div>


            {/* {
              previewUrl.length!==0 && files.length!==0 && previewUrl.map((image, i)=>(
                <div>
                  <div key={i}>
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
            } */}
        </>
    }
    
    
    
    </>
  )
}

export default ForumHeader