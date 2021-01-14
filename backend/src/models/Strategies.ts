import { sequelize } from "../database";
import { DataTypes } from "sequelize";
import { Accounts } from "./Accounts";
const Strategies = sequelize.define('strategies', {
    
    name: { type: DataTypes.STRING },
    data_open: { type: DataTypes.TIME },
    earnings: { type: DataTypes.INTEGER },
    earnings_per: { type: DataTypes.INTEGER },
    allocation: { type: DataTypes.INTEGER },
    profit: { type: DataTypes.INTEGER },
    last_transaction: { type: DataTypes.INTEGER },
    apy: { type: DataTypes.INTEGER },
    buru_token: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },

}, {tableName: "Strategies"});

//@ts-ignore
Strategies.Account = Strategies.belongsTo(Accounts)

export { Strategies }