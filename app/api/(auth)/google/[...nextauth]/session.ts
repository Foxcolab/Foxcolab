import {User, getServerSession} from "next-auth";



export const session = async({session, token}:any)=>{
    session.user.id = token.id;
    return session;
}


export const getUserSesssino = async():Promise<User> =>{
    const authUserSession = await getServerSession({
        callbacks:{
            session,
        },
    })
    return authUserSession?.user
}