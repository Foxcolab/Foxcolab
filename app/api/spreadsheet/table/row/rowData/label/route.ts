import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"




export const PUT =async(req:NextRequest, res:NextResponse)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        const tableId = req.nextUrl.searchParams.get('tableId');
        const rowDataId = req.nextUrl.searchParams.get('rowDataId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');
        console.log(serverId, spreadsheetId, sectionId, tableId, rowDataId);
        if(!serverId || !spreadsheetId || !tableId) return NextResponse.json({
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
                tableRows:{
                    include:{
                        columns:true
                    }
                }
            }
        });
        if(!table) return NextResponse.json({error:"Table not found"}, {status:409});

        const reqBody = await req.json();
        const {labels} = reqBody;
        // console.log(data, labels);
        if( !labels) return NextResponse.json({error:"Something is missing"}, {status:409});
        console.log("Updatingg... started...");
        // const TableRowData = await db.tableRowData.update({
        //     where:{
        //         id:rowDataId as string
        //     },
        //     data:{
        //         data:data,
        //         labels:labels,
        //         assignedMemberIds:assignedMemberIds,
        //         files:files
        //     }
        // });
        
        const tableRowData = await db.tableRowData.findFirst({
            where:{
                id:rowDataId as string,
                tableId:tableId as string,
                
            }
        });
        console.log(tableRowData);
        if(!tableRowData) return NextResponse.json({error:"Table row data not found"}, {status:409});
        
        const updateRowData = await db.tableRowData.update({
            where:{
                id:rowDataId as string,
                tableId:tableId as string
            },
            data:{
                labels:labels,
                
            }
        });
        console.log(updateRowData);
        

        return NextResponse.json({success:true}, {status:200});



    } catch (error) {
        console.log(error);
    }
}