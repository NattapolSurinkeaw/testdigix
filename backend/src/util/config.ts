import dotenv from 'dotenv';
dotenv.config();

export const dbHost: string = process.env.DB_HOST || 'localhost';
export const dbPort: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
export const dbName: string = process.env.DB_NAME || '';
export const dbUser: string = process.env.DB_USER || '';
export const dbPassword: string = process.env.DB_PASSWORD || '';
export const dbDialect: 'mysql' = 'mysql';
export const dbTimeZone: string = process.env.DB_TIMEZONE || '+07:00';