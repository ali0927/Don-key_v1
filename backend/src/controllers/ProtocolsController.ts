import { RequestHandler } from "express";
import { prisma } from "../database";
import { protocol_proto_map } from "@prisma/client";
import sharp from "sharp";
import axios from "axios";
const Protocols = prisma.protocols;

const convertoDataUri = async (url: string) => {
    const input = (await axios({ url, responseType: "arraybuffer" }))
        .data as Buffer;

    const uri = await sharp(input).toBuffer();

    return "data:image/png;base64," + uri.toString("base64");
}

const replaceWithDateUri = async (item: protocol_proto_map) => {

    item.image = await convertoDataUri(item.image)
};

export class ProtocolsController {
    static getProtocols: RequestHandler = async (req, res) => {
        const results = await Protocols.findMany({
            include: { actions: true, protocolMaps: true },
        });

        const newResults: (typeof results[1] & { base64: string })[] = [];
        const promises: Promise<any>[] = [];
        const base64Urls = results.map(({ vertexImageURL, protocolMaps }) => {
            protocolMaps.forEach((item) => {
                promises.push(replaceWithDateUri(item));
            });
            return convertoDataUri(vertexImageURL as string);
        });
        const uris = await Promise.all([...base64Urls, ...promises]);

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
