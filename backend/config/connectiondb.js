import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const mysqlConnection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  insecureAuth: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log('Database Connected');
  } else {
    console.log('Database Connection Failed' + err);
  }
});

export default mysqlConnection;
