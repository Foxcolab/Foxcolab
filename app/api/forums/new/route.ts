import { GetDataFromToken } from "@/middlewares/getDataFromToken";
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"




export const POST =async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const { name, description, type  } = reqBody;
        const serverId = req.nextUrl.searchParams.get('serverId');
        const sectionId = req.nextUrl.searchParams.get('sectionId');
        console.log(name, type, serverId, sectionId);
        
        const userId = GetDataFromToken(req);
        const user = await db.user.findFirst({where:{id:userId}});
        const server = await db.server.findFirst({
          where:{
            id: serverId as string,
            Members:{
              some:{
                userId:user?.id,
                // role:{
                //   in:[MemberRole.admin, MemberRole.moderator]
                // }
              }
            }
          }
        });

        if(!server){return NextResponse.json({error:"You are not authorized to create a channel"}, {status:500})};
        const member = await db.member.findFirst({
            where:{
                userId:userId as string,
                serverId:serverId as string
            }
        });
        if(!member){return NextResponse.json({error:"Member not found"}, {status:500})};


        const section = await db.section.update({
          where:{
            id:sectionId as string,
          },
            data:{
              forumsChannel:{
                create:{
                  name,
                  description,
                  type,
                  createdBy:user?.id as string,
                  serverId:serverId as string,
                  memberIds:[member.id],
                  Members:{
                    connect:[{id:member.id}]
                  },
                  manager:{
                    create:{
                      serverId:serverId as string,
                      sectionId:sectionId as string,
                      memberIds:[member.id]
                    }
                  }
                },
              }
            
         }
        })

       
        


        return NextResponse.json({
            success:true,
            section
        }, {status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}



// export const POST =async(req:NextRequest)=>{
//     try {
//         const reqBody =await req.json();
//         const {title, subTitle, sectionId, serverId } = reqBody;
//         const userId = GetDataFromToken(req);
//         if (!title ) return NextResponse.json({message:"Write something"}, {status:400});

//         const forums = await db.forums.create({
//             data:{
//                 title,
//                 subTitle,
//                 sectionId,
//                 serverId,
//                 userId:userId
//             }
//         });

//         return NextResponse.json({
//             success:true,
//             message:"Forums created successfully",
//             forums
//         })

//     } catch (error) {
        
//     }
// }