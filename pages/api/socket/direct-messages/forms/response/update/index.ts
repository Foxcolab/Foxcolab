import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";




export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {serverId, formId, messageId, responseId} = req.query;
        console.log(serverId, formId, messageId);
        if(!serverId  || !formId || !messageId) return res.status(409).json({ error: "Something went wrong" });


        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return res.status(401).json({ error: "Member not found" }); 


        
        const {fieldResponses} = req.body;
        console.log("Field Response::",fieldResponses);
        if(fieldResponses.length===0) return res.status(401).json({ error: "Vote not found" }); 


        const form = await db.form.findFirst({
            where:{
                serverId:serverId as string,
                id:formId as string,
            }
        });
        console.log("Polls Found:", form?.id)
        if(!form) return res.status(401).json({ error: "Form not found" }); 

        const message = await db.directMessage.findFirst({
            where:{
                id:messageId as string,
                serverId:serverId as string,
                formId:formId as string
            },
            include:{
                form:true
            }
        });
        if(!message) return res.status(401).json({ error: "Message not found" }); 

            const formResponse = await db.formResponse.findFirst({
                where:{
                    id:responseId as string,
                    serverId:serverId as string,
                    formId:formId as string
                }
            });
            if(!formResponse) return NextResponse.json({
                error:"Form response not found!"
            }, {status:409});

            for(let i=0; i<fieldResponses.length; i++){
                const updateResponse = await db.formFieldResponse.update({
                    where:{
                        // id:fieldResponses[i].id as string,
                        formFieldId_formResponseId_createdBy:{
                            formFieldId:fieldResponses[i].formFieldId,
                            formResponseId:formResponse?.id as string,
                            createdBy:member.id as string
                        },
                        // formFieldId:fieldResponses.formFieldId,
                        // formResponseId:formResponse?.id,
                        createdBy:member.id as string,
                        formId:formId as string
                    },
                    data:{
                        fieldResponse:fieldResponses[i].response,
                        files: {
                            connect:fieldResponses[i].files?.map((file:string)=>({id:file}))
                        },
                    }
                })
            }


            const updatedMessage = await db.directMessage.findFirst({
                where:{
                    id:messageId as string,
                    serverId:serverId as string,
                    formId:formId as string
                },
                include:{
                    member:{
                        include:{
                            user:true
                        }
                    },
                    form:{
                        include:{
                            formFields:{
                                include:{
                                    createdMember:{
                                        include:{
                                            user:true
                                        }
                                    }
                                }
                            },
                            formResponses:{
                                where:{
                                    createdBy:member.id as string
                                },
                                include:{
                                    formFieldResponses:{
                                        include:{
                                            formField:{
                                                include:{
                                                    createdMember:{
                                                        include:{
                                                            user:true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

            })


            console.log(updatedMessage)
            const updateKey = `chat:${message.conversationId}:messages:update`;
            res?.socket?.server?.io?.emit(updateKey, updatedMessage);
            return res.status(200).json("Form created successfully");
       
    } catch (error) {
        console.log(error)
    }

}



export default POST;