import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";




export const POST = async(req:NextRequest)=>{
    try {
        const userId = await GetDataFromToken(req);
        const serverId = req.nextUrl.searchParams.get('serverId');
        const testId = req.nextUrl.searchParams.get('testId');
        const resultId = req.nextUrl.searchParams.get('resultId');
        const questionId = req.nextUrl.searchParams.get('questionId');
        const reqBody = await req.json();
        const {answer, currentState} = reqBody;
        console.log("ANSSSS", answer, currentState);
        // console.log(questionId, serverId, testId, resultId)
        
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
            },
            include:{
                response:true
            }
        });
        if(!result) return NextResponse.json({error:"Result not found"}, {status:409});
        if(result.submitted===true) return NextResponse.json({error:"Result already submitted"}, {status:409});
        const question = await db.question.findFirst({
            where:{
                id:questionId as string
            }
        });
        if(!question) return NextResponse.json({error:"Question not found"}, {status:409});

        if(answer.length===0){
            const res = await db.response.findFirst({
                where:{
                    resultId:resultId as string,
                    questionId:questionId as string,
                    testId:testId as string,
                    createdBy:member.id as string,

                }
            });
            if(!res) return NextResponse.json({error:"Something went wrong"}, {status:409});
            const qMark = res.marks;
            const obtainMarks = result.obtainMarks - qMark;
            const Up_result = await db.result.update({
                where:{
                    id:resultId as string,
                    serverId:serverId as string,
                    testId:testId as string
                },
                data:{
                    obtainMarks:obtainMarks,
                    response:{
                        delete:{
                            id:res.id,

                        }
                    }
                },
                include:{
                    response:true
                }
            });

            return NextResponse.json({
                success:true,
                Responses:Up_result.response
                
            }, {status:200});
        }



        const a_length = answer.length;
        const r_length = question?.answer.length || 0;
        let gotMarks = 0;
        let count = 0;
        let qMarks = question.marks;
        if(a_length===r_length){
            for(let i=0; i<a_length; i++){
                for(let j=0; j<r_length; j++){
                  if(answer[i]===question?.answer[j]){
                    count++;
                  }
                }
              }
              if(count===a_length){
                gotMarks=qMarks;
              }
        }else {
            gotMarks= 0;
        }
        
        const obtainMarks = result.obtainMarks + gotMarks;
      
        const responses = result.response;
        const response = responses.find((response)=>response.questionId===questionId);
       
        if(response){
            await db.result.update({
                where:{
                    id:result.id
                },
                data:{
                    obtainMarks:obtainMarks,
                    currentState,
                    response:{
                        update:{
                            where:{
                                id:response.id,
                                questionId:questionId as string,
                                testId:testId as string,
                                resultId:resultId as string,
                                createdBy:member.id as string,
                                
                            },
                            data:{
                                answer:answer,
                                marks:gotMarks,
                            }
                            // answer,
                            // options:question.options,
                            // qMarks,
                            // marks:gotMarks,
                            // questionId:questionId as string,
                            // testId:testId as string
                        }
                    }
                },
                include:{
                    response:true
                }
            });
        }else {
            await db.result.update({
                where:{
                    id:result.id
                },
                data:{
                    obtainMarks:obtainMarks,
                    currentState,
                    response:{
                        create:{
                            answer,
                            options:question.options,
                            qMarks,
                            marks:gotMarks,
                            questionId:questionId as string,
                            testId:testId as string,
                            createdBy:member.id as string,
                        }
                    }
                },
                include:{
                    response:true
                }
            });
        }




        return NextResponse.json({
            success:true,
            Responses:result.response
        }, {status:200});

    } catch (error) {
        console.log(error);
        
    }
}
