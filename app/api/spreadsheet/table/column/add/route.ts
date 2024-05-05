import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"




export const POST =async(req:NextRequest, res:NextResponse)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        const tableId = req.nextUrl.searchParams.get('tableId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');

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
                tableRows:true
            }
        });
        if(!table) return NextResponse.json({error:"Table not found"}, {status:409});
        console.log("TABLE ROWS:: ",table.tableRows.length);
        const reqBody = await req.json();
        const {columnName, columnDescription, columnType} = reqBody;
        console.log(columnName, columnDescription, columnType);

        if(!columnName || !columnType) return NextResponse.json({error:"Column not found"}, {status:409});
        // const updateTable = await db.table.update({
        //     where:{
        //         id:tableId as string,
        //         serverId:serverId as string,
        //         spreadsheetId:spreadsheetId as string
        //     },
        //     data:{
        //         tableRows:{
        //             update:{
        //                 where:{
        //                     id:table.tableRows[0].id as string,
        //                 },
        //                 data:{
        //                     columns:{
        //                         create:{
        //                             columnName:columnName as string,
        //                             columnDescription:columnDescription as string,
        //                             columnType:columnType
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     include:{
        //         tableRows:{
        //             include:{
        //                 columns:true
        //             }
        //         },
               
        //     }
        // })
        console.log(table.tableRows[0])
        // const updateTable = await db.tableRow.update({
        //     where:{
        //         id:table.tableRows[0].id as string,
        //         serverId:serverId as string,
        //         tableId:tableId as string,
        //         spreadSheetId:spreadsheetId as string
        //     },
        //     data:{
        //         columns:{
        //             create:{
        //                 columnName:columnName,
        //                 columnDescription:columnDescription,
        //                 columnType:columnType
        //             }
        //         }
        //     },
        //     include:{
        //         columns:true
        //     }
        // })
        const updateTable = await db.table.update({
            where:{
                id:tableId as string,
                spreadsheetId:spreadsheetId as string
            },
            data:{
                tableColumns:{
                    create:{
                        columnName:columnName as string,
                        columnDescription:columnDescription as string,
                        columnType:columnType,
                        restricted:false,
                        spreadSheetId:spreadsheetId as string,
                        rowId:table.tableRows[0].id as string,
                        createdBy:member.id as string
                    }
                }
            },
            include:{
                tableRows:{
                    where:{
                        id:table.tableRows[0].id as string
                    },
                    include:{
                        columns:{
                            orderBy:{
                                createdAt:"desc"
                            }
                        }
                    }
                }
            }
        })

        const length = table.tableRows.length;
        const newColumn = updateTable.tableRows[0].columns[0];
       
        for(let i=1; i<table.tableRows.length; i++){
            const tableRowData = await db.tableRow.update({
                where:{
                    id:table.tableRows[i].id as string,
                    tableId:tableId as string
                },
                data:{
                    rowData:{
                        create:{
                            data:[],
                            labels:[],
                            type:newColumn.columnType,
                            columnId:newColumn.id,
                            tableId:tableId as string
                        }
                    }
                }
            })
        }



        return NextResponse.json({success:true, table}, {status:200});



    } catch (error) {
        
    }
}