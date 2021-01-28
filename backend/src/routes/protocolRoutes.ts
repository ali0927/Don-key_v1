import { Router } from "express";
import { prisma } from "../database";
import { sendResponse } from "../helpers";
import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";
import axios from "axios";

const protocolRoutes = Router();

const YearnVault = prisma.yearn_vaults;
protocolRoutes.get("/protocols/yfi", async (req, res) => {
    const results = await YearnVault.findMany();

    return sendResponse(res, { data: results, user: req.user });
});

let unitokens: any = null

protocolRoutes.route("/protocols/uni")
.get(async (req,res) => {
    if(!unitokens){
        const result = await axios.get("https://gateway.ipfs.io/ipns/tokens.uniswap.org");
        unitokens = result.data;
    }
    res.send(unitokens);
})
.post(async (req, res) => {
    const { address1, address2 } = req.body;
    const Token1 = new Token(ChainId.MAINNET, address1, 18);
    const Token2 = new Token(ChainId.MAINNET, address2, 18);

    const pair = await Fetcher.fetchPairData(Token1, Token2);

    const route = new Route([pair], WETH[Token1.chainId]);

    sendResponse(res, {
        data: {
            midPrice: route.midPrice.toSignificant(6),
            invertedMidPrice: route.midPrice.invert().toSignificant(6),
        },
        user: req.user
    });
});

export { protocolRoutes };
