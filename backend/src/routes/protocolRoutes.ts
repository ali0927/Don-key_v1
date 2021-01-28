import { Router } from "express";
import {prisma} from "../database";
import { sendResponse } from "../helpers";
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'


const protocolRoutes = Router();

const YearnVault = prisma.yearn_vaults;
protocolRoutes.get("/protocols/yfi", async (req, res) =>{
    
    const results = await YearnVault.findMany();

    return sendResponse(res, {data: results, user: req.user})

})

protocolRoutes.get("/protocols/uni", async (req, res) => {
    const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option
    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])
    
    const route = new Route([pair], WETH[DAI.chainId])
    
    console.log(route.midPrice.toSignificant(6)) // 201.306
    console.log(route.midPrice.invert().toSignificant(6))
    res.send(route.midPrice.invert().toSignificant(6)) // 0.00496756

})



export { protocolRoutes }