import { sequelize } from "../database";
import { DataTypes } from "sequelize";
const Strategies = sequelize.define('strategies', {
    name: { type: DataTypes.STRING },
    data_open: { type: DataTypes.TIME },
    earnings: { type: DataTypes.NUMBER },
    earnings_per: { type: DataTypes.NUMBER },
    allocation: { type: DataTypes.NUMBER },
    profit: { type: DataTypes.NUMBER },
    last_transaction: { type: DataTypes.NUMBER },
    apy: { type: DataTypes.NUMBER },
    buru_token: { type: DataTypes.NUMBER },
    status: { type: DataTypes.INTEGER },
});

export { Strategies }