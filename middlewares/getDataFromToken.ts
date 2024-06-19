
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import { getUserSesssion } from "@/app/api/auth/[...nextauth]/session";


export  const GetDataFromToken = async(req:NextRequest)=>{
    try {
        const token = req.cookies.get('token')?.value || ''; 
        // const googleToken = req.cookies.get('next-auth.csrf-token')?.value || '';
        const googleToken = req.cookies.get('next-auth.session-token')?.value || '';
        const googleServerToken = req.cookies.get('__Secure-next-auth.session-token')?.value || '';

        if((googleToken!==null && googleToken!=='') || (googleServerToken!==null && googleServerToken!=='')){
            const session =await getUserSesssion();
           
            return session.id;
        }else {
            const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);      
            return decodeToken.id;
        }
        // if(googleToken!==null){
        //     const decodeToken:any = jwt.very
        // } 
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({message:"You are not athorized"}, {status:400});
        // throw new Error(error.message);
    }
}

export  const GetDataFromToken2 = async(req:NextRequest)=>{
    try {
        const token = req.cookies.get('token')?.value || ''; 
        // const googleToken = req.cookies.get('next-auth.csrf-token')?.value || '';
        const googleToken = req.cookies.get('next-auth.session-token')?.value || '';
        const googleServerToken = req.cookies.get('__Secure-next-auth.session-token')?.value || '';

        if((googleToken!==null && googleToken!=='') || (googleServerToken!==null && googleServerToken!=='')){
            const session =await getUserSesssion();
            return session.id;
        }else {
            const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);      
            return decodeToken.id;
        }
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({message:"You are not athorized"}, {status:400});
        // throw new Error(error.message);
    }
}



