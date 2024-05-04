import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";



export const PUT =async(req:NextRequest)=>{
    try {
        const serverId = req.nextUrl.searchParams.get('serverId');
        const SpreadsheetId = req.nextUrl.searchParams.get('SpreadsheetId');
        const reqBody = await req.json();
        const {type} = reqBody;
        const userId = await GetDataFromToken(req);
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"Member not found"}, {status:409});
        
        const spreadsheets = await db.spreadsheets.findFirst({
            where:{
                id:SpreadsheetId as string,
                serverId:serverId as string
            },
            include:{
                manager:true
            }
        });
        if(!spreadsheets) return NextResponse.json({error:"Spreadsheet not found"}, {status:409});
        
        let hasPermission = false;
        const whoHavePermission = spreadsheets?.whoCanMakePublicToPrivate;
        const managers = spreadsheets?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = spreadsheets.createdBy===member.id;
        const isMember = spreadsheets.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
        const updatedType = spreadsheets.type==="public" && type===true ? "private" : "public";

        if(!isAdmin && updatedType==="public"){
            return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        }
        
        const updatedChannel = await db.spreadsheets.update({
            where:{
                id:SpreadsheetId as string,
                serverId:serverId as string,
                sectionId:spreadsheets.sectionId
            },
            data:{
                type:updatedType,                
            }
        })
        if(spreadsheets?.type!==updatedChannel?.type){
            await SchemaActivity({serverId:serverId as string, sectionId:spreadsheets?.sectionId as string, schemaId:SpreadsheetId as string, activityType:"Update", schemaType:"SpreadSheet", memberId:member.id, memberId2:null, oldData:spreadsheets.type, newData:updatedChannel.type, name:"Type Change", message:`Update the spreadsheets ${spreadsheets.type} to ${updatedChannel.type}`}); 
        }
        return NextResponse.json({
            success:true,
            spreadsheets:updatedChannel
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}