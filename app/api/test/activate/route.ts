import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const testId =  req.nextUrl.searchParams.get('testId');

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});
        
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        })
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});
        
        const test = await db.test.findFirst({
            where:{
                id:testId as string,
                testChannelId:testChannelId as string,
                serverId:serverId as string
            }
        });
        if(!test) return NextResponse.json({error:"Test not found"}, {status:409});

        const updateTest = await db.test.update({
            where:{
                id:testId as string,
                testChannelId:testChannelId as string,
                serverId:serverId as string
            },
            data:{
                activated:!test.activated
            }
        })

        


        return NextResponse.json({
            success:true,
            message:"Test updated successfully",
            updateTest
        });
    } catch (error) {
        console.log(error);
        
    }
}