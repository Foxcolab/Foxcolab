// "use client";

import CanvasEditor from '@/app/(pages)/components/Editor/CanvasEditor';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

 function NoteIdPage() {
    // const user = await myProfile();
    // if(!user) redirect('/home');



  return (
    <>

    <CanvasEditor />
    {/* <CanvasEditor data={data} onChange={setData} holder='nothing' /> */}

    </>
  )
}

export default NoteIdPage