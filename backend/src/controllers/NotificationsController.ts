
import { RequestHandler } from "express";
import { Notifications } from "../models/Notifications";


export class NotificationController {
    static getNotifications: RequestHandler = async (req, res) => {

        const results = await Notifications.findAll();

        res.json(results);
    }
    static updateNotification: RequestHandler = async (req, res) => {
        const {
            id,
            ...rest
        } = req.body;

        const results = await Notifications.update(rest, { where: id })
        res.json(results);
    }

    static deleteNotification: RequestHandler = async (req, res) => {
        const { id } = req.body;
        const count = await Notifications.destroy({ where: { id } });
        res.json({ count });
    }

    static createNotification: RequestHandler = async (req, res) => {

        const Notification = await Notifications.create(req.body);
        res.json(Notification.toJSON());
    }

}