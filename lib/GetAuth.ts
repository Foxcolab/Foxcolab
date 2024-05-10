
import { getUserSesssion } from "@/app/api/auth/[...nextauth]/session";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

export const GetAuth =async(req:NextApiRequest)=>{
    
    const token = req.cookies.token;
    const googleToken = req.cookies;  
    
       const session =await getUserSesssion();
       if(session!==undefined && session!==null){
        return session.id;
       }
    
    // const token = req.cookies.token;
    const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);
    return decodeToken.id;
}