import express from 'express';
import { createRequire } from 'module';
import { splitwisedb } from '../../../config/database.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
const require = createRequire(import.meta.url);
const { check, validationResult } = require('express-validator/');
export const router = express.Router();

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('userName', "First name can't be blank").not().isEmpty(),
    check('userEmail', 'Enter a valid email').isEmail(),
    check(
      'userPassword',
      'Password must be 6 or more characters long'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userName: name,
      userEmail: email,
      userPassword: password,
      ...rest
    } = req.body;

    let userCurr;
    if (!req.body.userCurrency) {
      userCurr = 'USD';
    } else {
      userCurr = req.body.userCurrency;
    }

    // console.log(name, email, password);

    try {
      const findUser = await splitwisedb.findUserEmail(email);

      if (findUser.length > 0) {
        return res.status(400).json({
          errors: [{ msg: `${email} already belongs to another account.` }],
        });
      }

      //Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      const passwordEncrypted = await bcrypt.hash(password, salt);
      // try {
      let inserted = await splitwisedb.insert(
        name,
        email,
        passwordEncrypted,
        avatar,
        userCurr
      );
      // console.log(inserted.insertId);
      if (inserted) {
        const payload = {
          user: {
            key: email,
            id: inserted.insertId,
          },
        };
        //Return jsonwebtoken
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);
