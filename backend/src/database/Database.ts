import { Sequelize } from "sequelize";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASS, DATABASE_USER } from "../env";



export const sequelize = new Sequelize(DATABASE_NAME as string, DATABASE_USER as string, DATABASE_PASS, {
    host: DATABASE_HOST,
    dialect: 'mysql'
});


export class Database {
    

    static async connect() {

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

}