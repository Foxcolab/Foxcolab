"use client";
import { Member, Message, Server } from '@prisma/client'
import React, { useState } from 'react'
import FilesHeader from './FilesHeader'
import SingleMsgFile from '../Channel/ChannelPin/SingleMsgFile';
import AllFiles from './AllFiles';
import CreatedByYou from './CreatedByYou';
import SharedWithYou from './SharedWithYou';

interface FilesProps {
    messages:Message[]
    memberId:string
    server:Server

}
function FilesContainer({messages, memberId, server}:FilesProps) {
    const [state, setState] = useState('All Files');
    const [MessageFile, setMessageFile] = useState(messages);

    const FilesStatus=(status:string)=>{
        setState(status);
        const msgs = []
        if(status==="Created by you"){
            for(let i=0; i<messages.length; i++){
                if(messages[i].memberId ===memberId){
                    msgs.push(messages[i])
                }
            }
        setMessageFile(msgs);
        }else if(status==="All Files"){
            setMessageFile(messages)
        }
        else {
            for(let i=0; i<messages.length; i++){
                if(messages[i].memberId!==memberId){
                    msgs.push(messages[i])
                }
            }
        setMessageFile(msgs);

        }
        

    }



  return (
    <>
    
    {/* <h1>Files container</h1> */}
    <FilesHeader  FilesStatus={FilesStatus} state={state}   />

    {
        state==="Created by you" ? <CreatedByYou MessageFile={MessageFile} /> : state==="All Files" ? <AllFiles MessageFile={MessageFile} server={server}  />: <SharedWithYou MessageFile={MessageFile} />
    }



   
    
    </>
  )
}

export default FilesContainer