import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const canvasId = req.nextUrl.searchParams.get('canvasId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {description} = reqBdoy;
    
    console.log(canvasId, serverId, description)
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

    if(!canvas) return NextResponse.json({error:"Canvas not found"}, {status:409});

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
   
    const updatedCanvas = await db.canvas.update({
        where:{
            id:canvasId as string,
            serverId:serverId as string
        },
        data:{
            description
        }
    })

    await SchemaActivity({serverId:serverId as string, sectionId:canvas.sectionId as string, schemaId:canvasId as string, activityType:"Update", schemaType:"Canvas", memberId:member.id, memberId2:null, oldData:canvas.description, newData:updatedCanvas.description, name:"Description", message:"Updated the description"});
    
    return NextResponse.json({
        success:true,
        updatedCanvas
    }, {status:200});


} catch (error) {
    
}
}