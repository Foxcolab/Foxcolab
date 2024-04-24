import { GetDataFromToken } from "@/middlewares/getDataFromToken"
import { db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server"



export const PUT = async(req:NextRequest)=>{
    try {
        const reqBody = await req.json();
        const {name} = reqBody;
        const userId = await GetDataFromToken(req);
        const user = await db.user.findFirst({
            where:userId
        });
        const sectionId =  req.nextUrl.searchParams.get("sectionId");
        if(!sectionId) return NextResponse.json({error:"Server Id missing"}, {status:409});
        
        const section = await db.section.findUnique({
            where:{
                id:sectionId
            }
        });

        if(section?.createdBy!==user?.id){
            return NextResponse.json({
                success:false,
                message:"You are not the authorized to update the section"
            });

        }
        const updatedSection = await db.section.update({
            where:{
                id:sectionId
            },
            data:{
                name:name
            }
        });

        return NextResponse.json({
            success:true,
            message:"Section updated successfully",
            section:updatedSection
        }, {status:200})
        
    }catch (error:any) {
        return NextResponse.json({
            error:error.message
        }, {status:500})
    }
}