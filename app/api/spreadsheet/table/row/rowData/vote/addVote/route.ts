import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"



export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const tableRowId = req.nextUrl.searchParams.get('tableRowId');
        const tableRowDataId = req.nextUrl.searchParams.get('rowDataId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        const tableId = req.nextUrl.searchParams.get('tableId');
        console.log(serverId, tableRowId, tableRowDataId, spreadsheetId, tableId);

        if(!serverId || !tableRowId || !spreadsheetId || !tableId){
            return NextResponse.json({error:"Something went wrong"}, {status:409});
        }

        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                Members:{
                    some:{
                        userId:userId
                    }
                }
            },           
        });
        if(!server) return NextResponse.json({error:"You are not authorized member"}, {status:409});

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});

        const table = await db.table.findFirst({
            where:{
                id:tableId as string,
                spreadsheetId:spreadsheetId as string
            },
        });
        if(!table) return NextResponse.json({error:"Table not found"}, {status:409});

        const tableRow = await db.tableRow.findFirst({
            where:{
                id:tableRowId as string,
                tableId:tableId as string,
                serverId:serverId as string
            }
        });
        if(!tableRow) return NextResponse.json({error:"Table Row not found"}, {status:409});

        const updateTableRow = await db.tableRowData.update({
            where:{
                id:tableRowDataId as string,
                tableId:tableId as string,
            },
            data:{
                respondentId:{
                    push:member.id
                },
                respondent:{
                    connect:{
                        id:member.id
                    }
                }
            }
        });

        console.log("Vote added to row.");

        return NextResponse.json({
            success:true
        }, {status:200});


    } catch (error) {
        console.log(error);
    }
}