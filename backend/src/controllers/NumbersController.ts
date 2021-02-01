
import { RequestHandler } from "express";
import { prisma } from "../database";
import { sendResponse } from "../helpers";

const Numbers = prisma.numbers


export class NumberController {

    static getNumbers: RequestHandler = async (req, res) => {

        const results = await Numbers.findMany();;

        sendResponse(res, {data: results, user: req.user});
    }

    static updateNumber: RequestHandler = async (req, res) => {
        const {
            id,
            ...rest
        } = req.body;

        const results = await Numbers.update({data: rest,  where: {id:parseInt(id)} });
        sendResponse(res, {data: results, user: req.user});
    }

    static deleteNumber: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const results = await Numbers.delete({ where: { id: parseInt(id) } });
        sendResponse(res, {data: results, user: req.user});
    }

    static createNumber: RequestHandler = async (req, res) => {

        const results = await Numbers.create({data: req.body});
        sendResponse(res, {data: results, user: req.user});
    }

}