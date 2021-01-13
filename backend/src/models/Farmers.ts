import { sequelize } from "../database";
import { DataTypes } from "sequelize";
const Farmers = sequelize.define('farmers', {
    picture: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    chart_image_url: {
        type: DataTypes.STRING
    },
    apy: {
        type: DataTypes.STRING
    },
    strategies: {
        type: DataTypes.STRING
    },
    nb_farmers: {
        type: DataTypes.INTEGER
    },
    budget: {
        type: DataTypes.NUMBER
    },
    age: {
        type: DataTypes.INTEGER
    },
    buru_token: {
        type: DataTypes.NUMBER
    },
    chart_url: {
        type: DataTypes.STRING
    }
});

export { Farmers };
