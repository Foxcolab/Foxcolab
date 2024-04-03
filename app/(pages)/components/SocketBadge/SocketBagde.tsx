"use client";
import { useSocket } from "../provider/SocketProvider";
import { Badge } from "@/components/ui/badge";

export const SocketBadge =()=>{
    const {isConnected} = useSocket();

    if(!isConnected){
        return(
            <Badge variant="outline" className="bg-yellow-600 text-white border-none">Connecting</Badge>
        )
    }else {
        return(
            <Badge variant="outline" className="bg-emerald-600 text-white border-none">
                Online</Badge>
        )
    }
    
}