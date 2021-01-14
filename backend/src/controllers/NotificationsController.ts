
import { RequestHandler } from "express";
import { prisma } from "../database";

const Notifications = prisma.notifications;
export class NotificationController {
    static getNotifications: RequestHandler = async (req, res) => {

        const results = await Notifications.findMany();

        res.json(results);
    }
    static updateNotification: RequestHandler = async (req, res) => {
        const {
            id,
            ...rest
        } = req.body;

        const results = await Notifications.update({data: rest,  where: {id:parseInt(id)} });
        res.json(results);
    }

    static deleteNotification: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Notifications.delete({ where: { id: parseInt(id) } });
        res.json({ count });
    }

    static createNotification: RequestHandler = async (req, res) => {

        const Notification = await Notifications.create(req.body);
        res.json(Notification);
    }

}