
import { RequestHandler } from "express";
import { prisma } from "../database";

const Strategies = prisma.strategies;

export class StrategiesController {
    static getStrategies: RequestHandler = async (req, res) => {

        const results = await Strategies.findMany();;

        res.json(results);
    }
    static updateStrategies: RequestHandler = async (req, res) => {
        const {
            id,
            ...rest
        } = req.body;

        const results = await Strategies.update({data: rest,  where: {id:parseInt(id)} });
        res.json(results);
    }

    static deleteStrategies: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Strategies.delete({ where: { id: parseInt(id) } });
        res.json({ count });
    }

    static createStrategies: RequestHandler = async (req, res) => {

        const strategy = await Strategies.create(req.body);
        res.json(strategy);
    }

}