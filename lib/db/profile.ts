import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserSesssion } from "@/app/api/auth/[...nextauth]/session";
import { getServerSession } from "next-auth";

export const getUserIDFromToken = (token:any)=>{
    try {
        const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);
        return decodeToken.id;
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({message:"You are not athorized"}, {status:400});
        // throw new Error(error.message);
    }
}

export const myProfile = async()=>{
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value || '';
        // const googleToken = cookieStore.get('next-auth.csrf-token')?.value || '';
        const googleToken = cookieStore.get('next-auth.session-token')?.value || '';
        console.log("Token::",token);
        let userId = ''
        if(token!=='' && token!==null){
            userId = getUserIDFromToken(token);
            // console.log("Token:", token);
       }
       else if(googleToken!==null && googleToken!==''){
            const session =await getUserSesssion();
            console.log("Session:",session);
            if(session===undefined) return;
            userId = session.id;
       }

       if(userId===''){return}
       

        // const user = await db.user.findUnique({
        //     where:{
        //         id:userId
        //     },
        //     include:{
        //         servers:{
        //          where:{
        //             Members:{
        //                 some:{
        //                     userId:userId
        //                 }
        //             }
        //          }   
        //         }
        //     }
        // });
        const user = await db.user.findUnique({
            where:{
                id:userId 
            }
        });
        console.log(user);
        return user;
               
    } catch (error) {
        console.log(error);
        
    }
  
}


export const getMyserver = async()=>{
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value || '';
        const googleToken = cookieStore.get('next-auth.session-token')?.value || '';
        let userId = ''
        if(googleToken!==null && googleToken!=='' && token===''){
            const session =await getUserSesssion();
            userId = session.id;
       }else {
         userId = getUserIDFromToken(token);
       }

        if(userId==='') return;
        
        const servers = await db.server.findMany({
            where:{
                Members:{
                    some:{
                        userId:userId
                    }
                }
            },
            include:{
                displayPicture:true,
                coverPic:true
            }
        })
        
        
        return servers;
               
    } catch (error) {
        console.log(error);
        
    }
}


export const GetuserId =  async()=>{
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value || '';

        const userId = getUserIDFromToken(token);
        return userId;
    } catch (error) {
        console.log(error);
        
    }
}


export const MySavedPost =async(userId:string, serverId:string)=>{
    try {
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId
            }
        });
        if(!member)return null;
        const MySavedPost = await db.later.findMany({
            where:{
                createdBy:member.id
            },
            include:{
                message: {
                    include:{
                       member:{
                        include:{
                            user:true
                        }
                       } 
                    }
                }
            }
        });
        // log

    } catch (error) {
        
    }
}





