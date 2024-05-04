

import { CreateActivityLog } from "@/app/api/activityLog/ActivityLog";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        if(!spreadsheetId || !serverId) return NextResponse.json({error:"spreadsheets Id or Server Id not found"}, {status:409});
        const userId = await GetDataFromToken(req);
        if(!userId) return NextResponse.json({success:false, message:"You are not authorized"}, {status:401});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            
            }})
        // console.log
        if(!member) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        const reqBody = await req.json();
        const {title, schemaValue} = reqBody;
        console.log(title, schemaValue);
        if(!title || !schemaValue) return NextResponse.json({error:"Something went wrong"}, {status:409});
        
        const spreadsheets = await db.spreadsheets.findFirst({
            where:{
                id:spreadsheetId,
                serverId:serverId as string
            },
            
        });
        if(!spreadsheets || spreadsheets.createdBy!==member.id) return NextResponse.json({success:false, message:"Channel not found"}, {status:409});
        
        let schemaType;
         if(title==="Update Spreadsheet"){
            schemaType="whoCanUpdateSpreadsheets";
          }
          else if(title==="Public to private"){
            schemaType="whoCanMakePublicToPrivate";
          }
          else if(title==="Create Table"){
            schemaType="whoCanCreateTable"
          }
          else if(title==="Manage Member"){
            schemaType="whoCanManageMember";
          }else if(title==="Manage Manager"){
            schemaType="whoCanManageManager";
          }
          else {
            return NextResponse.json({error:"Something went wrong"}, {status:409});
          }

        console.log(schemaType, schemaValue);
        if(schemaType==="whoCanUpdateSpreadsheets"){
            const spreadsheets = await db.spreadsheets.update({
                where:{
                    id:spreadsheetId as string
                },
                data:{
                    whoCanUpdateSpreadsheets:schemaValue
                }
            });
            // await CreateActivityLog(spreadsheetId, member.id, "Updated", "spreadsheets", schemaType, schemaValue );
            return NextResponse.json({success:true, spreadsheets}, {status:200});
        }
        else if(schemaType==="whoCanMakePublicToPrivate"){
            const spreadsheets = await db.spreadsheets.update({
                where:{
                    id:spreadsheetId as string
                },
                data:{
                    whoCanMakePublicToPrivate:schemaValue
                }
            });
            // await CreateActivityLog(spreadsheetId, member.id, "Updated", "spreadsheets", schemaType, schemaValue );
            return NextResponse.json({success:true, spreadsheets}, {status:200});
        }else if(schemaType==="whoCanCreateTable"){
            const spreadsheets = await db.spreadsheets.update({
                where:{
                    id:spreadsheetId as string
                },
                data:{
                    whoCanCreateTable:schemaValue
                }
            });
            // await CreateActivityLog(spreadsheetId, member.id, "Updated", "spreadsheets", schemaType, schemaValue );
            return NextResponse.json({success:true, spreadsheets}, {status:200});
        }else if(schemaType==="whoCanManageTable"){
            const spreadsheets = await db.spreadsheets.update({
                where:{
                    id:spreadsheetId as string
                },
                data:{
                    whoCanManageTable:schemaValue
                }
            });
            // await CreateActivityLog(spreadsheetId, member.id, "Updated", "spreadsheets", schemaType, schemaValue );
            return NextResponse.json({success:true, spreadsheets}, {status:200});
        }else if(schemaType==="whoCanManageMember"){
            const spreadsheets = await db.spreadsheets.update({
                where:{
                    id:spreadsheetId as string
                },
                data:{
                    whoCanManageMember:schemaValue
                }
            });
            // await CreateActivityLog(spreadsheetId, member.id, "Updated", "spreadsheets", schemaType, schemaValue );
            return NextResponse.json({success:true, spreadsheets}, {status:200});
        }else if(schemaType==="whoCanManageManager"){
            const spreadsheets = await db.spreadsheets.update({
                where:{
                    id:spreadsheetId as string
                },
                data:{
                    whoCanManageManager:schemaValue
                }
            });
            // await CreateActivityLog(spreadsheetId, member.id, "Updated", "spreadsheets", schemaType, schemaValue );
            return NextResponse.json({success:true, spreadsheets}, {status:200});
        }

       
    } catch (error) {
        console.log(error);
    }
}
