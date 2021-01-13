
import { RequestHandler } from "express";
import { Accounts } from "../models/Accounts";
import { map, pick } from "lodash";

export class AccountsController {
    static getAccounts: RequestHandler = async (req, res) => {
        const results = await Accounts.findAll();
        res.json(
            map(results, (item) =>
                pick(item, [
                    "id",
                    "name",
                    "nb_Accounts",
                    "budget",
                    "age",
                    "buru_token",
                    "chart_url",
                    "apy",
                ])
            )
        );
    };
    
   
    static updateAccount: RequestHandler = async (req, res) => {
        const { id, ...rest } = req.body;

        const results = await Accounts.update(rest, { where: id });
        res.json(results);
    };

    static deleteAccount: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Accounts.destroy({ where: { id } });
        res.json({ count });
    };

    static createAccount: RequestHandler = async (req, res) => {
        const account = await Accounts.create(req.body);
        res.json(account.toJSON());
    };
}
