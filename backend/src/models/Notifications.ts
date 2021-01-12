import { sequelize } from "src/database";
import { DataTypes } from "sequelize";
const Notifications = sequelize.define('notifications', {

    notification: {
        type: DataTypes.STRING,
    },

}, { timestamps: true });

export { Notifications }