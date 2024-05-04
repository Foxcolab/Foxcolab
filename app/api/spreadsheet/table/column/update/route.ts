import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"




export const POST =async(req:NextRequest, res:NextResponse)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        const tableId = req.nextUrl.searchParams.get('tableId');
        const columnId = req.nextUrl.searchParams.get('columnId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');

        if(!serverId || !spreadsheetId || !tableId || !columnId) return NextResponse.json({
            error:"Something is missng"
        }, {status:409});
        const member = await db.member.findFirst({
            where:{
                serverId:serverId as string,
                userId:userId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});
        
        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            }
        })
        if(!server) return NextResponse.json({error:"Server not found"}, {status:409});
        
        const spreadSheet = await db.spreadsheets.findFirst({
            where:{
                id:spreadsheetId as string,
                serverId:serverId as string,
                sectionId:sectionId as string
            },
            include:{
                manager:true
            }
        });
        if(!spreadSheet) return NextResponse.json({error:"Test Channel not found"}, {status:409});

        const table = await db.table.findFirst({
            where:{
                id:tableId as string,
                serverId:serverId as string,
                spreadsheetId:spreadsheetId as string
            },
            include:{
                tableRows:true
            }
        });
        if(!table) return NextResponse.json({error:"Table not found"}, {status:409});

        const reqBody = await req.json();
        const {columnName, columnDescription, columnType} = reqBody;
        if(!columnName || !columnType) return NextResponse.json({error:"Column not found"}, {status:409});
        
        const column = await db.tableColumn.findFirst({
            where:{
                id:columnId as string,
                tableId:tableId as string
            }
        });

        if(!column) return NextResponse.json({
            error:"Column not found"
        }, {status:409});

        const updateColumn = await db.tableColumn.update({
            where:{
                id:columnId as string,
                tableId:tableId as string
            },
            data:{
                columnName:columnName as string,
                columnDescription:columnDescription as string,
                columnType:columnType
            }
        });



        return NextResponse.json({success:true}, {status:200});



    } catch (error) {
        
    }
}