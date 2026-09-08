import { Sequelize } from 'sequelize';
import { dbHost, dbPort, dbName, dbUser, dbPassword, dbTimeZone } from './config';
/* Models Query */

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    timezone: dbTimeZone,
    logging: false,
});