"use client";
import React, { useState } from 'react'
import TestChannelContainer from './TestChannelContainer'
import { Member, Result, Server, Test, TestChannelManager } from '@prisma/client'
import MainSidebar from '../../Sidebar/MainSidebar'
import TestChannelHeader from '../../Schema/Header/TestChannelHeader'
import ChannelResult from '../ResultTable/ChannelResult/ChannelResult';

interface Props {
    tests:Test[]
    sectionId:string
    server:Server
    testChannelName:string
    members:Member[]
    managers:TestChannelManager[]
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
}


function TestChannelComponent({tests, sectionId, server, testChannelName, members,serverMembers, sendMsg, managers, createdAt, createdBy, type, isAdmin, description, results, testLength, attemptedTests }:Props) {


    const [showResult, setShowResult] = useState(false);


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
      />

      {
        showResult===false ? 
        <TestChannelContainer tests={tests} sectionId={sectionId} attemptedTests={attemptedTests} /> :
        <ChannelResult results={results} />

      }
    </>
  )
}

export default TestChannelComponent