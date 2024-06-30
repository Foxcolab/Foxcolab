import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";




export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {serverId, formId, messageId} = req.query;
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
        console.log(fieldResponses);
        if(fieldResponses.length==0) return res.status(401).json({ error: "Vote not found" }); 


        const form = await db.form.findFirst({
            where:{
                serverId:serverId as string,
                id:formId as string,
            }
        });
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
        console.log("Message ond");
            const formResponse = await db.formResponse.create({
                data:{
                    createdBy:member.id as string,
                    formId:formId as string,
                    serverId:serverId as string,

                }
            });
            for(let i=0; i<fieldResponses.length; i++){
                if(fieldResponses.type==="file"){
                    const updatedFormResponse = await db.formResponse.update({
                        where:{
                            id:formResponse.id as string,
                            serverId:serverId as string
                        },
                        data:{
                            formFieldResponses:{
                                create:{
                                    formFieldId:fieldResponses[i].formFieldId as string,
                                    formId:formId as string,
                                    fieldResponse:fieldResponses[i].response,
                                    formFieldType:fieldResponses[i].type,
                                    createdBy:member.id as string,
                                    files: {
                                        connect:fieldResponses[i].response?.map((file:string)=>({id:file}))
                                    },
                                }
                            }
                        }
                    })
                }else {
                    const updatedFormResponse = await db.formResponse.update({
                        where:{
                            id:formResponse.id as string,
                            serverId:serverId as string
                        },
                        data:{
                            formFieldResponses:{
                                create:{
                                    formFieldId:fieldResponses[i].formFieldId as string,
                                    formId:formId as string,
                                    fieldResponse:fieldResponses[i].response,
                                    formFieldType:fieldResponses[i].type,
                                    createdBy:member.id as string,
                                    
                                }
                            }
                        }
                    })
                }
                
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
                          createdMember:{
                            include:{
                              user:true
                            }
                          },
                          formFields:true,
                          formResponses: {
                            include:{
                              formFieldResponses: {
                                include:{
                                  files:true
                                }
                              },
                              createdMember:{
                                include:{
                                  user:true
                                }
                              }
                            }
                          }
                        },
                        
                      },
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