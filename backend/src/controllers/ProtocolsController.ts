import { RequestHandler } from "express";
import { prisma } from "../database";
import sharp from "sharp";
import axios from "axios";
import { sendResponse } from "../helpers/sendResponse";
const Protocols = prisma.protocols;
const ProtocolMap = prisma.protocol_proto_map;
const convertoDataUri = async (url: string) => {
    const input = (await axios({ url, responseType: "arraybuffer" }))
        .data as Buffer;

    const uri = await sharp(input).toBuffer();

    return "data:image/png;base64," + uri.toString("base64");
}


export class ProtocolsController {

    static getMapImage: RequestHandler = async (req, res) => {
        let {protocol_id, nextprotocol_id} = req.query;
      
        const results = await ProtocolMap.findFirst({where: {protocol_id:  parseInt(protocol_id as string),
            next_protocol_id: parseInt(nextprotocol_id as string)}})
        if(!results){
            return sendResponse(res,{code: 404, error: {msg: "Not Found"}});
        }
        sendResponse(res, {data: results.image})
    }

    static getProtocols: RequestHandler = async (req, res,next) => {
        if(req.query.protocol_id && req.query.nextprotocol_id){
            return ProtocolsController.getMapImage(req,res, next);
        }

        const results = await Protocols.findMany({
            include: { actions: true,  },
        });

        const newResults: (typeof results[1] & { base64: string })[] = [];
 
        const base64Urls = results.map(({ vertexImageURL }) => {
     
            return convertoDataUri(vertexImageURL as string);
        });
        const uris = await Promise.all(base64Urls);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            newResults.push({ ...result, base64: uris[i] });
        }
        res.json(newResults);
    };
    static updateProtocols: RequestHandler = async (req, res) => {
        const { id, ...rest } = req.body;

        const results = await Protocols.update({
            data: rest,
            where: { id: parseInt(id) },
        });
        res.json(results);
    };

    static deleteProtocols: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Protocols.delete({ where: { id: parseInt(id) } });
        res.json({ count });
    };

    static createProtocols: RequestHandler = async (req, res) => {
        const strategy = await Protocols.create(req.body);
        res.json(strategy);
    };
}
