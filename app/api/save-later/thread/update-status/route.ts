import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"



export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const reqBody = await req.json();
        const {status} = reqBody;
        const laterId =  req.nextUrl.searchParams.get('id');
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const member = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({success:false, error:"You are not a member"});

        const later = await db.later.findUnique({
            where:{
                id:laterId as string,
                createdBy:member.id,
                serverId:serverId as string
            }
        });

        await db.later.update({
            where:{
                id:later?.id
            },
            data:{
                status
            }
        });
        console.log("UPDATED SUCCESSFULLY******");
        
        return NextResponse.json({
            success:true,
            message:"Updated succesfully"
        }, {status:200});

    } catch (error) {
        console.log(error); 
    }
}