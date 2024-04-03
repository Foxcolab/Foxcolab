import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');
        const testId = req.nextUrl.searchParams.get('testId');

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            },
            include:{
                user:true
            }
        });
        if(!member) return NextResponse.json({error:"You are not authorized member"}, {status:409});

        const testt = await db.test.findFirst({
            where:{
                id:testId as string,
                serverId:serverId as string,
                sectionId:sectionId as string
            }
        });
        if(!testt) return NextResponse.json({error:"Test not found"}, {status:409});

        const prevResult = await db.result.findMany({
            where:{
                testId:testt.id as string,
                serverId:serverId as string,
                memberId:member.id as string
            }
        });

        let attempt = prevResult.length;
        attempt = attempt + 1;

        let totalResponse =testt.totalResponse || 0;
        console.log(totalResponse)
         totalResponse =totalResponse  + 1;
         console.log(totalResponse)
        const test = await db.test.update({
            where:{
                id:testId as string,
                serverId:serverId as string,
                sectionId:sectionId as string
            },
            data:{
                totalResponse:totalResponse,
                Results:{
                    create:{
                        name:member.user?.name as string,
                        memberId:member.id,
                        fullMarks:testt.fullMarks,
                        serverId:serverId as string,
                        sectionId:testt.serverId,
                        testChannelId:testt.testChannelId,
                        attempt:attempt
                    }
                }
            }
        });
        const tests = await db.test.findFirst({
            where:{
                id:test.id as string
            },
            include:{
                Results:true
            }
        });
        const test_len = tests?.Results.length || 0;
        const result = tests?.Results[test_len-1];
        
        return NextResponse.json({error:"Result created successfully", success:true,
    
        resultId:result?.id
    }, {status:200});

    } catch (error) {
        
    }
}