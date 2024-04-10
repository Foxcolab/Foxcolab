import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId = GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        if(!userId || !serverId) return NextResponse.json({
            error:"UserId and ServerId not found"
        }, {status:409});
        const reqBody =  await req.json();
        const {triggeredText, responseText, responseFileUrl, triggeredType} = reqBody;
        console.log(triggeredText, responseText, responseFileUrl, triggeredType)
    if(!triggeredText || !responseText  || !triggeredType) return NextResponse.json({
        error:"Some query parameters are missing"
    }, {status:409}); 
    
    const server = await db.server.findFirst({
        where:{
            id:serverId as string,
            Members:{
                some:{
                    userId:userId
                }
            }
        },
        include:{
            Members:true
        }
    });
    console.log(server?.id);
    if(!server) return NextResponse.json({
        error:"Server not found"
    }, {status:409});
    
    const member = server.Members.find((member)=>member.userId===userId);
    if(!member) return NextResponse.json({
        error:"Member not found"
    }, {status:409});

    const whoCanCreateBotResponse = server.whoCreateBotResponse;
    let hasPermission = false
    if(member.role ==="moderator" && whoCanCreateBotResponse==="moderator") hasPermission = true;
    else if((member.role ==="user" || member.role==="moderator" )&& whoCanCreateBotResponse==="user") hasPermission = true;
    else if(member.role ==="admin") hasPermission = true;
    console.log(hasPermission);

    if(!hasPermission) return NextResponse.json({
        error:"You are not authorized to create new bot"
    }, {status:409});

    let response = await db.botResponse.findFirst({
        where:{
            serverId:serverId,
            triggeredText:triggeredText,
            triggeredType:triggeredType
        }
    });
    if(response) return NextResponse.json({
        error:"Bot response already exists"
    }, {status:409});

    response = await db.botResponse.create({
        data:{
            serverId:serverId,
            triggeredText:triggeredText,
            triggeredType:triggeredType,
            responseText:responseText,
            responseFileUrl:responseFileUrl,
            createdBy:member.id,
            
        }
    })


    return NextResponse.json({
        success:true,
        response
    }, {status:200});



    } catch (error) {
        console.log(error);
    }
}

export const PUT =async(req:NextRequest)=>{
    try {
        const userId = GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const botResponseId = req.nextUrl.searchParams.get('botResponseId');
        if(!userId || !serverId ||!botResponseId) return NextResponse.json({
            error:"UserId and ServerId and BotResponseId not found"
        }, {status:409});
        
        const reqBody =  await req.json();
        const {triggeredText, responseText,  triggeredType} = reqBody;
    if(!triggeredText || !responseText ||  !triggeredType) return NextResponse.json({
        error:"Some query parameters are missing"
    }, {status:409}); 
    
    const server = await db.server.findFirst({
        where:{
            id:serverId as string,
            Members:{
                some:{
                    userId:userId
                }
            }
        },
        include:{
            Members:true
        }
    });
    if(!server) return NextResponse.json({
        error:"Server not found"
    }, {status:409});
    
    const member = server.Members.find((member)=>member.userId===userId);
    if(!member) return NextResponse.json({
        error:"Member not found"
    }, {status:409});

    let botResponse = await db.botResponse.findFirst({
        where:{
            id:botResponseId,
            serverId:serverId,
        }
    });
    if(!botResponse) return NextResponse.json({
        error:"Bot response does not exists"
    }, {status:409});

    if(member.role!=="admin" && member.role!=="moderator" && member.id!==botResponse.createdBy ){
        return NextResponse.json({
            error:"You are not authorized to update the bot response"
        }, {status:409});
    }




    botResponse = await db.botResponse.update({
        where:{
            id:botResponseId,
            serverId:serverId as string,
        },
        data:{
            triggeredText:triggeredText,
            triggeredType:triggeredType,
            responseText:responseText,
        }
    });


    return NextResponse.json({
        success:true,
        botResponse
    }, {status:200});



    } catch (error) {
        console.log(error);
    }
}

export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const botResponseId = req.nextUrl.searchParams.get('botResponseId');
        console.log(userId, serverId, botResponseId)
        if(!userId || !serverId ||!botResponseId) return NextResponse.json({
            error:"UserId and ServerId and BotResponseId not found"
        }, {status:409});
        

    
    const server = await db.server.findFirst({
        where:{
            id:serverId as string,
            Members:{
                some:{
                    userId:userId
                }
            }
        },
        include:{
            Members:true
        }
    });
    if(!server) return NextResponse.json({
        error:"Server not found"
    }, {status:409});
    
    const member = server.Members.find((member)=>member.userId===userId);
    if(!member) return NextResponse.json({
        error:"Member not found"
    }, {status:409});

    let botResponse = await db.botResponse.findFirst({
        where:{
            id:botResponseId,
            serverId:serverId,
        }
    });
    if(!botResponse) return NextResponse.json({
        error:"Bot response does not exists"
    }, {status:409});

    if(member.role!=="admin" && member.role!=="moderator" && member.id!==botResponse.createdBy ){
        return NextResponse.json({
            error:"You are not authorized to update the bot response"
        }, {status:409});
    }




    botResponse = await db.botResponse.delete({
        where:{
            id:botResponseId,
            serverId:serverId as string,
        },
    
    })


    return NextResponse.json({
        success:true,
        message:"Bot response deleted successfully"
    }, {status:200});



    } catch (error) {
        console.log(error);
    }
}