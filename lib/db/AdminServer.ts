import { db } from "@/prisma"




const AdminServer =async()=>{
    try {
        const servers = db.server.findMany({
            where:{
                createdUser:{
                    role:"admin"
                }
            }
        });

        return servers;
    } catch (error) {
        console.log(error);
    }
}

export default AdminServer;