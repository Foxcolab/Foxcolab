
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

export const GetAuth =async(req:NextApiRequest)=>{
    
    const token = req.cookies.token;

    // const token = req.cookies.token;
    const decodeToken:any = jwt.verify(token, process.env.JWT_SECRET);
    return decodeToken.id;
}