import express from 'express';
export const router = express.Router();
import auth from '../../../middleware/auth.js';
import { splitwisedb } from '../../../config/database.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { check, validationResult } = require('express-validator/');

// @route GET api/groups/:group_id
// @desc Get expense by group id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const groupExpense = await splitwisedb.getGroupExpense(
      req.params.id,
      req.user.key
    );
    const memCount = await splitwisedb.getGroupMemberIDs(req.params.id);
    const groupMemberBalance = await splitwisedb.getGroupBalances(
      req.params.id
    );
    res.json({
      groups: groupExpense,
      memCount: memCount.length,
      groupMemberBalance: groupMemberBalance,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/groups/:group_id
// @desc Split expense
// @access Private

router.post(
  '/:group_id',
  [
    auth,
    [
      check('description', "Description can't be blank").not().isEmpty(),
      check('amount', 'Enter a valid amount').isDecimal(),
    ],
  ],
  async (req, res) => {
    const { description: desc, amount: amount, date: date } = req.body;
    const paidBy = req.user.id;
    const group_id = req.params.group_id;
    const errors = validationResult(req);
    const paidByEmail = req.user.key;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const expenseAdded = await splitwisedb.addExpenseToGroup(
        desc,
        amount,
        paidByEmail,
        date,
        group_id
      );

      if (expenseAdded.insertId) {
        const groupName = await splitwisedb.getGroupName(group_id);
        const activity = await splitwisedb.addActivity(
          `added ${amount}  to the group`,
          group_id,
          groupName[0].groupName,
          paidBy,
          paidByEmail,
          paidBy,
          paidByEmail
        );
        const groupMemberIDs = await splitwisedb.getGroupMemberIDs(group_id);
        const numActiveMembers = groupMemberIDs.length;

        const memWithBal = groupMemberIDs.map((el) => {
          let objectWithBal = Object.assign({}, el);
          if (el.memberEmail === paidByEmail) {
            objectWithBal.balance = amount / numActiveMembers - amount;
          } else {
            objectWithBal.balance = amount / numActiveMembers;
          }

          return objectWithBal;
        });

        const stringifygroupMembers = JSON.stringify(memWithBal);
        const jsongroupMembers = JSON.parse(stringifygroupMembers);

        const unresolvedPromises = jsongroupMembers.map(async (val) => {
          return await splitwisedb.splitExpenseWithGroupMembers(
            expenseAdded.insertId,
            val.idGroupMembers,
            val.balance
          );
        });
        const splittedExpense = await Promise.all(unresolvedPromises);

        if (splittedExpense) {
          res.status(200).json({
            message: 'Splitted Expense Successfully',
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);
