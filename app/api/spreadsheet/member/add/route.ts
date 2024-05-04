import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        const reqBody = await req.json();
        let {members} = reqBody;
        
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});
        
        const spreadsheet = await db.spreadsheets.findFirst({
            where:{
                id:spreadsheetId as string,
                serverId:serverId as string
            },
            include:{
                manager:{
                    include:{
                        member:true
                    }
                }
            }
        });
        if(!spreadsheet) return NextResponse.json({error:"Channel not found"}, {status:409})

        let hasPermission = false;
        const whoHavePermission = spreadsheet?.whoCanManageMember;
        const managers = spreadsheet?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = spreadsheet.createdBy===member.id;
        const isMember = spreadsheet.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
            

        const section = await db.section.update({
            where:{
                id:spreadsheet?.sectionId as string,
                serverId:serverId as string
            },
            data:{
                channels:{
                    update:{
                        where:{
                            id:spreadsheetId as string,
                            // createdBy:userId,
                        },
                        data:{
                            memberIds:{
                                push:members
                            }
                        }
                    }
                }
            }
        });
        console.log(section);
        for(let i=0; i<members.length; i++){
            await SchemaActivity({serverId:serverId as string, sectionId:section.id as string, schemaId:spreadsheetId as string, activityType:"Add Member", schemaType:"SpreadSheet", memberId:member.id, memberId2:members[i], oldData:null, newData:null, name:null, message:"Add a new member"});
        }
        
        
        return NextResponse.json({
            success:true,
            section
        }, {status:200});

    } catch (error) {
        
    }
}