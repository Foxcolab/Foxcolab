import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const tableId = req.nextUrl.searchParams.get('tableId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');
        const columnId = req.nextUrl.searchParams.get('columnId');
        const member = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({
            error:"Member not found"
        }, {status:409});

        const spreadSheet = await db.spreadsheets.findFirst({
            where:{
                id:spreadsheetId as string,
                serverId:serverId as string,
                sectionId:sectionId as string
            }
        });
        if(!spreadSheet) return NextResponse.json({
            error:"SpreadSheet not found"
        }, {status:409});

        const table = await db.table.findFirst({
            where:{
                id:tableId as string,
                serverId:serverId as string,
                spreadsheetId:spreadsheetId as string
            },
            include:{
                tableRows:{
                    include:{
                        columns:true,
                        rowData:true
                    }
                }
            }
        });
        if(!table) return NextResponse.json({
            error:"Table not found"
        }, {status:409});

        const column = await db.tableRowData.deleteMany({
            where:{
                tableId:tableId as string,
                columnId:columnId as string,
                
            }
        });

        const tableRow = await db.tableColumn.delete({
            where:{
                id:columnId as string,
                tableId:tableId as string,
                spreadSheetId:spreadsheetId as string
            }
        });
        

        return NextResponse.json({sucess:true}, {status:200});

    } catch (error) {
        console.log(error);
    }
}