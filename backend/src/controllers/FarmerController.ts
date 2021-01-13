import { RequestHandler } from "express";
import { Farmers } from "../models/Farmers";
import { map, pick } from "lodash";

export class FarmerController {
    static getFarmersData: RequestHandler = async (req, res) => {
        const results = await Farmers.findAll();
        res.json(
            map(results, (item) =>
                pick(item, [
                    "id",
                    "name",
                    "nb_farmers",
                    "budget",
                    "age",
                    "buru_token",
                    "chart_url",
                    "apy",
                ])
            )
        );
    };
    
    static getListOfFarmers: RequestHandler = async (req, res) => {
        const results = await Farmers.findAll();
        res.json(
            map(results, (item) =>
                pick(item, [
                    "id",
                    "picture",
                    "name",
                    "description",
                    "chart_image_url",
                    "apy",
                    "strategies"
                ])
            )
        );
    };
    static updateFarmer: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const {  ...rest } = req.body;

        const results = await Farmers.update(rest, { where: {id} });
        res.json(results);
    };

    static deleteFarmer: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const count = await Farmers.destroy({ where: { id } });
        res.json({ count });
    };

    static createFarmer: RequestHandler = async (req, res) => {
        const farmer = await Farmers.create(req.body);
        res.json(farmer.toJSON());
    };
}
