
import { RequestHandler } from "express";
import { prisma } from "../database";

const Numbers = prisma.numbers


export class NumberController {

    static getNumbers: RequestHandler = async (req, res) => {

        const results = await Numbers.findMany();;

        res.json(results);
    }

    static updateNumber: RequestHandler = async (req, res) => {
        const {
            id,
            ...rest
        } = req.body;

        const results = await Numbers.update({data: rest,  where: {id:parseInt(id)} });
        res.json(results);
    }

    static deleteNumber: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Numbers.delete({ where: { id: parseInt(id) } });
        res.json({ count });
    }

    static createNumber: RequestHandler = async (req, res) => {

        const Number = await Numbers.create(req.body);
        res.json(Number);
    }

}