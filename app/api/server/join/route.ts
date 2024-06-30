import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!serverId) return NextResponse.json({
            error:"Server Id not found"
        }, {status:409});

        const server = await db.server.findFirst({
            where:{
                id:serverId as string
            },
            include:{
                channels:true
            }
        });
        if(!server) return NextResponse.json({
            error:"Server not found"
        }, {status:409});

        const member = await db.member.create({
            data:{
                userId:userId as string,
                serverId:serverId as string,
                role:"user",
            }
        });
        
        for(let i=0; i<server.channels.length; i++){
            if(server.channels[i].type==="public"){
                await db.channel.update({
                    where:{
                        id:server.channels[i].id,
                    },
                    data:{
                        memberIds:{
                            push:member.id
                        }
                    }
                })
            }
        }

        return NextResponse.json({
            success:true,
            // message:"Member created"
        }, {status:200});


    } catch (error) {
        
    }
}