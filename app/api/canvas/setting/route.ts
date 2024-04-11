import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
        const reqBody = await req.json();
        const {type, sendMsg} = reqBody;
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
        if(!canvas) return NextResponse.json({
            error:"Canvas not found"
        }, {status:409});
        let hasPermission = false;
        const whoHavePermission = canvas?.whoCanMakePublicToPublic;
        const managers = canvas?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = canvas.createdBy===member.id;
        const isMember = canvas.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
        const updatedType = canvas.type==="public" && type===true ? "private" : "public";

        if(!isAdmin && updatedType==="public"){
            return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        }
  
      
        const updatedCanvas = await db.canvas.update({
            where:{
                id:canvasId as string,
                serverId:serverId as string
            },
            data:{
                isEveryonePost:sendMsg,
                type:updatedType
            }
        })

        if(canvas?.type!==updatedCanvas?.type){
            await SchemaActivity({serverId:serverId as string, sectionId:canvas?.sectionId as string, schemaId:canvasId as string, activityType:"Update", schemaType:"Canvas", memberId:member.id, memberId2:null, oldData:canvas.type, newData:updatedCanvas.type, name:"Type Change", message:`Update the test channel ${canvas.type} to ${updatedCanvas.type}`}); 
        }
        
        return NextResponse.json({
            success:true,
            canvas:updatedCanvas
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}