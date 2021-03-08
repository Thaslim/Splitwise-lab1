import express from 'express';
import { createRequire } from 'module';
import path from 'path';
export const router = express.Router();
import auth from '../../../middleware/auth.js';
import { splitwisedb } from '../../../config/database.js';
const __dirname = path.resolve(path.dirname(''));

const require = createRequire(import.meta.url);
const { check, validationResult } = require('express-validator/');

// @route GET api/groups/:group_id
// @desc Get expense by group id
// @access Private
router.get('/group/:group_id', auth, async (req, res) => {
  try {
    let groupExpense = await splitwisedb.getGroupExpense(req.params.group_id);

    if (!groupExpense.length) {
      return res.status(400).json({
        errors: [
          {
            msg: `Whoops! You didn't add any expense yet!`,
          },
        ],
      });
    }
    res.json(groupExpense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
  // res.send('Profile route');
});
