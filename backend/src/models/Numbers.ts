import { sequelize } from "../database";
import { DataTypes } from "sequelize";
const Numbers = sequelize.define('numbers', {

    number: {
        type: DataTypes.NUMBER,
    },
    title: {
        type: DataTypes.STRING,
    }

});

export { Numbers }