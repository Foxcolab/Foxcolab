import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId =  await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const canvasId =  req.nextUrl.searchParams.get('canvasId');
        const noteId = req.nextUrl.searchParams.get('noteId');
        const reqBody = await req.json();
        const {content, fileUrl} = reqBody;
        console.log(content, fileUrl);
        if(!content && fileUrl.length) return NextResponse.json({error:"No content"}, {status:409});

        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            },
            include:{
                Members:{
                    where:{
                        userId:userId
                    }
                }
            }
        });
        if(!server) return NextResponse.json({error:"No server found"}, {status:409});

        const note = await db.note.findFirst({
            where:{
                id:noteId as string,
                serverId:serverId as string,
                canvasId:canvasId as string
            }
        });
        if(!note) return NextResponse.json({error:"No note found"}, {status:409});
        
        await db.note.update({
            where:{
                id:noteId as string,
                serverId:serverId as string,
                canvasId:canvasId as string
            },
            data:{
                comments:{
                    create:{
                        content,
                        fileUrl,
                        createdBy:server.Members[0].id as string,
                        serverId:serverId as string,
                        canvasId:canvasId as string
                    }
                }
            }
        })

    
    return NextResponse.json({
        success:true
    }, {status:200});


    
    } catch (error) {
        console.log(error);
    }
}