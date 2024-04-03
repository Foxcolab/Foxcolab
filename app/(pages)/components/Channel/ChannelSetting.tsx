import React, { useState } from 'react'
import { FaLock } from 'react-icons/fa'
import { IoIosInformationCircle } from 'react-icons/io'
import { ActionTooltip } from '../tooolkit/Toolkit';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { AiFillDelete } from 'react-icons/ai';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Loader from '../Loaders/Loader';
import EditDailog from './EditDialog';

interface ChannelSettingProps {
    isAdmin:boolean
    type:string,
    name:string,
    description:string,
    sendMsg:boolean
    nameLoading:boolean
    desciptionLoading:boolean
    setName:any
    setDescription:any
    ChangeNameHandler:any
    ChangeDescriptionHandler:any
    schemaType:string
}
function ChannelSetting({isAdmin, type, name, description, sendMsg, setName, setDescription, ChangeNameHandler, ChangeDescriptionHandler,nameLoading , desciptionLoading, schemaType }:ChannelSettingProps) {
    const [confirmation, setConfirmation] = useState(false);
    const [checked, setChecked] = useState(sendMsg);
    const defaultType = type==="private"?true : false;
    const [newType, setNewType] = useState(defaultType); 
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter();
    // isAdmin=false;
    const RemoveChannel =()=>{

    }
    const saveChanges=async()=>{
        try {
            setLoading(true);
            {
              schemaType==="Forums" && 
              axios.put(`/api/forums/setting?serverId=${params?.id}&forumChannelId=${params?.forumId}`,{type:newType, sendMsg:checked}).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            {
              schemaType==="Canvas" && 
              axios.put(`/api/canvas/setting?serverId=${params?.id}&canvasId=${params?.canvasId}`,{type:newType, sendMsg:checked}).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            {
              schemaType==="Test Channel" && 
              axios.put(`/api/test/testChannel/setting?serverId=${params?.id}&testChannelId=${params?.testChannelId}`,{type:newType, sendMsg:checked}).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            {
              schemaType==="Channel" && 
              axios.put(`/api/channel/setting?serverId=${params?.id}&channelId=${params?.channelId}`, {type:newType, sendMsg:checked}).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
            
        }
    }


  return (
   <>
   
   
   <div className="about_channel_container" >

<div className="about_channel_item">
  <div className="sup_text d-flex text-center justify-between"><span>{schemaType} Name</span> 
  {
    isAdmin ? 
    <EditDailog title={`${schemaType} Name`} submitHandler={ChangeNameHandler} setName={setName} type={"input"} description='Names must be lower case, without spaces or full stops, and can’t be longer than 80 characters.' defaultValue={name} loading={nameLoading} schemaType={schemaType}  />
    // <button className='text-blue-700 font-semibold hover:decoration-solid'>Edit</button>
     :
     <ActionTooltip label={`You don't have permission to change this setting for this ${schemaType}`} side='top' align='center'>
      <button className=''><BsFillQuestionCircleFill/></button>
     </ActionTooltip>
  }
  </div>
  <div className="sub_text">
  {type==="public"? "#":<FaLock/>} {name}
    
    </div>
</div>

<div className="about_channel_item">
  <div className="sup_text d-flex text-center justify-between"><span>Description</span> 
  {
    isAdmin ? 
    <EditDailog title='Description' submitHandler={ChangeDescriptionHandler} setName={setDescription} type={"textarea"} description={`Let people know what this ${schemaType} is for. `} defaultValue={description} loading={desciptionLoading} />
     :
     <ActionTooltip label={`You don't have permission to change this setting for this ${schemaType}`} side='top' align='center'>
      <button className=''><BsFillQuestionCircleFill/></button>
     </ActionTooltip>
  }
  </div>
 
  <div className="sub_text">
  {description}
    
    </div>
</div>

<div className="about_channel_item2">
  <div className="sup_text d-flex text-center justify-between"><span>Change to a {type==="public"? "Private":"Public"} {schemaType}</span> 
  {
    isAdmin ? 
    <Switch checked={newType} onCheckedChange={()=>setNewType(!newType)} />
     :
     <ActionTooltip label={`You don't have permission to change this setting for this ${schemaType}`} side='top' align='center'>
      <button className=''><BsFillQuestionCircleFill/></button>
     </ActionTooltip>
  }
  </div>
</div>
<div className="about_channel_item2">
    
            <div className="sup_text d-flex text-center justify-between">
              {schemaType==="Channel" ? `Allow member to send messages in this ${schemaType}` : `Allow member to create ${schemaType==="Forums"? "forum": schemaType==="Canvas"? "note" : schemaType==="Test" ? "test" : ''} in this ${schemaType}`}

            <div>
            {
    isAdmin ? <Switch checked={checked} onCheckedChange={()=>setChecked(!checked)} />
     :
     <ActionTooltip label={`You don't have permission to change this setting for this ${schemaType}`} side='top' align='center'>
      <button className=''><BsFillQuestionCircleFill/></button>
     </ActionTooltip>
  }
                
            </div>
            </div>
            <div className='sub_text'>
            {
                sendMsg===true ? 
            "Now every member can send message":
            "Now only admin can send message"
        }
            </div>
 </div>          
<div className="flex items-center justify-between pr-4">
<div className="pl-4 leave_div">
            <Button className="" onClick={()=>setConfirmation(true)} disabled={!isAdmin}><AiFillDelete/> Delete {schemaType}  </Button>
          </div>
{
    isAdmin && (checked!==sendMsg || defaultType!==newType )? <div className="pl-4 saved_chgs_member">
        {
            loading ? <Loader /> : <Button className="" onClick={saveChanges} > Save Changes</Button>
        }
    
</div> : ''
}


</div>
</div>

<AlertDialog open={confirmation} onOpenChange={setConfirmation}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure to delete this {schemaType}?</AlertDialogTitle>
      <AlertDialogDescription> This is permanently delete the {schemaType} from this server. All contents in this {schemaType} will also be deleted.
        You will not be able to recover the deleted content. This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel >Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={RemoveChannel}>Delete {schemaType}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
   
   
   </>
  )
}

export default ChannelSetting