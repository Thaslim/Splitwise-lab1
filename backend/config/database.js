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
      `SELECT userEmail FROM User WHERE userEmail = ?`,
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
      `INSERT INTO User (userName, userEmail, userPassword, userPicture, userCurrency) VALUES (?,?,?,?,?)`,
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
      `SELECT userName, userEmail, userPhone, userPicture, userTimezone, userLanguage, userCurrency FROM User WHERE idUser = ?`,
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
      WHERE userEmail = ?`,
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

splitwisedb.updateProfile = (
  uId,
  name,
  email,
  phno,
  currency,
  TZ,
  lang,
  filepath
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE User SET userName = ?, userEmail = ?,userPhone = ?, userCurrency = ?, userTimezone = ?,
       userLanguage = ?, userPicture= ? WHERE idUser=?`,
      [name, email, phno, currency, TZ, lang, filepath, uId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.insertGroup = (name, groupPicture, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO ExpenseGroups (groupName, groupPicture, createdBy) VALUES (?,?,?)`,
      [name, groupPicture, userID],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.checkGroupName = (name, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM ExpenseGroups 
      WHERE createdBy = ? AND groupName = ?`,
      [userID, name],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.addGroupMembers = (groupID, name, email, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO GroupMembers (groupID, memberName, memberEmail, status) VALUES (?,?,?,?)`,
      [groupID, name, email, status],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getUserName = (userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT userName FROM User 
      WHERE idUser = ?`,
      [userID],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getGroupsList = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT groupName, status, groupID FROM ExpenseGroups
      INNER JOIN GroupMembers 
      ON GroupMembers.groupID = ExpenseGroups.idGroups 
      WHERE memberEmail = ?`,
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

splitwisedb.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT userName, userEmail FROM User`, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

splitwisedb.getGroupExpense = (groupID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT groupPicture, groupName, description, amount, date, paidBy 
    FROM ExpenseGroups INNER JOIN Expenses
    ON ExpenseGroups.idGroups = Expenses.egID
    WHERE ExpenseGroups.idGroups = ?`,
      [groupID],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getAcceptedMembers = (groupID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT memberName, memberEmail, memberBalance, isSettled 
      FROM GroupMembers INNER JOIN ExpenseGroups
      ON ExpenseGroups.idGroups = GroupMembers.groupID
      WHERE GroupMembers.groupID = ? AND status = 1 ;`,
      [groupID],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getGroupInfo = (groupID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT groupName, groupPicture, memberName, memberEmail FROM GroupMembers
      WHERE groupID = ? AND status = 1`,
      [groupID],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.updateGroup = (groupID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE ExpenseGroups SET groupName = ?, groupPicture =?
      WHERE groupID = ?`,
      [groupID],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
