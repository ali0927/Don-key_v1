import { RequestHandler } from "express";

import { map, pick } from "lodash";
import { prisma } from "../database";
import { sendResponse } from "../helpers";

const Farmers = prisma.farmers;

export class FarmerController {
  static getFarmersData: RequestHandler = async (req, res) => {
    const results = await Farmers.findMany();
    res.json();
    sendResponse(res, {
      data: map(results, (item) =>
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
      ),
      user: req.user,
    });
  };

  static getListOfFarmers: RequestHandler = async (req, res) => {
    const results = await Farmers.findMany();
    sendResponse(res, {data: results, user: req.user})

  };
  static updateFarmer: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    const results = await Farmers.update({
      data: rest,
      where: { id: parseInt(id) },
    });
    sendResponse(res, {data: results, user: req.user})
  };

  static deleteFarmer: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const result = await Farmers.delete({ where: { id: parseInt(id) } });
    sendResponse(res, {data: result, user: req.user})

  };

  static createFarmer: RequestHandler = async (req, res) => {
    const farmer = await Farmers.create(req.body);
    sendResponse(res, {data: farmer, user: req.user})
  };
}
