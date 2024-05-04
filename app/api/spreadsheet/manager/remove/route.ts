import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        const managerId = req.nextUrl.searchParams.get('managerId');
        console.log(serverId, spreadsheetId, managerId);
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
        const spreadsheet = await db.spreadsheets.findFirst({
            where:{
                id:spreadsheetId as string,
                serverId:serverId as string,
            },
            include:{
                manager:true
            }

        });
        if(!spreadsheet) return NextResponse.json({error:"Channel not found"}, {status:409});

        let hasPermission = false;
        const whoHavePermission = spreadsheet?.whoCanManageManager;
        const managers = spreadsheet?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = spreadsheet.createdBy===member.id;
        const isMember = spreadsheet.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        await db.spreadsheets.update({
            where:{
                id:spreadsheetId as string,
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
                                 set: spreadsheet?.manager?.memberIds.filter((id)=>id!==managerIds)
                                
                            }
                        }
                    }
                }
            }
        });

        for(let i=0; i<managerIds.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:spreadsheet?.sectionId as string, schemaId:spreadsheetId as string, activityType:"Remove Manager", schemaType:"Channel", memberId:member.id as string, memberId2:managerIds[i], oldData:null, newData:null, name:null, message:null});
        }

        return NextResponse.json({
            success:true
        }, {status:200});

    
    } catch (error) {
        
    }
}