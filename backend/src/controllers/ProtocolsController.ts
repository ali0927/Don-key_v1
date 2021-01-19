
import { RequestHandler } from "express";
import { prisma } from "../database";
//@ts-ignore
import imageDataURI from "image-data-uri";
const Protocols = prisma.protocols;


export class ProtocolsController {

    static getProtocols: RequestHandler = async (req, res) => {

        const results = await Protocols.findMany({ include: {actions: true}});;
        const newResults: any[] = [];
        const base64Urls = results.map(({vertexImageURL}) => {
            return imageDataURI.encodeFromURL(vertexImageURL)
        })
        const uris = await Promise.all(base64Urls);
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            newResults.push({ ...result, base64: uris[i] })
        }
        res.json(newResults);
    }
    static updateProtocols: RequestHandler = async (req, res) => {
        const {
            id,
            ...rest
        } = req.body;

        const results = await Protocols.update({ data: rest, where: { id: parseInt(id) } });
        res.json(results);
    }

    static deleteProtocols: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Protocols.delete({ where: { id: parseInt(id) } });
        res.json({ count });
    }

    static createProtocols: RequestHandler = async (req, res) => {

        const strategy = await Protocols.create(req.body);
        res.json(strategy);
    }

}