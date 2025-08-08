import {Pool} from "pg"
import { config } from "./env"
import { logger } from "../utils/logger";
import { log } from "console";

export const pool =new Pool({
host:config.database.host,
database:config.database.name,
password:config.database.password,
user:config.database.user,
port:config.database.port,
ssl: {
    rejectUnauthorized: false
  },
max:20,
idleTimeoutMillis: 30000,
connectionTimeoutMillis: 2000,
})

export const connectDatabase=async():Promise<void>=>{
try {
    await pool.connect();
    console.log("Database is connected successfully!!!");  
} catch (error) {
    console.log(error);
    
    logger.error("Database Connection Error",error)
    
}
}