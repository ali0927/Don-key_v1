
import { RequestHandler } from "express";
import { Numbers } from "src/models/Numbers";


export class NumberController {
    static getNumbers: RequestHandler = async (req, res) => {

        const results = await Numbers.findAll();

        res.json(results);
    }
    static updateNumber: RequestHandler = async (req, res) => {
        const {
            id,
            ...rest
        } = req.body;

        const results = await Numbers.update(rest, { where: id })
        res.json(results);
    }

    static deleteNumber: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Numbers.destroy({ where: { id } });
        res.json({ count });
    }

    static createNumber: RequestHandler = async (req, res) => {

        const Number = await Numbers.create(req.body);
        res.json(Number.toJSON());
    }

}