"use client";
import React, { useState } from 'react'
import TestChannelContainer from './TestChannelContainer'
import { Member, Result, Server, Test, TestChannel, TestChannelManager } from '@prisma/client'
import MainSidebar from '../../Sidebar/MainSidebar'
import TestChannelHeader from '../../Schema/Header/TestChannelHeader'
import ChannelResult from '../ResultTable/ChannelResult/ChannelResult';

interface Props {
    tests:Test[]
    sectionId:string
    testChannelName:string
    members:Member[]
    managers:TestChannelManager | null
    serverMembers:Member[]
    createdAt:string
    createdBy:string
    type:string
    sendMsg:boolean
    isAdmin:boolean
    description:string
    results:Result[]
    testLength:number
    attemptedTests:Test[]
    schema:TestChannel
    member:Member
}


function TestChannelComponent({tests, sectionId, testChannelName, members,serverMembers, sendMsg, managers, createdAt, createdBy, type, isAdmin, description, results, testLength, attemptedTests, schema, member }:Props) {


    const [showResult, setShowResult] = useState(false);

    let whoCanCreateTest =false;
    const isManager = managers.memberIds.includes(member.id);
    const isMember = schema.memberIds.includes(member.id);

    if(((isAdmin || isManager || isMember) && schema?.whoCanCreateTest==="member") || ((isManager || isAdmin) && schema?.whoCanCreateTest==="manager") || (isAdmin && schema?.whoCanCreateTest==="admin") ){
      whoCanCreateTest = true;
      }


  return (
    <>
      <TestChannelHeader
      name={testChannelName}
      description={description}
      members={members}
      managers={managers}
      serverMembers={serverMembers}
      createdAt={createdAt}
      createdBy={createdBy}
      schemaType='Test Channel'
      type={type}
      sendMsg={sendMsg}
      isAdmin={isAdmin}
      showResult={showResult}
      setShowResult={setShowResult}
      resultLength={results.length}
      testLength={testLength}
      schema={schema}
      member={member}
      />

      {
        showResult===false ? 
        <TestChannelContainer tests={tests} sectionId={sectionId} attemptedTests={attemptedTests} whoCanCreateTest={whoCanCreateTest} memberId={member.id} /> :
        <ChannelResult results={results}   />

      }
    </>
  )
}

export default TestChannelComponent