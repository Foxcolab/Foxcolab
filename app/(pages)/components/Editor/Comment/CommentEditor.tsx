import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import EditorEmoji from '../../Emoji/EditorEmoji'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { IoSend } from 'react-icons/io5';

import CommentFiles from './CommentFiles';
import { ReloadIcon } from '@radix-ui/react-icons';

interface Props {
    noteId:string

}

function CommentEditor({noteId}:Props) {
    const [emojiDialog, setEmojiDialog] = useState(false);
    const [content, setContent] = useState('');
    const [fileUrl, setFileUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useParams();

    const InputHandler =(emoji:string)=>{
        setContent(`${content} ${emoji}`);
        setEmojiDialog(false);

        // router.refresh();
    }

    const onKeyChange =async(e:any)=>{
        if (e.keyCode === 13 || e.key ==="enter"){
            await AddComment();
            setContent('');
            setFileUrl([]);
            return;
        }
        setContent(e.target.value);
    }

    const AddComment = async()=>{
        try {
            setLoading(true);
            
            const uploadedFiles = await UploadFile();
            const res = await axios.post(`/api/canvas/note/comment/add?serverId=${params?.id}&canvasId=${params?.canvasId}&noteId=${noteId}`, {content, fileUrl:uploadedFiles});
          
            setContent('');
            setFileUrl([]);
            setPreviewUrl([]);
            setFiles([]);
            router.refresh();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
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
    }

    const UploadFile = async()=>{
        try {
            setUploading(true);
            const formData = new FormData();
            for (const file of Array.from(files)) {
                formData.append('file', file);
            }
            const res = await axios.post('/api/upload', formData);
            if(res.status===200){
            setUploading(false);

                setFileUrl(res.data.fileUrl);
                return res.data.fileUrl;
            }
            setUploading(false);
          } catch (error) {
            setUploading(false)
          }
        };

    const RemoveImage =(id:number)=>{
      if (id > -1) {
        files.splice(id, 1);
        previewUrl.splice(id,1);
      }
      router.refresh();
     
      }


  return (
    <>


        <div className="comment_editor_div">
            <div className="comment_input">
                <textarea name="" id=""  rows={3} placeholder='Write a comment..'
                onChange={e=>setContent(e.target.value)} value={content}
                />
            </div>

            <CommentFiles files={files} previewUrl={previewUrl} RemoveImage={RemoveImage}
            loading={uploading}
            />
           
     
            <div className='comment_btns'>
                <div className='comment_left_btns'>
                <div className='comment_plus_icon'>
                    <label className="custum-file-upload flex items-center gap-1" htmlFor="file">
                        <Plus className="" size={20}/>
                        <input type="file" id="file" onChange={handleChange} multiple
                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm, application/pdf,application/vnd.ms-excel, application/zip, .doc,.docx, .xlsx, .txt, .csv, .ppt "/>
                    </label>
                </div>
                <div className="comment_emoji">
                    <EditorEmoji  
                    onChange={(emoji)=>InputHandler(emoji)}
                    emojiDialog={emojiDialog}
                    setEmojiDialog={setEmojiDialog}
                    />
                </div>
                </div>
                {/* <div className="comment_send">
                    {
                        loading
                    }
                    <button ><IoSend/></button>
                </div> */}


                <div  className={(loading || ( content==="" && fileUrl.length===0))?' text-gray-500':"send_msg ssdnBg comment_send"}  >
            <button onClick={AddComment} disabled={loading || (content==="" && fileUrl.length===0)}  >
                
              {
                loading ? <ReloadIcon  className='className="mr-2 h-4 w-4 animate-spin "' /> :  <IoSend/>
              }
             
              
              
              </button>
          </div>




            </div>
        </div>



    </>
  )
}

export default CommentEditor