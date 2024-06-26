import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import SchemaActivity from "../../activityLog/schemaActivity/SchemaActivity";

export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const sectionId =  req.nextUrl.searchParams.get('sectionId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const reqBody = await req.json();
        const {name, time, level, description, passmarks} = reqBody;
        console.log(name, time, level, description, passmarks);
        console.log(serverId, sectionId, testChannelId);
        if(!serverId || !sectionId || !testChannelId) return NextResponse.json({error:"Something went wrong"}, {status:409});
        
        if(!name) return NextResponse.json({error:"Please write the test title"}, {status:409});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
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
        
        const testChannel = await db.testChannel.findFirst({
            where:{
                id:testChannelId as string,
                serverId:serverId as string,
                sectionId:sectionId as string
            },
            include:{
                manager:true
            }
        });
        if(!testChannel) return NextResponse.json({error:"Test Channel not found"}, {status:409});

        let hasPermission = false;
        const whoHavePermission = testChannel?.whoCanCreateTest;
        const managers = testChannel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = testChannel.createdBy===member.id;
        const isMember = testChannel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        

        const test = await db.test.create({
            data:{
            name, 
            testChannelId:testChannelId,
            serverId:server.id,
            sectionId:sectionId as string  ,
            level,
            time:parseInt(time),
            description,
            createdBy:member.id,
            passmarks:parseInt(passmarks)
            }
        })

        await SchemaActivity({serverId:serverId as string, sectionId:testChannel?.sectionId as string, schemaId:testChannelId as string, activityType:"Create", schemaType:"Test Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:test.name, name:"Test", message:"Created a test"});

        console.log(test);

        return NextResponse.json({
            success:true,
            message:"Test created successfully",
            testChannel
        });
    } catch (error) {
        console.log(error);
        
    }
}




export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const testId =  req.nextUrl.searchParams.get('testId');

        const reqBody = await req.json();
        const {name, time, level, description, passmarks} = reqBody;
        console.log(name, time, level, description);
        
        if(!name) return NextResponse.json({error:"Please write the test title"}, {status:409});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
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
        
        const testChannel = await db.testChannel.findFirst({
            where:{
                id:testChannelId as string,
                serverId:serverId as string,
                Tests:{
                    some:{
                        id:testId as string
                    }
                }
            },
            include:{
                Tests:{
                    where:{
                        id:testId as string
                    }
                }
            }
        });
        if(!testChannel || testChannel.Tests[0].createdBy!==member.id) return NextResponse.json({error:"Test Channel not found"}, {status:409});

 

        await db.testChannel.update({
            where:{
                id:testChannel.id,
                serverId:serverId as string,
                // sectionId:sectionId as string
            },
            data:{
                Tests:{
                    update:{
                       where:{
                        id:testId as string
                       },
                       data:{
                        name, 
                       serverId:server.id,
                       sectionId:testChannel.sectionId  ,
                       level,
                       time:parseInt(time),
                       description,
                       createdBy:member.id,
                       passmarks:parseInt(passmarks)
                       }
                    }
                }
            }
        })

        


        return NextResponse.json({
            success:true,
            message:"Test updated successfully",
            testChannel
        });
    } catch (error) {
        console.log(error);
        
    }
}

export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const testId =  req.nextUrl.searchParams.get('testId');

        const reqBody = await req.json();
        const {name, time, level, description, passmarks} = reqBody;
        console.log(name, time, level, description);
        
        if(!name) return NextResponse.json({error:"Please write the test title"}, {status:409});
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
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
        
        const testChannel = await db.testChannel.findFirst({
            where:{
                id:testChannelId as string,
                serverId:serverId as string,
                Tests:{
                    some:{
                        id:testId as string
                    }
                }
            },
            include:{
                manager:true,
                Tests:{
                    where:{
                        id:testId as string
                    }
                }
            }
        });
        if(!testChannel) return NextResponse.json({error:"Test Channel not found"}, {status:409});

        let hasPermission = false;
        const whoHavePermission = testChannel?.whoCanManageTest;
        const managers = testChannel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = testChannel.createdBy===member.id || testChannel.Tests[0].id===member.id;
        const isMember = testChannel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return NextResponse.json({success:false, message:"You are not authorized"}, {status:409});
        


        const test = await db.test.delete({
            where:{
                id:testId as string,
                testChannelId:testChannel.id,
                serverId:serverId as string
            }
        });


        await SchemaActivity({serverId:serverId as string, sectionId:testChannel?.sectionId as string, schemaId:testChannelId as string, activityType:"Delete", schemaType:"Test Channel", memberId:member.id as string, memberId2:null, oldData:null, newData:test.name, name:"Test", message:"Deleted a test"});


        return NextResponse.json({
            success:true,
            message:"Test deleted successfully",
          
        });
    } catch (error) {
        console.log(error);
        
    }
}