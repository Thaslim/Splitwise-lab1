import express from 'express';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const require = createRequire(import.meta.url);
const { check, validationResult } = require('express-validator/');
dotenv.config({ path: './config/.env' });
export const router = express.Router();
import auth from '../../../middleware/auth.js';
import { splitwisedb } from '../../../config/database.js';

// @route GET api/login
// @desc login page
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await splitwisedb.profileInfo(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/login
// @desc Authenticate user and get token
// @access Public
router.post(
  '/',
  [
    check('userEmail', 'Enter a valid email').isEmail(),
    check('userPassword', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userEmail: email, userPassword: password } = req.body;

    try {
      let results = await splitwisedb.getUserbyEmail(email);
      // console.log(JSON.stringify(results));
      if (!results.length) {
        return res.status(400).json({
          errors: [
            {
              msg: `Whoops! We couldn’t find an account for that email address and password`,
            },
          ],
        });
      }

      //Compare password

      const matchPwd = await bcrypt.compare(password, results[0].userPassword);

      if (!matchPwd) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'Whoops! We couldn’t find an account for that email address and password',
            },
          ],
        });
      }

      const payload = {
        user: {
          key: email,
          id: results[0].idUser,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //Return jsonwebtoken
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);
