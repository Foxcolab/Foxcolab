import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadhsheetId = req.nextUrl.searchParams.get('spreadhsheetId');
        const managerId = req.nextUrl.searchParams.get('managerId');
        console.log(serverId, spreadhsheetId, managerId);
        const reqBody = await req.json();
        const {managerIds} = reqBody;
        if(managerIds.length===0) return NextResponse.json({error:"Member not found"}, {status:200})
        console.log(managerIds)
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a authorized member"}, {status:200})

        const spreadSheet = await db.spreadsheets.findFirst({
            where:{
                id:spreadhsheetId as string,
                serverId:serverId as string,
            },
            include:{
                manager:true
            }

        });
        if(!spreadSheet) return NextResponse.json({error:"Spredsheeet not found"}, {status:200})
        let hasPermission = false;
        const whoHavePermission = spreadSheet?.whoCanManageManager;
        const managers = spreadSheet?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = spreadSheet.createdBy===member.id;
        const isMember = spreadSheet.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        await db.spreadsheets.update({
            where:{
                id:spreadhsheetId as string,
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
                                push:managerIds
                            }
                        }
                    }
                }
            }
        });

        for(let i=0; i<managerIds.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:spreadSheet?.sectionId as string, schemaId:spreadhsheetId as string, activityType:"Make Manager", schemaType:"Channel", memberId:member.id as string, memberId2:managerIds[i], oldData:null, newData:null, name:null, message:null});
        }
        return NextResponse.json({
            success:true
        }, {status:200});

    
    } catch (error) {
        
    }
}