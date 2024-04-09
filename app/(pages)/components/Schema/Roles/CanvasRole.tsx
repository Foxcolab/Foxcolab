import { SchemaRole } from '@prisma/client'
import React, { useState } from 'react'
import SingleRoleCompoents from './SingleRoleComponents'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'


interface Props {
  whoCanUpdateCanvas:SchemaRole
  whoCanMakePublicToPublic:SchemaRole
  whoCanCreateNote:SchemaRole
  whoCanManageNote:SchemaRole
  whoCanUploadMediaInComment:SchemaRole
  whoCanDeleteNote:SchemaRole
  whoCanComment:SchemaRole
  whoCanManageMember:SchemaRole
  whoCanManageManager:SchemaRole
  whoCanUpdateNote:SchemaRole
}

function CanvasRole({whoCanComment, whoCanCreateNote, whoCanDeleteNote, whoCanMakePublicToPublic, whoCanManageManager, whoCanManageMember, whoCanManageNote, whoCanUpdateCanvas, whoCanUploadMediaInComment, whoCanUpdateNote}:Props) {
  const [update, setUpdate] = useState(whoCanUpdateCanvas);
  const [publicToPrivate, setPublicToPrivate] = useState(whoCanMakePublicToPublic);
  const [createNote, setCreateNote] = useState(whoCanCreateNote)
  const [manageNote, setWhoCanManageNote] = useState(whoCanManageNote);
  const [uploadMedia, setUploadMedia] = useState(whoCanUploadMediaInComment)
  const [deleteNote, setDeleteNote] = useState(whoCanDeleteNote);
  const [updateNote, setUpdateNote] = useState(whoCanUpdateNote)
  const [comment, setComment] = useState(whoCanComment);
  const [manageMember, setManageMember] = useState(whoCanManageMember);
  const [manageManager, setManageManager] = useState(whoCanManageManager);

  const params = useParams();
  const router = useRouter();

  const onChangeHandler =async(title:string, schemaValue:string)=>{
    try {
        const res =await axios.put(`/api/canvas/role?serverId=${params?.id}&canvasId=${params?.canvasId}`, {title, schemaValue});
        router.refresh();

    } catch (error) {
        console.log(error);
    }
}
  return (
    <>
    <div className="schema_role_container">
    <SingleRoleCompoents title='Update Canvas' subTitle='Allows you to update basic setting of the canvas' onChangeHandler={onChangeHandler} disabled={false} state={update} schemaType='Canvas' />
    <SingleRoleCompoents  title="Manage Canvas Managers" subTitle="Allows you to make new canvas manager and remove existing managers from the canvas list"  onChangeHandler={onChangeHandler} disabled={false} state={manageManager} schemaType='Canvas' />
    <SingleRoleCompoents  title="Manage Canvas Members" subTitle="Allows you to add new canvas members and remove existing canvas members."  onChangeHandler={onChangeHandler} disabled={false} state={manageMember} schemaType='Canvas' />
    <SingleRoleCompoents title="Update public Canvas to private Canvas" subTitle="Allows you to change public canvas to private canvas." onChangeHandler={onChangeHandler} disabled={false} state={publicToPrivate} schemaType='Canvas' />
    <SingleRoleCompoents title="Manage Note" subTitle="Allows you to create new note, edit existing canvas note."  onChangeHandler={onChangeHandler} disabled={false} state={manageNote} schemaType='Canvas' />
    <SingleRoleCompoents title="Create Note" subTitle="Allows you to create  new canvas note."  onChangeHandler={onChangeHandler} disabled={false} state={createNote} schemaType='Canvas' />
    <SingleRoleCompoents title="Delete Note" subTitle="Allows you to delete existing canvas note."  onChangeHandler={onChangeHandler} disabled={false} state={deleteNote} schemaType='Canvas' />
    <SingleRoleCompoents title="Upload Media" subTitle="Allows you to upload media on notes's comment" onChangeHandler={onChangeHandler} disabled={false} state={uploadMedia} schemaType='Canvas' />
    <SingleRoleCompoents title="Update note" subTitle="Allows you to update existing note in the canvas"   onChangeHandler={onChangeHandler} disabled={false} state={updateNote} schemaType='Canvas' />
    <SingleRoleCompoents title="Note Comment" subTitle="Allows you to comment on exiting notes in the canvas"  onChangeHandler={onChangeHandler} disabled={false} state={comment} schemaType='Canvas' />
    </div>
    </>
  )
}

export default CanvasRole