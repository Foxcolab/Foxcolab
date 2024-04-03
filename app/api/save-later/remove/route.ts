import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const DELETE = async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const laterId = await req.nextUrl.searchParams.get('id');
        const serverId = await req.nextUrl.searchParams.get('serverId');
        console.log(serverId, laterId);
        
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member.", success:false}, {status:401});
            const LaterPost = await db.later.findUnique({
            where:{
                id:laterId as string,
                createdBy:member.id,
                serverId:member?.serverId 
            }

        });
        if(!LaterPost) return NextResponse.json({eror:"Saved Message not found"}, {status:404});
        await db.later.delete({
            where:{
                id:LaterPost.id
            }
        });
        console.log("Remove from the save list successfully");
        
        return NextResponse.json({
            success:true,
            message:"Remove from the save list successfully.",
        
        }, {status:200});



    } catch (error) {
        console.log(error);
        
    }
}