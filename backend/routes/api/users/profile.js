import express from 'express';
import phone from 'phone';
import { createRequire } from 'module';
export const router = express.Router();
import auth from '../../../middleware/auth.js';
import { splitwisedb } from '../../../config/database.js';
const require = createRequire(import.meta.url);
const { check, validationResult } = require('express-validator/');
import multer from 'multer';

const storage = multer.diskStorage({
  destination: '../public/uploaded_images',
  filename: (req, file, cb) => {
    cb(null, 'user_' + req.user.id + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(
      new Error(
        'File type not supported. Allowed extensions are .jpb, .jpeg, .png'
      )
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});
// @route GET api/me
// @desc Get current user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    let profile = await splitwisedb.profileInfo(req.user.id);
    if (!profile.length) {
      return res
        .status(400)
        .json({ message: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
  // res.send('Profile route');
});

// @route POST api/profile/me
// @desc Update profile information
// @access Private

router.post(
  '/',
  [
    auth,
    [check('userName', "First name can't be blank").not().isEmpty()],
    upload.single('userPicture'),
  ],
  async (req, res) => {
    // console.log(req.file);
    const filepath = req.file.path;
    const {
      userName: name,
      userPhone: phno,
      userCurrency: currency,
      userTimezone: TZ,
      userLanguage: lang,
    } = req.body;
    // console.log(req.body.userName);
    const errors = validationResult(req.body.userName);
    let validPhone;
    if (phno !== undefined) {
      console.log(phno);
      validPhone = phone(phno);
      if (!validPhone.length) {
        return res
          .status(400)
          .json({ error: `${phno} not a valid phone number` });
      }
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await splitwisedb.getUserbyId(req.user.id);
      if (user.length > 0) {
        // console.log(JSON.stringify(user[0]));
        let profile = await splitwisedb.updateProfile(
          user[0].idUser,
          name,
          validPhone[0],
          currency,
          TZ,
          lang,
          filepath
        );
        return res.json(profile);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);
