import { Router } from "express";
import {prisma} from "../database";
import { sendResponse } from "../helpers";
const protocolRoutes = Router();

const YearnVault = prisma.yearn_vaults;
protocolRoutes.get("/protocols/yfi", async (req, res) =>{
    
    const results = await YearnVault.findMany();

    return sendResponse(res, {data: results, user: req.user})

})



export { protocolRoutes }