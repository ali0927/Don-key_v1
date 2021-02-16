import { RequestHandler } from "express";
import { prisma } from "../database";
import { sendResponse, uuidv4 } from "../helpers";

const Users = prisma.users;

export class UsersController {
    static getUsers: RequestHandler = async (req, res) => {
        const results = await Users.findMany();
        sendResponse(res, { data: results, user: req.user });
    };

    static getUsersById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const result = await Users.findUnique({ where: { id: parseInt(id) } });
        if (!result) {
            return res.sendStatus(404);
        }

        return sendResponse(res, {
            data: result,
            user: req.user,
        });
    };
    static updateUser: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const date = new Date();
        const results = await Users.update({
            data: {...req.body, updatedAt: date,},
            where: { id: parseInt(id) },
        });
        return sendResponse(res, { data: results, user: req.user });
    };
    static deleteUser: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const user = await Users.delete({ where: { id: parseInt(id) } });
        sendResponse(res, { data: user, user: req.user });
    };

    static createUser: RequestHandler = async (req, res) => {
        const date = new Date();
        const user = await Users.create({
            data: {
                ...req.body,
                GUID: uuidv4(),
                createdAt: date,
                updatedAt: date,
            },
        });
        sendResponse(res, { data: user, user: req.user });
    };
}
