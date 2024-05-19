

import ServerHome from '@/app/(pages)/components/v1/ServerHome/ServerHome';
import { getServer } from '@/lib/db/ServerLib';
import { myProfile } from '@/lib/db/profile';
import { redirect } from 'next/navigation';
import React from 'react'


interface Props {
  params:{
    id:string
  }
}
async function page({params}:Props) {
  const profile = await myProfile();
      if(!profile) redirect('/home');
      const server =await getServer(params?.id, profile.id);
      // console.log("ID SERVER",server);
      
      if(!server) redirect('/home')
  
  
  return (
    <>

<ServerHome server={server} user={profile}>
    
    <div className="forum_msg_container">

    </div>

   </ServerHome>
    



    
    </>
  )
}

export default page