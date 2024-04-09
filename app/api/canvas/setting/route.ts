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
        //                     isEveryonePost:sendMsg,
        //                     type

        //                 }
        //             }
        //         }
        //     }
        // });
        const updatedType = canvas.type==="public" && type===true ? "private" : "public";

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