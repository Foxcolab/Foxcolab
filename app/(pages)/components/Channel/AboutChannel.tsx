import React, { useState } from 'react'
import EditDailog from './EditDialog'
import { ActionTooltip } from '../tooolkit/Toolkit'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa'
import { MdAdminPanelSettings, MdInfo } from 'react-icons/md'
import { IoIosExit } from 'react-icons/io'
import { ChannelManager, Member } from '@prisma/client'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button'
import AllManager from './AllManager'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Loader from '../Loaders/Loader'


interface AboutProps {
    isAdmin:boolean
    nameLoading:boolean
    descriptionLoading:boolean
    changeNameHandler:any
    DescriptionHandler:any
    setDescription:any
    setName:any
    name:string
    type:string
    description:string
    createdBy:string
    createdAt:string
    managers: ForumManager | TestChannelManager | canvasManager | ChannelManager
    channelMember:Member[]
    schemaType:string
}


function AboutChannel({isAdmin, nameLoading, changeNameHandler, setName, name, type, description, createdBy, descriptionLoading, DescriptionHandler, setDescription, createdAt, managers, channelMember, schemaType}:AboutProps) {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const LeaveChannelHandler =async()=>{
        try {
            setLoading(true);
            {
              schemaType==="Forums" && 
              axios.put(`/api/forums/leave?serverId=${params?.id}&forumChannelId=${params?.forumId}`).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            {
              schemaType==="Canvas" && 
              axios.put(`/api/canvas/leave?serverId=${params?.id}&canvasId=${params?.canvasId}`).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            {
              schemaType==="Test Channel" && 
              axios.put(`/api/test/testChannel/leave?serverId=${params?.id}&testChannelId=${params?.testChannelId}`).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }
            {
              schemaType==="Channel" && 
              axios.put(`/api/channel/leave?serverId=${params?.id}&channelId=${params?.channelId}`).then(res=>{
                setLoading(false);
                router.refresh();
              })
            }

        } catch (error) {
            setLoading(false)
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
<EditDailog title={`${schemaType} Name`} loading={nameLoading} submitHandler={changeNameHandler} setName={setName} type={"input"} description='Names must be lower case, without spaces or full stops, and can’t be longer than 80 characters.' defaultValue={name} />
:
<ActionTooltip label={`You don't have permission to change this setting for this ${schemaType}`} side='top' align='center'>
<button className=''><BsFillQuestionCircleFill/></button>
</ActionTooltip>
}
{/* </div> */}
   </div>
  <div className="sub_text">
  {type==="public"? "#":<FaLock/>} {name}
    
    </div>
</div>

<div className="about_channel_item">
  <div className="sup_text d-flex text-center justify-between"><span>Description</span>
  {
isAdmin ? 
<EditDailog title='Description' submitHandler={DescriptionHandler} setName={setDescription} type={"textarea"} description={`Let people know what this ${schemaType} is for.` } loading={descriptionLoading} defaultValue={description} />
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

<div className="about_channel_item">
  <div className="sup_text d-flex text-center justify-between"><span>Created By</span> </div>
  <div className="sub_text text-blue-700 !import decoration-solid flex items-center" style={{color:"blue"}}>
  
  <MdAdminPanelSettings />
  {createdBy}
    
    </div>
</div>

<div className="about_channel_item">
  <div className="sup_text d-flex text-center justify-between"><span>Managed By

    {/* Hover Card  */}

    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className='text-blue-700'><MdInfo/></Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="info_container">
        <div className="info_title">
        managers can take the following actions
        </div>
        <div className="info_content">
            <div className="info_list">
            Convert {schemaType} from public to private.
            </div>
            <div className="info_list">
            Rename or archive {schemaType}.
            </div>
            <div className="info_list">
            Add and manage other {schemaType} managers
            </div>
        </div>
        </div>
      </HoverCardContent>
    </HoverCard>

  </span>
  {
isAdmin ? 

<AllManager

    isAdmin={isAdmin}
    managers={managers.member}
    name={name}
    type={type}
    channelMember={channelMember}
    managerId={managers.id}
    schemaType={schemaType}
/>
:
<ActionTooltip label={`You don't have permission to change this setting for this ${schemaType}`} side='top' align='center'>
<button className=''><BsFillQuestionCircleFill/></button>
</ActionTooltip>
}
  
   </div>
  <div className="sub_text text-blue-700 decoration-solid  all_mang_list" style={{color:"blue"}}>
  
  {
   managers.member && managers?.member?.map((mem, i)=>
   <div key={i} className='text-blue-700'>
    {mem.user.name}
   </div>
   )
  }
  {/* <MdAdminPanelSettings />
  {createdBy} */}
    
    </div>
</div>



<div className="about_channel_item">
  <div className="sup_text d-flex text-center justify-between"><span>Created At</span></div>
  <div className="sub_text">
  {createdAt}
    
    </div>
</div>

<div className="pl-4 leave_div">
    {
        loading ? <Loader/> : 
        <button className="" onClick={LeaveChannelHandler}>Leave {schemaType} <IoIosExit/> </button>
}
</div>

</div>   
    
    
    </>
  )
}

export default AboutChannel