import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const POST = async(req:NextRequest)=>{
    try {
        console.log("NEXT SDASJFDJSJD");
        
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const testId = req.nextUrl.searchParams.get('testId');
        const resultId = req.nextUrl.searchParams.get('resultId');
        // const questionId = req.nextUrl.searchParams.get('questionId');
        const reqBody = await req.json();
        const { currentState} = reqBody;
        console.log("CURRENT STATE", currentState);
        
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not authorized member"}, {status:409});

        const result = await db.result.findFirst({
            where:{
                id:resultId as string,
                serverId:serverId as string,
                testId:testId as string
            }
        });
        if(!result) return NextResponse.json({error:"Result not found"}, {status:409});

        // const question = await db.question.findFirst({
        //     where:{
        //         id:questionId as string
        //     }
        // });
        // if(!question) return NextResponse.json({error:"Question not found"}, {status:409});

       
        await db.result.update({
            where:{
                id:result.id
            },
            data:{
                currentState
                
            }
        });

        return Response.json({
            success:true,

        }, {status:200})

    } catch (error) {
        console.log(error);
        
    }
}
