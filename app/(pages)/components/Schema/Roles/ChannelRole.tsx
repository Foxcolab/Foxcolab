import React, { useState } from 'react'
import SingleRoleCompoents from './SingleRoleComponents'
import { SchemaRole } from '@prisma/client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

interface Props {
    whoCanReadMessage:SchemaRole
    whoCanSendMessage:SchemaRole
    whoCanMakePublicToPrivate:SchemaRole
    whoCanUploadMedia:SchemaRole   
    whoCanUpdateChannel:SchemaRole 
    whoCanManageManager:SchemaRole 
    whoCanManageMember:SchemaRole  
    whoCanDeleteMessage :SchemaRole
    whoCanCreateForms:SchemaRole   
    whoCanCreatePolls:SchemaRole    
    whoCanPinnedPost:SchemaRole    

    type:string   
}
function ChannelRole({whoCanReadMessage, whoCanSendMessage, whoCanMakePublicToPrivate, whoCanUploadMedia, whoCanUpdateChannel, whoCanCreateForms, whoCanCreatePolls, whoCanDeleteMessage, whoCanManageManager, whoCanManageMember, type, whoCanPinnedPost}:Props) {
    const [read, setRead] = useState(whoCanReadMessage);
    const [sendMsg, setSendMsg] = useState(whoCanSendMessage);
    const [publicToPrivate, setPublicToPrivate] = useState(whoCanMakePublicToPrivate);
    const [uploadMedia, setUploadMedia] = useState(whoCanUploadMedia);
    const [update, setUpdate] = useState(whoCanUpdateChannel);
    const [manageManager, setManageManager] = useState(whoCanManageManager);
    const [manageMember, setManageMember] = useState(whoCanManageMember);
    const [deleteMessage, setDeleteMessage] = useState(whoCanDeleteMessage);
    const [createForms, setCreateForms] = useState(whoCanCreateForms);
    const [createPolls, setCreatePolls] = useState(whoCanCreatePolls);
    const [pin, setPin] = useState(whoCanPinnedPost)
    const params = useParams();
    const router = useRouter();
    const onChangeHandler =async(title:string, schemaValue:string)=>{
        try {
            const res =await axios.put(`/api/channel/role?serverId=${params?.id}&channelId=${params?.channelId}`, {title, schemaValue});
            router.refresh();

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>

    <div className='schema_role_container'>

{/*   
        <SingleRoleCompoents title="Read Message" subTitle='Allow you to read messages without becoming member of the public channels.' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={type==="public" ? true :false} state={read}  /> */}
    <SingleRoleCompoents title="Send Message" subTitle='Allows you to send messages in the channel.' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={sendMsg} />
    <SingleRoleCompoents title="Upload Media" subTitle='Allows you to upload media in the channel' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={uploadMedia} />
    <SingleRoleCompoents title="Update Channel" subTitle='Allows you to update channel basic setting.' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={update} />
    <SingleRoleCompoents title="Update Public Channel to Private Channel" subTitle='Allows you to change the public channel to private channel' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={publicToPrivate} />
    <SingleRoleCompoents title="Manage Channel Managers" subTitle='Allows you to add new channel manager and remove exising one from channel manager list' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={manageManager} />
    <SingleRoleCompoents title="Manage Channel Members" subTitle='Allows you to add new channel member or remove existing one from this channel.' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={manageMember} />
    <SingleRoleCompoents title="Manage Messages" subTitle='Allows you to delete channel messages.' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={deleteMessage} />
    
    <SingleRoleCompoents title="Pin Message" subTitle='Allows you to pin a messsage to the channel.' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={pin} />

    <SingleRoleCompoents title="Create Polls" subTitle='Allows you to create polls in the channel.' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={createPolls} />
    <SingleRoleCompoents title="Create Forms" subTitle='Allows you to create forms in the channel.' schemaType='Channel'  onChangeHandler={onChangeHandler} disabled={false} state={createForms} />
   
    </div>
    </>
  )
}

export default ChannelRole