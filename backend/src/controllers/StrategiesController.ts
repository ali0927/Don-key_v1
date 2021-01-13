
import { RequestHandler } from "express";
import { Strategies } from "../models/Strategies";


export class StrategiesController {
    static getStrategies: RequestHandler = async (req, res) => {

        const results = await Strategies.findAll();

        res.json(results);
    }
    static updateStrategies: RequestHandler = async (req, res) => {
        const {
            id,
            ...rest
        } = req.body;

        const results = await Strategies.update(rest, { where: id })
        res.json(results);
    }

    static deleteStrategies: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Strategies.destroy({ where: { id } });
        res.json({ count });
    }

    static createStrategies: RequestHandler = async (req, res) => {

        const strategy = await Strategies.create(req.body);
        res.json(strategy.toJSON());
    }

}