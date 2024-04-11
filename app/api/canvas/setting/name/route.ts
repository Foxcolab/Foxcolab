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

    let hasPermission = false;
    const whoHavePermission = canvas?.whoCanUpdateCanvas;
    const managers = canvas?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
    const isAdmin = canvas.createdBy===member.id;
    const isMember = canvas.memberIds.includes(member.id);
    if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
        hasPermission = true;
    }
    if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
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