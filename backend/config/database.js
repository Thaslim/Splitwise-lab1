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

splitwisedb.insert = (name, email, password, defaultCurrency) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO User (userName, userEmail, userPassword, userCurrency) VALUES (?,?,?,?)`,
      [name, email, password, defaultCurrency],
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

splitwisedb.addExpenseToGroup = (desc, amount, paidby, date, group_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO Expenses (description, amount, paidByEmail, date, egID) VALUES (?,?,?,?, ?)`,
      [desc, amount, paidby, date, group_id],
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

splitwisedb.getAcceptedGroups = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT groupName, groupID FROM ExpenseGroups
      INNER JOIN GroupMembers 
      ON GroupMembers.groupID = ExpenseGroups.idGroups 
      WHERE memberEmail = ? AND status=1`,
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
    db.query(
      `SELECT userPicture, userName, userEmail FROM User`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
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
      `SELECT memberName, memberEmail, userPicture 
      FROM GroupMembers INNER JOIN ExpenseGroups
      ON ExpenseGroups.idGroups = GroupMembers.groupID
      join User on GroupMembers.memberEmail = User.userEmail
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

splitwisedb.getAcceptedMembersEmail = (groupID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT memberEmail 
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

splitwisedb.getGroupMemberIDs = (groupID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT idGroupMembers,memberEmail  FROM GroupMembers
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

splitwisedb.splitExpenseWithGroupMembers = (
  expenseID,
  groupMemberID,
  balance
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO SplitExpense (idExpense, idGroupMember, balance, isSettled) VALUES (?,?,?,?)`,
      [expenseID, groupMemberID, balance, 0],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getAcceptedGroupMemberID = (groupID, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT idGroupMembers FROM GroupMembers
      WHERE status = 1 AND groupID = ? AND memberEmail = ?`,
      [groupID, email],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getBalanceFromEachGroup = (idGroupMember) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT idExpense,balance FROM SplitExpense
      WHERE idGroupMember = ? AND isSettled = 0`,
      [idGroupMember],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

splitwisedb.getMemberBalanceAgainstCurrentUser = (userEmail, memberEmail) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT idGroupMembers, idExpense, groupID,memberEmail, balance, paidByEmail
            FROM GroupMembers INNER JOIN ExpenseGroups
            ON ExpenseGroups.idGroups = GroupMembers.groupID
            left join SplitExpense on SplitExpense.idGroupMember = GroupMembers.idGroupMembers
            left join Expenses on SplitExpense.idExpense = Expenses.idExpenses
            WHERE status = 1 AND memberEmail = ? and paidByEmail =  ?`,
      [memberEmail, userEmail],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
