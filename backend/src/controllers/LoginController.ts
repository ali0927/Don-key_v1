import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { prisma } from "../database";
import { uuidv4 } from "../helpers";
import { JWT_SECRET } from "../env";
const Users = prisma.users;

export class LoginController {

    static handleLogin: RequestHandler = async (req, res) => {
        try {
            const { walletAddress } = req.body;
            let [user] = (await Users.findMany({ where: { walletAddress } }));
            if (!user) {
                user = await Users.create({ data: { walletAddress, GUID: uuidv4() } });
            }
            const token = jwt.sign({ walletAddress, GUID: user.GUID }, JWT_SECRET, { expiresIn: "1d" });

            res.send({ data: { token }, user, error: null })
        } catch (e) {
            console.log(e.message,e.stack);
            res.send({ data: null, user:null, error: e.message })
        }
    }

}