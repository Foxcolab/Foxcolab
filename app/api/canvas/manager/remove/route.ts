import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const canvasId = req.nextUrl.searchParams.get('canvasId');
        const managerId = req.nextUrl.searchParams.get('managerId');
        console.log(serverId, canvasId, managerId);
        const reqBody = await req.json();
        const {managerIds} = reqBody;
        console.log(managerIds)
        if(!managerIds) return NextResponse.json({error:"Member not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });

        if(!member) return NextResponse.json({error:"You are not a authorized member"}, {status:409});
        const canvas = await db.canvas.findFirst({
            where:{
                id:canvasId as string,
                serverId:serverId as string,
            },
            include:{
                manager:true
            }

        });
        if(!canvas) return NextResponse.json({error:"Channel not found"}, {status:409});

        let hasPermission = false;
        const whoHavePermission = canvas?.whoCanManageManager;
        const managers = canvas?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = canvas.createdBy===member.id;
        const isMember = canvas.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
        await db.canvas.update({
            where:{
                id:canvasId as string,
                serverId:serverId as string
            },
            data:{
                manager:{
                    update:{
                        where:{
                            id:managerId as string,                           
                        },
                        data:{
                            memberIds:{
                                 set: canvas?.manager?.memberIds.filter((id)=>id!==managerIds)
                                
                            }
                        }
                    }
                }
            }
        });
        for(let i=0; i<managerIds.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:canvas?.sectionId as string, schemaId:canvasId as string, activityType:"Remove Manager", schemaType:"Canvas", memberId:member.id as string, memberId2:managerIds[i], oldData:null, newData:null, name:null, message:"Remove a existing managers"});
        }

        return NextResponse.json({
            success:true
        }, {status:200});

    
    } catch (error) {
        
    }
}