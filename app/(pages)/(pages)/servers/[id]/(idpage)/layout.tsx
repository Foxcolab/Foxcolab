import MainSidebar from "@/app/(pages)/components/Sidebar/MainSidebar";
import { getServer } from "@/lib/db/ServerLib";
import { myProfile } from "@/lib/db/profile";
import { db } from "@/prisma";
import { redirect } from "next/navigation";
import React from "react";


interface HomeProps {
    children: React.ReactNode;
    params:{
        id:string
    }
}


export const layout =async({children, params}:HomeProps)=>{
    const profile = await myProfile();
    if(!profile) redirect('/home');
    const server =await getServer(params?.id, profile.id);
    // console.log("ID SERVER",server);
    
    if(!server) redirect('/home')

    return (<>
    
    <MainSidebar server={server}>
    {
        children
    }
    </MainSidebar>
    
   
     
    
    </>)
};


export default layout;