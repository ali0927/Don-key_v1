
import { RequestHandler } from "express";
export const appendUser: RequestHandler = (req,res, next)=> {
    // const authHeader = req.header("Authorization");
    // authHeader?.split("Bearer ")
    next()
}