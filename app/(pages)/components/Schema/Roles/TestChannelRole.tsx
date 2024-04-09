import { SchemaRole } from '@prisma/client'
import React, { useState } from 'react'
import SingleRoleCompoents from './SingleRoleComponents'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from 'axios'


interface Props {
  whoCanUpdateTestChannel:SchemaRole
  whoCanMakePublicToPrivate:SchemaRole
  whoCanCreateTest:SchemaRole
  whoCanManageTest:SchemaRole
  whoCanGiveTest:SchemaRole
  whoCanManageMember:SchemaRole
  whoCanManageManager:SchemaRole
  type:string
}
function TestChannelRole({whoCanCreateTest, whoCanGiveTest, whoCanMakePublicToPrivate, whoCanManageManager, whoCanManageMember, whoCanManageTest, whoCanUpdateTestChannel, type}:Props) {
  const [createTest, setCreateTest] = useState(whoCanCreateTest)
  const [giveTest, setGiveTest] = useState(whoCanGiveTest);
  const [publicToPrivate, setPublicToPrivate] = useState(whoCanMakePublicToPrivate);
  const [manageManager, setManageManager] = useState(whoCanManageManager);
  const [manageMember, setManageMember] = useState(whoCanManageMember);
  const [manageTest, setManageTest] = useState(whoCanManageTest);
  const [update, setUpdate] = useState(whoCanUpdateTestChannel);

  const params = useParams();
  const router = useRouter();


  const onChangeHandler =async(title:string, schemaValue:string)=>{
    try {
        const res =await axios.put(`/api/test/testChannel/role?serverId=${params?.id}&testChannelId=${params?.testChannelId}`, {title, schemaValue});
        router.refresh();

    } catch (error) {
        console.log(error);
    }
}


  return (
    <>
    
    <div className="schema_role_container">
    <SingleRoleCompoents title="Update Test Channels" subTitle="Allows you to update basic setting of the test channels"  onChangeHandler={onChangeHandler} disabled={false} schemaType={"Test Channel"} state={update} />
    <SingleRoleCompoents title="Public Test Channel to Private Test Channel" subTitle="Allows you to make public test channels to private channels."  onChangeHandler={onChangeHandler} disabled={false} schemaType={"Test Channel"} state={publicToPrivate} />
    <SingleRoleCompoents  title="Create Test" subTitle="Allows you to create new tests in test channels" onChangeHandler={onChangeHandler} disabled={false} schemaType={"Test Channel"} state={createTest} />
    <SingleRoleCompoents title="Manage Test" subTitle="Allows you to create  update and delete existing tests from test channels" onChangeHandler={onChangeHandler} disabled={false} schemaType={"Test Channel"} state={manageTest} />
    <SingleRoleCompoents title="Give Test" subTitle="Allows you to give test on availble tests in the test channels" onChangeHandler={onChangeHandler} disabled={type==="public" ? true : false} schemaType={"Test Channel"} state={giveTest} />
    <SingleRoleCompoents title="Manage Test Channel Member" subTitle="Allows you to add new members and remove existing member from the Test Channels"  onChangeHandler={onChangeHandler} disabled={false} schemaType={"Test Channel"} state={manageMember} />
    <SingleRoleCompoents title="Manage Test Channel Managers" subTitle="Allows you to make new managers and remove existing managers from manager list"  onChangeHandler={onChangeHandler} disabled={false} schemaType={"Test Channel"} state={manageManager} />
    </div>
    
    </>
  )
}

export default TestChannelRole