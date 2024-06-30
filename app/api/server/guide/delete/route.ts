import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const guideId = req.nextUrl.searchParams.get('guideId');
        

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

        const guide = await db.guide.findFirst({
            where:{
                id:guideId as string,
                serverId:serverId as string
            }
        });
        if(!guide) return NextResponse.json({
            error:"Guide not found"
        }, {status:409});

        const isAdmin = server.createdBy === member.userId;
        const isAuthor = guide.createdBy === member.id;
        if(!isAdmin && !isAuthor) return NextResponse.json({
            error:"You are not authorized to delete this guide"
        }, {status:409});

        const updateGuide = await db.guide.delete({
            where:{
                id:guideId as string,
                serverId:serverId as string,
            }
        });

        return NextResponse.json({
            success:true,
            message:"Guide deleted successfully"
        }, {status:200});
    } catch (error) {
        console.log(error)
    }
}