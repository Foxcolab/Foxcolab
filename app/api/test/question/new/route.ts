
import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        // const sectionId =  req.nextUrl.searchParams.get('sectionId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const testId =  req.nextUrl.searchParams.get('testId');
        const reqBody = await req.json();
        const { title, options, answer, qType, marks, explanation} = reqBody;
        if( !title||  !options||  !answer||  !qType||  !marks) return NextResponse.json({message:"Please enter the fileds"}, {status:409});
        console.log(title, options, answer, qType);
        
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});
        const test = await db.test.findFirst({
            where:{
                id:testId as string,
                serverId:serverId as string,
                // sectionId:sectionId as string,
                testChannelId:testChannelId as string
            }
        });
        if(!test) return NextResponse.json({error:"Test not found"}, {status:409});

        const fullMark = test.fullMarks + marks;
       
        const question =  await db.test.update({
            where:{
                id:test.id,
                serverId:serverId as string,
                testChannelId:testChannelId as string,
            },
            data:{
                fullMarks:fullMark,
                questions:{
                    create:{
                        title,
                        options,
                        answer,
                        qType,
                        marks,
                        createdBy:member.id,
                        testChannelId:testChannelId as string,
                        explanation
                    }
                }
            }
         });


         console.log("Question Created Successfully");
         

        return NextResponse.json({
            message:"Question created successfully",
            success:true,
            question
        }, {status:200});
    } catch (error) {
        console.log(error);
        
    }
}


export const DELETE =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        const testId =  req.nextUrl.searchParams.get('testId');
        const questionId =  req.nextUrl.searchParams.get('questionId');
        console.log(serverId, testId, questionId);
        
        
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});

        const test = await db.test.findFirst({
            where:{
                id:testId as string,
                serverId:serverId as string,
                questions:{
                    some:{
                        id:questionId as string
                    }
                }
            }
        })
        if(!test) return NextResponse.json({error:"Question not found"}, {status:409});
        
        await db.test.update({
            where:{
                id:test.id as string,
            },
            data:{
                questions:{
                    delete:{
                        id:questionId as string,
                        createdBy:member.id
                    }
                }
            }
        })


         console.log("Question Deleted Successfully");
         

        return NextResponse.json({
            message:"Question deleted successfully",
            success:true,
        }, {status:200});
    } catch (error) {
        console.log(error);
        
    }
}


export const PUT =async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId =  req.nextUrl.searchParams.get('serverId');
        // const sectionId =  req.nextUrl.searchParams.get('sectionId');
        const testChannelId =  req.nextUrl.searchParams.get('testChannelId');
        const testId =  req.nextUrl.searchParams.get('testId');
        const questionId =  req.nextUrl.searchParams.get('questionId');
        const reqBody = await req.json();
        const { title, options, answer, qType, marks, explanation} = reqBody;
        if( !title||  !options||  !answer||  !qType||  !marks) return NextResponse.json({message:"Please enter the fileds"}, {status:409});
        console.log(serverId, testChannelId, testId);
        
        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return NextResponse.json({error:"You are not a member"}, {status:409});
        const test = await db.test.findFirst({
            where:{
                id:testId as string,
                serverId:serverId as string,
                // sectionId:sectionId as string,
                testChannelId:testChannelId as string
            }
        });
        console.log("TES",test);
        
        if(!test) return NextResponse.json({error:"Test not found"}, {status:409});

       
        const question =  await db.test.update({
            where:{
                id:test.id,
                serverId:serverId as string,
                testChannelId:testChannelId as string,
            },
            data:{
                questions:{
                    update:{
                        where:{
                            id:questionId as string ,
                        },
                        data:{
                        title,
                        options,
                        answer,
                        qType,
                        marks,
                        createdBy:member.id,
                        testChannelId:testChannelId as string,
                        explanation
                        }
                    }
                }
            }
         });


         console.log("Question Updated Successfully");
         

        return NextResponse.json({
            message:"Question updated successfully",
            success:true,
            question
        }, {status:200});
    } catch (error) {
        console.log(error);
        
    }
}