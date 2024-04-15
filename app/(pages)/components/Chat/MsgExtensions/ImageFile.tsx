import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ActionTooltip } from '../../tooolkit/Toolkit'
import { FaCloudDownloadAlt } from "react-icons/fa";
import { ImNewTab } from "react-icons/im";
import { BiSolidMessageDetail } from 'react-icons/bi';
import { BsFiletypeTxt, BsThreeDots } from "react-icons/bs";
import Image from 'next/image';


function ImageFile({fileUrl, type, fileName}:{fileUrl:string, type:string, fileName:string}) {

    const Download =(url:string)=>{
       
        }
    
        const OpenNewTab = ()=>{
            window.open(fileUrl)
        }

  return (
    <>


    {
      type==="channelFile" ? <>
            <div className='img_wrapper'>
    <div className='img_preview'>
    <Dialog>
<DialogTrigger asChild>
      {/* <div>
        
      <div className="doc_main_body ">
<button>
<div className='doc_file_body'>
    <div className="flex items-center gap-2">
    <div className="channel_img_file">
    <Image src={fileUrl} height={100} width={100} alt='' />
    </div>
    <div className="">
     <div className="">{fileName}</div>
     <div >Image</div>
     
    </div>
   </div></div>
</button> 
</div>
      </div> */}

<div className="doc_main_body">
        <button>
        <div className='doc_file_body'>
            <div className="doc_thumbnail doc_thum_imp">
            <div className="channel_img_file">
            <Image src={fileUrl} height={100} width={100} alt='' />

              </div>
            <div className="">
             <div className="">{fileName}</div>
             <div >Image</div>
             
            </div>
           </div>
           <div className='iframe_src'></div></div>
        </button> 
        </div>

      
{/* <Image src={fileUrl} alt='' width={100} height={100} unoptimized  quality={50}  />  */}

</DialogTrigger>
<DialogContent className="image_dialog"  >
<div className="another_img_blur" style={{backgroundImage:`url(${fileUrl})`}}>
</div>

<div className="dialog_img_container">
<Image src={fileUrl} alt='' width={100} height={100} quality={100} unoptimized /> 

</div>
{/* <DialogFooter> */}
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
{/* </DialogFooter> */}
</DialogContent>
</Dialog>

</div>
</div>
      </> : 
    <div className='img_wrapper'>
    <div className='img_preview'>
    <Dialog>
<DialogTrigger asChild>

<Image src={fileUrl} alt='' width={100} height={100} unoptimized  quality={50}  /> 

</DialogTrigger>
<DialogContent className="image_dialog"  >
<div className="another_img_blur" style={{backgroundImage:`url(${fileUrl})`}}>
</div>

<div className="dialog_img_container">
<Image src={fileUrl} alt='' width={100} height={100} quality={100} unoptimized /> 

</div>
{/* <DialogFooter> */}
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
{/* </DialogFooter> */}
</DialogContent>
</Dialog>

</div>
</div>
    }

    

    
    
    </>
  )
}

export default ImageFile