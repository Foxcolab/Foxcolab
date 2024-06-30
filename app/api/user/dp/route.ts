import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";



export const POST =async(req:NextRequest)=>{
    try {
        const userId =await GetDataFromToken(req);
        if(!userId) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

        const reqBody =await req.json();
        const {profilePic} = reqBody;
        if(!profilePic) return NextResponse.json({
            error:"Something went wrong"
        }, {status:409});

        const user = await db.user.findFirst({
            where:{
                id:userId
            }
        });
        if(!user) return NextResponse.json({
            error:"User not found"
        }, {status:404});

        const uploadFiles = await db.uploadedFile.findFirst({
            where:{
                id:profilePic
            }
        });
        console.log(uploadFiles);

        if(!uploadFiles) return NextResponse.json({
            error:"Uploaded picture not found"
        }, {status:404});

        const updateUser = await db.user.update({
            where:{
                id:userId
            },
            data:{
                profilePic:uploadFiles.publicUrl,
                displayPic:{
                    connect:{
                        id:uploadFiles.id
                    }
                }
            }
        })

        return NextResponse.json({
            message:"Profile picture updated successfully"
        }, {status:200})
       

    } catch (error) {
        
    }
}