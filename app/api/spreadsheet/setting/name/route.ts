import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const SpreadsheetId = req.nextUrl.searchParams.get('SpreadsheetId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {name} = reqBdoy;
    if(!SpreadsheetId || !serverId || !name) return NextResponse.json({
        error:"ChannelId, ServerId and Name are required"
    }, {status:409})
    console.log(SpreadsheetId, serverId, name)
    const userId = await GetDataFromToken(req);
    const member = await db.member.findFirst({
        where:{
            userId:userId,
            serverId:serverId as string
        }
    });

    if(!member) return NextResponse.json({error:"Member not found"}, {status:409});

    const Spreadsheets = await db.spreadsheets.findFirst({
        where:{
            id:SpreadsheetId as string,
            serverId:serverId as string
        },
        include:{
            manager:true
        }
    });

    if(!Spreadsheets) return NextResponse.json({error:"Channel not found"}, {status:409});

    let hasPermission = false;
    const whoHavePermission = Spreadsheets?.whoCanUpdateSpreadsheets;
    const managers = Spreadsheets?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
    const isAdmin = Spreadsheets.createdBy===member.id;
    const isMember = Spreadsheets.memberIds.includes(member.id);
    if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
        hasPermission = true;
    }
    if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});

    const updatedChannel = await db.spreadsheets.update({
        where:{
            id:SpreadsheetId,
            serverId:serverId as string,
            sectionId:Spreadsheets.sectionId
        },
        data:{
            name:name
        }
    })
    await SchemaActivity({serverId:serverId as string, sectionId:Spreadsheets.sectionId as string, schemaId:SpreadsheetId as string, activityType:"Update", schemaType:"SpreadSheet", memberId:member.id, memberId2:null, oldData:Spreadsheets.name, newData:updatedChannel.name, name:"Name", message:"Updated the Spreadsheets name"});
    return NextResponse.json({
        success:true,
        updatedChannel
    }, {status:200});


} catch (error) {
    
}
}