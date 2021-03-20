import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const poolDB = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
  connectionLimit: 10,
});
export default poolDB;
