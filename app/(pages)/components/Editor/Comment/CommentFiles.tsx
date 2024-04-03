
import React from 'react'
import Image from 'next/image';
import { BsFileEarmarkZipFill, BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXls, BsFillFileEarmarkPdfFill, BsFillFileEarmarkPptFill } from "react-icons/bs";
import { FaFileCsv } from 'react-icons/fa';
import { ReloadIcon } from '@radix-ui/react-icons';
interface Props {
    previewUrl:any[]
    files:any[]
    RemoveImage:Function
    loading:boolean
}
function CommentFiles({previewUrl, files, RemoveImage, loading}:Props) {
  return (
    <>
    
    <div className="comment_files">
            {
                loading ? <button className='uploading_files'>Uploding files <ReloadIcon  className='className="mr-2 h-4 w-4 animate-spin "' /> </button> :
                <> 
                
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
                          <div className="forum_doc_container bg-red-500 text-white">
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
                          <button className="img_count cross_bg" onClick={()=>RemoveImage(i)}>X</button>
                  <div className="forum_doc_container bg-green-700 text-white">
                    <BsFiletypeXls/>
                  </div>
                </div> :
                 files[i]?.name.endsWith(".csv") ? 
                <div className="forums_image">
                          <button className="img_count cross_bg" onClick={()=>RemoveImage(i)}>X</button>
                <div className="forum_doc_container bg-green-500 text-white">
                  <FaFileCsv/>
                </div>
              </div> :
              files &&  files[i]?.name.endsWith(".txt") ? 
              <div className="forums_image">
                          <button className="img_count cross_bg" onClick={()=>RemoveImage(i)}>X</button>
              <div className="forum_doc_container bg-orange-500 text-white">
                <BsFiletypeTxt />
              </div>
            </div> :
            files && files[i]?.name.endsWith(".ppt") ? 
            <div className="forums_image">
                          <button className="img_count cross_bg" onClick={()=>RemoveImage(i)}>X</button>
            <div className="forum_doc_container bg-cyan-600 text-white">
              <BsFillFileEarmarkPptFill/>
            </div>
          </div> :
                
                ""


                        }

                        </>
                      ))

                    }
                
                </>
            }

           
           </div>
    
    
    </>
  )
}

export default CommentFiles