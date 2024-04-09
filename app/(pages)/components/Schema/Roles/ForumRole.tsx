import { SchemaRole } from '@prisma/client'
import React, { useState } from 'react'
import SingleRoleCompoents from './SingleRoleComponents'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from 'axios'


interface Props {
  whoCanUpdateForums:SchemaRole
  whoCanMakePublicToPrivate:SchemaRole
  whoCanCreatePost:SchemaRole
  whoCanManagePost:SchemaRole
  whoCanUploadMediaInComment:SchemaRole
  whoCanDeletePost:SchemaRole
  whoCanComment:SchemaRole
  whoCanManageMember:SchemaRole
  whoCanManageManager:SchemaRole
  type:"public" | "private"
}

function ForumRole({whoCanUpdateForums, whoCanMakePublicToPrivate, whoCanCreatePost,whoCanManagePost, whoCanUploadMediaInComment, whoCanDeletePost, whoCanComment, whoCanManageMember, whoCanManageManager , type }:Props) {
  const [createPost, setCreatePost] = useState(whoCanCreatePost)
  const [managePost, setManagePost] = useState(whoCanManagePost);
  const [deletePost, setDeletePost] = useState(whoCanDeletePost);
  const [createComment, setCreateComment] = useState(whoCanComment);
  const [publicToPrivate, setPublicToPrivate] = useState(whoCanMakePublicToPrivate);
  const [uploadMedia, setUploadMedia] = useState(whoCanUploadMediaInComment);
  const [update, setUpdate] = useState(whoCanUpdateForums);
  const [manageManager, setManageManager] = useState(whoCanManageManager);
  const [manageMember, setManageMember] = useState(whoCanManageMember);
  
 
    const params = useParams();
    const router = useRouter();
    const onChangeHandler =async(title:string, schemaValue:string)=>{
        try {
            const res =await axios.put(`/api/forums/role?serverId=${params?.id}&forumChannelId=${params?.forumId}`, {title, schemaValue});
            router.refresh();

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className='schema_role_container'>

  
<SingleRoleCompoents title="Update Forum Channel" subTitle='Allows you to update forum channel basic setting.' onChangeHandler={onChangeHandler} disabled={false} state={update} schemaType='Forum'  />
<SingleRoleCompoents title="Update public Forum Channel to private Forum Channel" subTitle="Allows you to change public forum channel to private forum channel." schemaType='Forum'  onChangeHandler={onChangeHandler} disabled={false} state={publicToPrivate}  />
<SingleRoleCompoents title="Create Forums" subTitle='Allows you to create new forum, edit and delete forum in the forum channel.' schemaType='Forum'  onChangeHandler={onChangeHandler} disabled={false} state={createPost} />
<SingleRoleCompoents title="Manage Forums" subTitle='Allows you to  edit and delete forum in the forum channel.' schemaType='Forum'  onChangeHandler={onChangeHandler} disabled={false} state={managePost} />
<SingleRoleCompoents title="Upload media in Forums's comment" subTitle="Allow you to upload media in forums's comment."  schemaType='Forum'  onChangeHandler={onChangeHandler} disabled={false} state={uploadMedia} />
<SingleRoleCompoents title="Delete Forums" subTitle="Allow you to delete forum in forums's comment."  schemaType='Forum'  onChangeHandler={onChangeHandler} disabled={false} state={deletePost} />
<SingleRoleCompoents title="Manage comment" subTitle="Allows you to delete comments from forums post." schemaType='Forum'  onChangeHandler={onChangeHandler} disabled={false} state={createComment} />
<SingleRoleCompoents title="Manage Member" subTitle="Allows you to add new member to the forum channel and remove existing members from forum channel"  schemaType='Forum'  onChangeHandler={onChangeHandler} disabled={false} state={manageManager} />
<SingleRoleCompoents title="Manage Forum Channel Managers" subTitle="Allows you to make new forum channel managers and remove existing managers from the managers list."  schemaType='Forum'  onChangeHandler={onChangeHandler} disabled={false} state={manageMember} />

</div>
    
    </>
  )
}

export default ForumRole