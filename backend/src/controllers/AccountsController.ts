import { RequestHandler } from "express";
import { prisma } from "../database";
import { sendResponse } from "../helpers";

const Accounts = prisma.accounts;

export class AccountsController {
  static getAccounts: RequestHandler = async (req, res) => {
    const results = await prisma.accounts.findMany();
    res.json(results);
  };

  static getAccountById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const result = await Accounts.findUnique({ where: { id: parseInt(id) } });
    if (!result) {
      return res.sendStatus(404);
    }

    return sendResponse(res, {
      data: {
        ...result,
        array: [
          {
            aum: "50,000",
            daily: "073",
            daily_: "370",
            weekly: "098",
            weekly_: "_620",
            to_date: "066",
            to_date_: "330",
          },
        ],
      },
      user: req.user,
    });
  };

  static updateAccount: RequestHandler = async (req, res) => {
    const { id, ...rest } = req.body;

    const results = await Accounts.update({
      data: rest,
      where: { id: parseInt(id) },
    });
    return sendResponse(res, {data: results, user: req.user})
   
  };

  static deleteAccount: RequestHandler = async (req, res) => {
    const { id } = req.body;
    const account = await Accounts.delete({ where: { id } });
    sendResponse(res,{data: account,user: req.user});
  };

  static createAccount: RequestHandler = async (req, res) => {
    const account = await Accounts.create({data: req.body});
    sendResponse(res,{data: account,user: req.user})
  };
}
