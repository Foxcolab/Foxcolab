import { db } from "@/prisma"




const AdminServer =async()=>{
    try {
        const servers =await db.server.findMany({
            where:{
                createdUser:{
                    role:"admin"
                }
            },
            include:{
                _count:{
                    select:{
                        Members:true
                    }
                },
                displayPicture:true,
                coverPic:true
            }
        });
        console.log(servers);
        return servers;
    } catch (error) {
        console.log(error);
    }
}

export default AdminServer;