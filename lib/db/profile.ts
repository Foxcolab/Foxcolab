import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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

        const userId = getUserIDFromToken(token);

        
        const user = await db.user.findUnique({
            where:{
                id:userId
            },
            include:{
                servers:{
                 where:{
                    Members:{
                        some:{
                            userId:userId
                        }
                    }
                 }   
                }
            }
        });
        
        
        return user;
               
    } catch (error) {
        console.log(error);
        
    }
  
}


export const getMyserver = async()=>{
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value || '';

        const userId = getUserIDFromToken(token);
        if(!userId) return;
        
        const servers = await db.server.findMany({
            where:{
                Members:{
                    some:{
                        userId:userId
                    }
                }
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





