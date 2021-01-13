
import { DataTypes } from "sequelize";
import { sequelize } from "../database";
const Accounts = sequelize.define('accounts', {
    picture: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    buru_token_minted: {
        type: DataTypes.NUMBER
    },
    array: {
        type: DataTypes.ARRAY(DataTypes.JSON)
    }
});

export { Accounts };
