import dotenv from "dotenv";

dotenv.config();

export const config = {
    port:process.env.PORT || 8000,
    nodeEnv:process.env.NODE_ENV || 'development',

    database:{
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME || 'device_provisioning',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    }

}