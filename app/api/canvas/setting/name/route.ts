import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const canvasId = req.nextUrl.searchParams.get('canvasId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {name} = reqBdoy;

    console.log(canvasId, serverId, name)
    const userId = await GetDataFromToken(req);
    const member = await db.member.findFirst({
        where:{
            userId:userId,
            serverId:serverId as string
        }
    });

    if(!member) return NextResponse.json({error:"Member not found"}, {status:409});

    const canvas = await db.canvas.findFirst({
        where:{
            id:canvasId as string,
            serverId:serverId as string
        },
        include:{
            manager:true
        }
    });

    if(!canvas) return NextResponse.json({error:"Forum Channel not found"}, {status:409});

    const managers = canvas?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
   

  if(!isManager) return NextResponse.json({error:"You are not authorized to change the setting"}, {status:403});

    // const section = await db.section.update({
    //     where:{
    //         id:canvas?.sectionId as string,
    //         serverId:serverId as string
    //     },
    //     data:{
    //         canvas:{
    //             update:{
    //                 where:{
    //                     id:canvasId as string,
    //                     createdBy:userId,
    //                 },
    //                 data:{
    //                     title:name
    //                 }
    //             }
    //         }
    //     }
    // });

    const  updatedCanvas = await db.canvas.update({
        where:{
            id:canvasId as string,
            serverId:serverId as string
        },
        data:{
            title:name

        }
    })


    await SchemaActivity({serverId:serverId as string, sectionId:canvas.sectionId as string, schemaId:canvasId as string, activityType:"Update", schemaType:"Canvas", memberId:member.id, memberId2:null, oldData:canvas.title, newData:updatedCanvas.title, name:"Name", message:"Updated the name"});
    return NextResponse.json({
        success:true,
        updatedCanvas
    }, {status:200});


} catch (error) {
    
}
}