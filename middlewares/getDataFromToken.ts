
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import { getUserSesssion } from "@/app/api/auth/[...nextauth]/session";


export  const GetDataFromToken = async(req:NextRequest)=>{
    try {
        const token = req.cookies.get('token')?.value || ''; 
        const googleToken = req.cookies.get('next-auth.csrf-token')?.value || '';

        if(googleToken!==null && googleToken!==''){
            const session =await getUserSesssion();
            return session.id;
        }
        // if(googleToken!==null){
        //     const decodeToken:any = jwt.very
        // }      
        if(googleToken!==null){
            const userSession = getUserSesssion();
            console.log("User Session",userSession);

        }
        const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);      
        return decodeToken.id;
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({message:"You are not athorized"}, {status:400});
        // throw new Error(error.message);
    }
}

export  const GetDataFromToken2 = (req:NextRequest)=>{
    try {
        const token = req.cookies.get('token')?.value || '';
        console.log(token);
        
        //const token = cookies().get('token')?.value || ''
        const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);
        return decodeToken.id;
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({message:"You are not athorized"}, {status:400});
        // throw new Error(error.message);
    }
}



