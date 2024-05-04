import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"




export const POST =async(req:NextRequest, res:NextResponse)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const spreadsheetId = req.nextUrl.searchParams.get('spreadsheetId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');

        console.log(serverId, spreadsheetId, sectionId);

        if(!serverId || !spreadsheetId || !sectionId) return NextResponse.json({
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

        let hasPermission = false;
        const whoHavePermission = spreadSheet?.whoCanCreateTable;
        const managers = spreadSheet?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = spreadSheet.createdBy===member.id;
        const isMember = spreadSheet.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        
        const reqBody = await req.json();
        const {name, description, type} = reqBody;
        
        console.log(name, description, type);


    //    const spreadSheet = await db.spreadsheets.update({
    //         where: {
    //             id:spreadsheetId as string,
    //             serverId:serverId as string,
    //             sectionId:sectionId as string
    //         },
    //         data:{
    //             tables:{
    //                 create:{
    //                     name: name,
    //                     description:description,
    //                     type:type,
    //                     serverId:serverId as string,
    //                     createdBy:member.id as string,

    //                 }
    //             }
    //         }
    //    });
    const exisingTable = await db.table.findFirst({
        where:{
            name:name,
            serverId:serverId as string,
            spreadsheetId:spreadsheetId as string
        }
    })
    if(exisingTable) return NextResponse.json({error:"Table name already exist"}, {status:409});

    const table = await db.table.create({
        data:{
            name:name,
            description:description,
            type:type,
            serverId:serverId as string,
            createdBy:member.id as string,
            spreadsheetId:spreadsheetId
        }
    })
       console.log("Table Created::", table.id);


      const tableRow = await db.tableRow.create({
        data:{
            tableId:table.id as string,
            rowIndex:0,
            spreadSheetId:spreadsheetId as string,
            columns:{
                create:[
                {
                    columnName:"Item",
                    columnType:"shortText",
                    spreadSheetId:spreadsheetId as string,
                    tableId:table.id as string,
                    createdBy:member.id as string
                },
                {
                    columnName:"Person",
                    columnType:"person",
                    spreadSheetId:spreadsheetId as string,
                    tableId:table.id as string,
                    createdBy:member.id as string
                },
                {
                    columnName:"Status",
                    columnType:"status",
                    spreadSheetId:spreadsheetId as string,
                    tableId:table.id as string,
                    createdBy:member.id as string
                }
            ]
            }
        },
        include:{
            columns:true
        }
      })
       console.log("Table row addded");



      const itemId   = tableRow.columns[0].id;
      const personId = tableRow.columns[1].id;
      const statusId = tableRow.columns[2].id;


      const AddedRow1 = await db.tableRow.create({
        data:{
            tableId:table.id,
            spreadSheetId:spreadsheetId,
            rowData:{
                create:[
                    {
                        columnId:itemId as string,
                        data:["Item 1"],
                        tableId:table.id as string,
                        type:"shortText",
                    },
                    {
                        columnId:personId as string,
                        assignedMemberIds:[member.id],
                        assignedMember:{
                            connect:{
                                id:member.id
                            }
                        },
                        tableId:table.id as string,
                        type:"person"
                    },
                    {
                        columnId:statusId as string,
                        data:["Done"],
                        labels:["Working on it", "Done", "Stuck"],
                        tableId:table.id as string,
                        type:"status"
                    }
                ]
            }
        }
      })
      console.log("Row 1 added");
      const AddedRow2 = await db.tableRow.create({
        data:{
            tableId:table.id,
            spreadSheetId:spreadsheetId,
            rowData:{
                create:[
                    {
                        columnId:itemId as string,
                        data:["Item 2"],
                        tableId:table.id as string,
                        type:"shortText",
                    },
                    {
                        columnId:personId as string,
                        tableId:table.id as string,
                        type:"person"
                    },
                    {
                        columnId:statusId as string,
                        data:["Done"],
                        labels:["Working on it", "Done", "Stuck"],
                        tableId:table.id as string,
                        type:"status"
                    }
                ]
            }
        }
      })
      console.log("Row 2 added");

      const AddedRow3 = await db.tableRow.create({
        data:{
            tableId:table.id,
            spreadSheetId:spreadsheetId,
            rowData:{
                create:[
                    {
                        columnId:itemId as string,
                        data:["Item 3"],
                        tableId:table.id as string,
                        type:"shortText",
                    },
                    {
                        columnId:personId as string,
                        
                        tableId:table.id as string,
                        type:"person"
                    },
                    {
                        columnId:statusId as string,
                        data:["Done"],
                        labels:["Working on it", "Done", "Stuck"],
                        tableId:table.id as string,
                        type:"status"
                    }
                ]
            }
        }
      })
      console.log("Row 3 added");



    //    const InsertIntoTable = await db.table.update({
    //     where:{
    //         id:table.id,
    //         serverId:serverId as string,
    //         spreadsheetId:spreadsheetId as string,
    //     },
    //     data:{
    //         tableRows:{
    //             create:[{
    //                 rowIndex:1,
    //                 // assignedMemberIds:[member.id],
    //                 spreadSheetId:spreadsheetId,
    //                 rowData:{
    //                     create:[
    //                         {
    //                             columnId:itemId as string,
    //                             data:["Item 1"],
    //                             tableId:table.id as string,
    //                             type:"shortText",
    //                         },
    //                         {
    //                             columnId:personId as string,
    //                             assignedMemberIds:[member.id],
    //                             assignedMember:{
    //                                 connect:{
    //                                     id:member.id
    //                                 }
    //                             },
    //                             tableId:table.id as string,
    //                             type:"person"
    //                         },
    //                         {
    //                             columnId:statusId as string,
    //                             data:["Done"],
    //                             labels:["Working on it", "Done", "Stuck"],
    //                             tableId:table.id as string,
    //                             type:"status"
    //                         }
    //                     ]
    //                 }
    //             },
    //             {
    //                 rowIndex:2,
    //                 // assignedMemberIds:[member.id],
    //                 spreadSheetId:spreadsheetId,
    //                 rowData:{
    //                     create:[
    //                         {
    //                             columnId:itemId as string,
    //                             data:["Item 1"],
    //                             tableId:table.id as string,
    //                             type:"shortText",
    //                         },
    //                         {
    //                             columnId:personId as string,
    //                             assignedMemberIds:[member.id],
    //                             assignedMember:{
    //                                 connect:{
    //                                     id:member.id
    //                                 }
    //                             },
    //                             tableId:table.id as string,
    //                             type:"person"
    //                         },
    //                         {
    //                             columnId:statusId as string,
    //                             data:["Done"],
    //                             labels:["Working on it", "Done", "Stuck"],
    //                             tableId:table.id as string,
    //                             type:"status"
    //                         }
    //                     ]
    //                 }
    //             },
    //             {
    //                 rowIndex:1,
    //                 // assignedMemberIds:[member.id],
    //                 spreadSheetId:spreadsheetId,
    //                 rowData:{
    //                     create:[
    //                         {
    //                             columnId:itemId as string,
    //                             data:["Item 1"],
    //                             tableId:table.id as string,
    //                             type:"shortText",
    //                         },
    //                         {
    //                             columnId:personId as string,
    //                             assignedMemberIds:[member.id],
    //                             assignedMember:{
    //                                 connect:{
    //                                     id:member.id
    //                                 }
    //                             },
    //                             tableId:table.id as string,
    //                             type:"person"
    //                         },
    //                         {
    //                             columnId:statusId as string,
    //                             data:["Done"],
    //                             labels:["Working on it", "Done", "Stuck"],
    //                             tableId:table.id as string,
    //                             type:"status"
    //                         }
    //                     ]
    //                 }
    //             },
            
    //         ]
    //         }
    //     }
    //    })

       console.log("Table data inserted");

       return NextResponse.json({
        success:true
       }, {status:200});




    } catch (error) {
        console.log(error)
    }
}