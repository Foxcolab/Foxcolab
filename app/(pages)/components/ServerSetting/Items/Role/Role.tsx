import React, { useState } from 'react'
import ItemHeader from '../../Components/ItemHeader'
import RoleComponents from './components/RoleComponents'
import { Server } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import SchemaRoles from './components/SchemaRoles'

interface Props {
    setOpen: any
    server:Server
    isAdmin:boolean
  }
function Role({setOpen, server, isAdmin}:Props) {

  const [serverUpdate, setServerUpdate] = useState(server.whoCanUpdateServer);
  const [invite, setInvite] = useState(server.whoCanInviteMember);
  const [kickMember, setKickMember] = useState(server.whoCanKickMember);
  const [manageGroup, setManageGroup] = useState(server.whoManageGroups);
  const [createSection, setCreateSection] = useState(server.whoCreateSection);
  const [createChannel, setCreateChannel] = useState(server.whoCreateChannel);
  const [createForum, setCreateForum] = useState(server.whoCreateForum);
  const [createCanvas, setCreateCanvas] = useState(server.whoCreateCanvas);
  const [createTest, setCreateTest] = useState(server.whoCreateTestChannel);
  const [botResponse, setBotResponse] = useState(server.whoCreateBotResponse);
  const [createSpreadsheet, setCreateSpreadsheet] = useState(server.whoCreateSpreadsheet);
  const router = useRouter();
  const onChangeHandler =async(title:string, value:string)=>{
    try {
     
      console.log(title, value);

      const res =await axios.put(`/api/server/update/role?serverId=${server.id}`, {title, schemaValue:value});
      router.refresh();
      // const res = 
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <>
   <ItemHeader setOpen={setOpen} title='Roles' />
    <div className="setting_section" style={{borderBottom:"none"}}>
    <div className="setting_section_title">Manage who can do what on your server. </div>


    <div className='mr-12'>

 
    <div className="roles_heading">General Permissions</div>

    <RoleComponents state={serverUpdate} onChangeHandler={onChangeHandler} title="Update Server" subTitle="Allows you to update the server's settings and manage invites" />
    <RoleComponents state={invite} onChangeHandler={onChangeHandler} title="Invite Members" subTitle="Allows you to invite members to the server
" />
    <RoleComponents state={kickMember} onChangeHandler={onChangeHandler} title="Kick/Ban a Member" subTitle="Allows you to kick or ban members from the server
" />
    <RoleComponents state={manageGroup} onChangeHandler={onChangeHandler} title="Manage Groups" subTitle="Allows you to create new groups and edit or delete existing ones" />
    <RoleComponents state={createSection} onChangeHandler={onChangeHandler} title="Create Section" subTitle="Allows you to create new Section" />
    <RoleComponents state={createChannel} onChangeHandler={onChangeHandler} title="Manage Channel" subTitle="Allows you to create new channels" />
    <RoleComponents state={createForum} onChangeHandler={onChangeHandler} title="Manage Canvas" subTitle="Allows you to create new Canvas" />
    <RoleComponents state={createCanvas} onChangeHandler={onChangeHandler} title="Manage Forums" subTitle="Allows you to create new Forums Channel" />
    <RoleComponents state={createTest} onChangeHandler={onChangeHandler} title="Manage Test Channels" subTitle="Allows you to create new Test Channel" />
    <RoleComponents state={createSpreadsheet} onChangeHandler={onChangeHandler} title="Manage Spreadsheets" subTitle="Allows you to create new Spreadsheets" />
    <RoleComponents state={botResponse} onChangeHandler={onChangeHandler} title="Manage Bot Response" subTitle="Allows you to create new bot response and edit or delete exiting ones." />
 


    <div className="roles_heading pt-8">Channels Permissions</div>
 
    

    <SchemaRoles title="Read Message" subTitle='Allow you to read messages without becoming member of the public channels.' type='Channel' />
    <SchemaRoles title="Send Message" subTitle='Allows you to send messages in the channel.' type='Channel' />
    <SchemaRoles title="Upload Media" subTitle='Allows you to upload media in the channel' type='Channel' />
    <SchemaRoles title="Update Channel" subTitle='Allows you to update channel basic setting.' type='Channel' />
    <SchemaRoles title="Update Public Channel to Private Channel" subTitle='Allows you to change the public channel to private channel' type='Channel' />
    <SchemaRoles title="Manage Channel Managers" subTitle='Allows you to add new channel manager and remove exising one from channel manager list' type='Channel' />
    <SchemaRoles title="Manage Channel Members" subTitle='Allows you to add new channel member or remove existing one from this channel.' type='Channel' />
    <SchemaRoles title="Manage Messages" subTitle='Allows you to delete channel messages.' type='Channel' />
    <SchemaRoles title="Pin Message" subTitle='Allows you to pin a messsage in the channel.'  type='Channel' />
    <SchemaRoles title="Create Polls" subTitle='Allows you to create polls in the channel.' type='Channel' />
    <SchemaRoles title="Create Forums" subTitle='Allows you to create forums in the channel.' type='Channel' />
   

    <div className="roles_heading pt-8">Forum Channel Permissions</div>

    
    <SchemaRoles title="Update Forum Channel" subTitle='Allows you to update forum channel basic setting.' type='Forums' />
    <SchemaRoles title="Update public Forum Channel to private Forum Channel" subTitle="Allows you to change public forum channel to private forum channel." type='Forums' />
    <SchemaRoles title="Manage Forums" subTitle='Allows you to create new forum, edit and delete forum in the forum channel.' type='Forums' />
    <SchemaRoles title="Upload media in post's comment" subTitle="Allow you to upload media in post's comment." type='Forums' />
   
    <SchemaRoles title="Manage comment" subTitle="Allows you to delete comments from forums post." type='Forums' />
    <SchemaRoles title="Manage Member" subTitle="Allows you to add new member to the forum channel and remove existing members from forum channel" type='Forums' />
    <SchemaRoles title="Manage Forum Chanel Managers" subTitle="Allows you to make new forum channel managers and remove existing managers from the managers list." type='Forums' />


      {/* CANVAS  */}

    <div className="roles_heading pt-8">Canvas Permissions</div>
    <SchemaRoles title="Update Canavs" subTitle="Allows you to update basic setting of the canvas"  type='Canvas' />
    <SchemaRoles title="Manage Canvas Managers" subTitle="Allows you to make new canvas manager and remove existing managers from the canvas list" type='Canvas'  />
    <SchemaRoles title="Manage Canvas Members" subTitle="Allows you to add new canvas members and remove existing canvas members." type='Canvas'  />
    <SchemaRoles title="Update public Canvas to private Canvas" subTitle="Allows you to change public canvas to private canvas." type='Canvas' />
    <SchemaRoles title="Create Note" subTitle="Allows you to create new canvas note." type='Canvas'  />
    <SchemaRoles title="Delete Note" subTitle="Allows you to delete existing canvas note." type='Canvas'  />
    <SchemaRoles title="Manage Note" subTitle="Allows you to create new note, edit or delete existing canvas note." type='Canvas'  />
    <SchemaRoles title="Upload Media" subTitle="Allows you to upload media on notes's comment" type='Canvas'  />
    <SchemaRoles title="Update note" subTitle="Allows you to update existing note in the canvas"  type='Canvas' />
    <SchemaRoles title="Note Comment" subTitle="Allows you to comment on exiting notes in the canvas" type='Canvas'  />



    {/* TEST CHANNELS  */}
    <div className="roles_heading pt-8">Test Channels Permissions</div>
    <SchemaRoles title="Update Test Channels" subTitle="Allows you to update basic setting of the test channels"  type='Test Channel' />
    <SchemaRoles title="Manage Test Channel Managers" subTitle="Allows you to make new managers and remove existing managers from manager list" type='Test Channel' />
    <SchemaRoles title="Manage Test Channel Member" subTitle="Allows you to add new members and remove existing member from the Test Channels"  type='Test Channel'/>
    <SchemaRoles title="Public Test Channel to Private Test Channel" subTitle="Allows you to make public test channels to private channels."  type='Test Channel'/>
    <SchemaRoles title="Create Test" subTitle="Allows you to create new tests in test channels"  type='Test Channel'/>
    <SchemaRoles title="Manage Test" subTitle="Allows you to create  update and delete existing tests from test channels"  type='Test Channel'/>
    <SchemaRoles title="Give Test" subTitle="Allows you to give test on availble tests in the test channels" type='Test Channel' />
    



    </div>
    </div>
    </>
  )
}

export default Role