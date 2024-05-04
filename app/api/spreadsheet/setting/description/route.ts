import SchemaActivity from "@/app/api/activityLog/schemaActivity/SchemaActivity";
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";


export const PUT =async(req:NextRequest)=> {
try {
    const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
    const serverId = req.nextUrl.searchParams.get('serverId');
    const reqBdoy = await req.json();
    const {description} = reqBdoy;

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
            id:spreadsheetId as string,
            serverId:serverId as string
        },
        include:{
            manager:true
        }
    });

    if(!spreadsheets) return NextResponse.json({error:"Spreadsheet not found"}, {status:409});

    let hasPermission = false;
    const whoHavePermission = spreadsheets?.whoCanUpdateSpreadsheets;
    const managers = spreadsheets?.manager?.memberIds;
    const isManager = managers?.some(m => m === member?.id);
    const isAdmin = spreadsheets.createdBy===member.id;
    const isMember = spreadsheets.memberIds.includes(member.id);
    if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
        hasPermission = true;
    }
    if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});

    
    const prevDesc = spreadsheets.description;



    const updatedChannel = await db.spreadsheets.update({
        where:{
            id:spreadsheetId as string,
            serverId:serverId as string,
        },
        data:{
            description
        }
    })


        await SchemaActivity({serverId:serverId as string, sectionId:spreadsheets.sectionId as string, schemaId:spreadsheetId as string, activityType:"Update", schemaType:"SpreadSheet", memberId:member.id, memberId2:null, oldData:prevDesc, newData:updatedChannel.description, name:"Description", message:"Updated the description"});
    
    
    return NextResponse.json({
        success:true,
        updatedChannel
    }, {status:200});


} catch (error) {
    console.log(error);
}
}