import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";



export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {serverId, channelId} = req.query;
        if(!serverId || !channelId) return res.status(409).json({ error: "Something went wrong" });

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return res.status(401).json({ error: "Member not found" }); 
        const channel = await db.channel.findFirst({
            where:{
                id:channelId as string,
                serverId:serverId as string
            },
            include:{
                manager:true
            }
        })
        if(!channel) return res.status(401).json({ error: "Channel not found" }); 

        let hasPermission = false;
        const whoHavePermission = channel?.whoCanCreatePolls;
        const managers = channel?.manager?.memberIds;
        const isManager = managers?.some(m => m === member?.id);
        const isAdmin = channel.createdBy===member.id;
        const isMember = channel.memberIds.includes(member.id);
        if((whoHavePermission==="member" && (isManager || isAdmin || isMember)) || (whoHavePermission==="manager" && (isAdmin || isManager)) || (whoHavePermission==="admin" && isAdmin)){
            hasPermission = true;
        }
        if(!hasPermission) return res.status(401).json({ error: "You are not authorized" });

        const {title, description, questions} = req.body;
        if(!title || !description || questions.length===0) return res.status(401).json({ error: "Enter the fields" });

        const form = await db.form.create({
            data:{
                title,
                description,
                createdBy:member.id,
                serverId:serverId as string,

            }
        });

       for(let i=0; i<questions.length; i++){
        const field = await db.formField.create({
            data:{
                name:questions[i].name,
                description:questions[i].description,
                options:questions[i].options,
                fileType:questions[i].fileType,
                fileCount:parseInt(questions[i].fileCount), 
                fileMaxSize:parseInt(questions[i].maxSize),
                type:questions[i].type,
                formId:form.id,
                required:questions[i].required,
                createdBy:member.id,
                
            }
        })
       }

       const newForm = await db.form.findFirst({
        where:{
            id:form.id,
            serverId:serverId as string,
        },
        include:{
            formFields:{
                include:{
                    createdMember:{
                        include:{
                            user:true
                        }
                    }
                }
            }
        }

       })
       
       const message = await db.message.create({
        data:{
            formId:form.id,
            serverId:serverId as string,
            sectionId:channel.sectionId,
            channelId:channel.id,
            memberId:member.id,
        },
        include:{
            form:{
                include:{
                    createdMember:{
                        include:{
                            user:true
                        }
                    },
                    formResponses:{
                        include:{
                            formFieldResponses:true
                            }
                    },
                    formFields:true
                },
                    
            },
            member:{
                include:{
                    user:true
                }
            }
        }
    });

    console.log(message);

    const channelKey = `chat:${channelId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);
    return res.status(200).json("Form created successfully");


    } catch (error) {
        console.log(error)
    }
}


export default POST;

