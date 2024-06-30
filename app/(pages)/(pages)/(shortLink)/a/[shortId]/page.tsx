import { myProfile } from '@/lib/db/profile';
import { db } from '@/prisma';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
    params:{
        shortId:string
    }
}

async function page({params}:Props) {

    console.log(params);
    const shortUrl = await db.shortUrl.findFirst({
        where:{
            shortUrl:params?.shortId as string
        }
    });
    // const user  = myProfile();

    if(shortUrl){
        redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${shortUrl.originalUrl}`);
    }else {
        const user =await myProfile();
        if(!user){
            redirect('/');
        }else {
            redirect('/home');
        }
    }



  return (
    <div>page</div>
  )
}

export default page