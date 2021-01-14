
import { RequestHandler } from "express";
import { Accounts } from "../models/Accounts";
// import { map, pick } from "lodash";

export class AccountsController {
    static getAccounts: RequestHandler = async (req, res) => {

        const results = await Accounts.findAll({});
        res.json(results);
    };

    static getAccountById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const result = await Accounts.findByPk(id);
        if (!result) {
            return res.sendStatus(404);
        }
        return res.json({
            ...result.toJSON(), array: [{
                aum: '50,000',
                daily: '073',
                daily_: '370',
                weekly: '098',
                weekly_: '_620',
                to_date: '066',
                to_date_: '330',

            }]
        });
    }

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
