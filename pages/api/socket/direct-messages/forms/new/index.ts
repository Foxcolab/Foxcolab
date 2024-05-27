import { GetAuth } from "@/lib/GetAuth";
import { db } from "@/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";



export const POST =async(req:NextApiRequest, res:NextApiResponseServerIo)=>{
    try {
        const userId =await GetAuth(req);
        const {serverId, conversationId} = req.query;
        if(!serverId || !conversationId) return res.status(409).json({ error: "Something went wrong" });

        const member = await db.member.findFirst({
            where:{
                userId:userId,
                serverId:serverId as string
            }
        });
        if(!member) return res.status(401).json({ error: "Member not found" }); 
        
   
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
       
  
    const message = await db.directMessage.create({
        data: {
          formId:form.id,
          serverId:serverId as string,
        conversationId: conversationId as string,
        memberId: member.id,
        },
        include: {
          member: {
            include: {
              user: true,
            }
          }
        }
      });
    console.log(message);

    const channelKey = `chat:${conversationId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);
    return res.status(200).json("Form created successfully");


    } catch (error) {
        console.log(error)
    }
}


export default POST;

