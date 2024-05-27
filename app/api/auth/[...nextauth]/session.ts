"use server";
import {User, getServerSession} from "next-auth";



export const session = async({session, token}:any)=>{
    session.user.id = token.id;
    return session;
}


export const getUserSesssion = async():Promise<User> =>{
    const authUserSession = await getServerSession({
        callbacks:{
            session,
        },
    })
    console.log("Auth User Session::", authUserSession.user);
    
    return authUserSession?.user
}