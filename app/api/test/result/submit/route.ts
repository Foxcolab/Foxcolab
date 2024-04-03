import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";




export const PUT = async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const testId = req.nextUrl.searchParams.get('testId');
        const resultId = req.nextUrl.searchParams.get('resultId');
        console.log(testId, serverId, resultId);
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
        if(result.submitted===true){
            return NextResponse.json({error:"Test arleady submitted."}, {status:409});
        }
        await db.result.update({
            where:{
                id:result.id
            },
            data:{
                submitted:true,
                submitTime: new Date()
            }
        });

        console.log("Test Submitted Successfully");
        return NextResponse.json({
            success:true,
            
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}
