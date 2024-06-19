
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Member, UploadedFile, User } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useState } from 'react'
import { BsFileEarmarkPdfFill, BsFiletypeCsv, BsFiletypeDocx, BsFiletypeTxt, BsFiletypeXlsx, BsFillFileEarmarkPptFill, BsThreeDots } from 'react-icons/bs';
import { FaCloudDownloadAlt} from 'react-icons/fa';
import { RiVideoFill } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { ActionTooltip } from '../../tooolkit/Toolkit';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { ImNewTab } from 'react-icons/im';

interface MsgFileProps {
    file:UploadedFile & {
        createdMember:Member & {
            user:User
        }
    }
}

function SingleMsgFile({file}:MsgFileProps) {
    
    const fileType = file.type;
    const fileName = file.name;
    const timeStamp = format(new Date(file.createdAt), 'd MMM yyyy');
    const createdBy = file.createdMember.user.name;
    const [type, setType] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [open, setOpen] = useState(false);



const onClickHandler =(fileT:string, publicUrl:string)=>{
    if(fileT==="pdf" || fileT==="image" || fileT==="video"){
        setType(fileT);
        setFileUrl(convertSpace(publicUrl));
        setOpen(true);
    }else {
        window.open(convertSpace(publicUrl));

    }
}

    const Download =(url:string)=>{
        const OpenNewTab = ()=>{
          window.open(fileUrl)
      }
          }
      
          const OpenNewTab = ()=>{
              window.open(fileUrl)
          }

    const convertSpace = (fileUrl:string)=>{
      return fileUrl.replace(/ /g,"%20");
    }

    console.log(file);
  return (
    <>
    {
        fileType==='image' ?
        <div className="doc_t_container">
            <div className=" single_msg_img cursor-pointer" onClick={()=>onClickHandler(fileType, file.publicUrl)}>
                
            <Image src={convertSpace(file.publicUrl)} alt="" height={10} width={10} unoptimized quality={100}  />
            {/* <RiFolderImageLine/> */}
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {fileName}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div>
        : 
        
        fileType==="video" ?
        <div className="doc_t_container" onClick={()=>onClickHandler(fileType, file.publicUrl)}>
            <div className='doc_thumb_s bg-orange-500 cursor-pointer'>
                <RiVideoFill/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {fileName}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 

            : 
        fileType==="pdf" ? 
        <div className="doc_t_container" onClick={()=>onClickHandler(fileType, file.publicUrl)}>
            <div className='doc_thumb_s bg-red-500 cursor-pointer'>
                <BsFileEarmarkPdfFill/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {fileName}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
            :
        fileType==="ppt" ? 
         <div className="doc_t_container" onClick={()=>onClickHandler(fileType, file.publicUrl)}>
            <div className='doc_thumb_s bg-green-500'>
                <BsFillFileEarmarkPptFill/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {fileName}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
        :    

        fileType==="txt"? 
         <div className="doc_t_container" onClick={()=>onClickHandler(fileType, file.publicUrl)}>
            <div className='doc_thumb_s bg-gray-500'>
                <BsFiletypeTxt/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {fileName}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
        :
        fileType==="docx"? 
         <div className="doc_t_container" onClick={()=>onClickHandler(fileType, file.publicUrl)}>
            <div className='doc_thumb_s bg-yellow-500'>
                <BsFiletypeDocx/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {fileName}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
        :
        fileType==="xlsx"? 
         <div className="doc_t_container" onClick={()=>onClickHandler(fileType, file.publicUrl)}>
            <div className='doc_thumb_s bg-blue-500'>
                <BsFiletypeXlsx/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {fileName}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div> 
         :
        fileType==="csv" ? 
         <div className="doc_t_container" onClick={()=>onClickHandler(fileType, file.publicUrl)}>
            <div className='doc_thumb_s bg-red-500'>
                <BsFiletypeCsv/>
            </div>
            <div className="doc_list_desc">
            <div className="doc_title">
            {fileName}
            </div>
            <div className="file_shd_by">Shared by {createdBy} on {timeStamp}</div>
            </div>
        </div>  :
        ""
    }   
    




    <Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger asChild>

</DialogTrigger>
<DialogContent className={type==="image" ? "image_dialog": type==="pdf" ? "pdf_dialog" :''}  >
    {
        type==="image" ?
        <>
        
        <div className=""  >
        <div className="dialog_img_container">
        <Image src={fileUrl} alt='' width={100} height={100} quality={100} unoptimized /> 
        </div>
        <div className="img_dialog_footer">
    
    <button>
    <ActionTooltip label='Download' side='top' align='center'>
    <FaCloudDownloadAlt  onClick={()=> Download(fileUrl)}/>
    </ActionTooltip>
    </button>
    <button >
    <ActionTooltip label='Open threads' side='top' align='center'>
    <BiSolidMessageDetail/>
    </ActionTooltip>
    </button>
    <button onClick={OpenNewTab}>
    <ActionTooltip label='Open in new tab' side='top' align='center'>
    <ImNewTab/>
    </ActionTooltip>
    </button>
    <button>
    <ActionTooltip label='options' side='top' align='center'>
    <BsThreeDots/>
    </ActionTooltip>
    </button>
    {/* <button><BiSolidMessageDetail/></button>
    <button><ImNewTab/></button>
    <button><BsThreeDots/></button> */}
</div>
        </div>
        </> :
        type==="video" ? 
        <> 
        
        <div className="img_wrapper">
            <div className="img_preview">
                <div className="video">
                <ReactPlayer url={fileUrl}  controls loop  pip  />
                </div>
           
            </div>
            </div>
        
        </> :

        type==="pdf" ?
        <>
        <div>
      <embed src={fileUrl}  type="application/pdf" className='embed_pdf' />
      </div>
        
        </>
        :

        ''
    }




</DialogContent>
</Dialog>





    
    </>
  )
}

export default SingleMsgFile