import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { prisma } from "../database";
import { uuidv4 } from "../helpers";
import { JWT_SECRET } from "../env";
const Users = prisma.users;

export class LoginController {

    static handleSignup: RequestHandler = async (req, res) => {
        try {
            const { walletAddress } = req.body;
            let [user] = (await Users.findMany({ where: { walletAddress } }));
            if (!user) {
                user = await Users.create({ data: { walletAddress, GUID: uuidv4() } });
            }
            const token = jwt.sign({ walletAddress, GUID: user.GUID }, JWT_SECRET, { expiresIn: "1d" });

            res.send({ data: { token }, user, error: null })
        } catch (e) {
            console.log(e.message, e.stack);
            res.status(500).send({ data: null, user: null, error: e.message })
        }
    }

    static handleSignIn: RequestHandler = async (req, res) => {
        try {

            const { walletAddress, signature } = req.body;
            if (!signature || !walletAddress) {
                return res
                    .status(400)
                    .send({ data: null, user: null, error: 'Request should have signature and publicAddress' });
            }
            let [user] = (await Users.findMany({ where: { walletAddress } }));
            const msgBufferHex = bufferToHex(Buffer.from(user.GUID, 'utf8'));
            const address = recoverPersonalSignature({
                data: msgBufferHex,
                sig: signature,
            });

            // The signature verification is successful if the address found with
            // sigUtil.recoverPersonalSignature matches the initial publicAddress
            if (address.toLowerCase() === walletAddress.toLowerCase()) {
                const token = jwt.sign({ walletAddress, GUID: user.GUID }, JWT_SECRET, { expiresIn: "1d" });
                return res.send({ data: { token }, user, error: null })
            }
            throw new Error("Invalid Signature");


        } catch (e) {
            return res.status(500).send({ data: null, user: null, error: "Internal Server Error" })
        }
    }

}