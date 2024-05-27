
"use server";
import { getUserSesssion } from "@/app/api/auth/[...nextauth]/session";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

export const GetAuth =async(req:NextApiRequest)=>{
     
    // const {token,'next-auth.csrf-token':csrfToken } = req.cookies;
    const {token,'next-auth.session-token':csrfToken, '__Secure-next-auth.session-token':serverCsrfToken } = req.cookies;
    console.log("Token::::", token);
    console.log("Csrf Token:", csrfToken);
    if(token!==null && token!==undefined && token!==''){
        const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);      
        return decodeToken.id;
    }else if(csrfToken || serverCsrfToken){
        console.log("Cominggg......sss");
        const session = await getUserSesssion();
        console.log("Sesssssion::::", session);
        if(session!==undefined && session!==null && token===undefined){
            return session.id;
        }
     }

    //  if(csrfToken && token===null){
    //     const session =await getUserSesssion();
    //     if(session!==undefined && session!==null && token===null){
    //      return session.id;
    //     }
    //  }else {
         
    //  }
       
    
    // const token = req.cookies.token;
    // const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);
    // return decodeToken.id;
}