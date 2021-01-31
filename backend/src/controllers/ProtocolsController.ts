import { RequestHandler } from "express";
import { prisma } from "../database";
import sharp from "sharp";
import axios from "axios";
import { sendResponse } from "../helpers/sendResponse";
const Protocols = prisma.protocols;
const ProtocolMap = prisma.protocol_proto_map;
const convertoDataUri = async (url: string) => {
    try {
        const input = (await axios({ url, responseType: "arraybuffer" }))
        .data as Buffer;

    const uri = await sharp(input).toBuffer();

    return "data:image/png;base64," + uri.toString("base64");
    }catch(e){
        return "";
    }
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
        const {id} = req.params;
        if(id){
           const result = await Protocols.findUnique({where: { id: parseInt(id) },include: {actions: true}});

            if(!result){
                return res.sendStatus(404);
            }
            const url = await convertoDataUri(result.vertexImageURL as string);

            return sendResponse(res, {data: {...result, base64: url}, user: req.user})
        }

        const results = await Protocols.findMany({
            include: { actions: true  },
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
        let { id, ...rest } = req.body;
        if(req.params.id){
            id = req.params.id;
        }
        if(!id){
            return res.sendStatus(400);
        }
        const results = await Protocols.update({
            data: rest,
            where: { id: parseInt(id) },
        });
        return res.json(results);
    };

    static deleteProtocols: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const count = await Protocols.delete({ where: { id: parseInt(id) } });
        sendResponse(res,{data: count, user: req.user});
    };

    static createProtocols: RequestHandler = async (req, res) => {
        const strategy = await Protocols.create({data: req.body});
        sendResponse(res,{data: strategy, user: req.user});
    };
}
