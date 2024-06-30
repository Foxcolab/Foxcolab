import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const reqBody = await req.json();
        const {title, content} = reqBody;
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId as string
                    }
                }
            }
        });
        if(!server) return NextResponse.json({
            error:"Server not found"
        }, {status:409});
        const member = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({
            error:"Member not found"
        }, {status:409});

        const guide = await db.guide.create({
            data:{
                title:title,
                content:content,
                serverId:serverId as string,
                createdBy:member.id
            }
        });


        return NextResponse.json({
            success:true,
            message:"Guide created successfully"
        }, {status:200});
    } catch (error) {
        console.log(error)
    }
}