import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
  connectionLimit: 10,
});

export let splitwisedb = {};

splitwisedb.findUserEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT userPrimaryEmail FROM User WHERE userPrimaryEmail = ?`,
      [email],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.findAdditionalEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM Emails WHERE userEmail = ?`,
      [email],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.insert = (name, email, password, avatar, defaultCurrency) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO User (userName, userPrimaryEmail, userPassword, userPicture, userCurrency) VALUES (?,?,?,?,?)`,
      [name, email, password, avatar, defaultCurrency],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.profileInfo = (idUser) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT userName, userPrimaryEmail, userPhone, userPicture, userTimezone, userLanguage, userCurrency FROM User WHERE idUser = ?`,
      [idUser],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getUserbyEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT idUser, userPassword FROM User 
      WHERE userPrimaryEmail = ?`,
      [email],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getUserbyId = (uId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT idUser, userPassword FROM User 
      WHERE idUser = ?`,
      [uId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.insertAdditionalEmail = (email, uid) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO Emails (userEmail, uId) VALUES (?,?)`,
      [email, uid],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.updateProfile = (uId, name, phno, currency, TZ, lang, filepath) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE User SET userName = ?, userPhone = ?, userCurrency = ?, userTimezone = ?,
       userLanguage = ?, userPicture= ? WHERE idUser=?`,
      [name, phno, currency, TZ, lang, filepath, uId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
