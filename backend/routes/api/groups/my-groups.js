import express from 'express';
import { createRequire } from 'module';
import path from 'path';
export const router = express.Router();
import auth from '../../../middleware/auth.js';
import { splitwisedb } from '../../../config/database.js';
const __dirname = path.resolve(path.dirname(''));

const require = createRequire(import.meta.url);
const { check, validationResult } = require('express-validator/');
import multer from 'multer';
const destPath = __dirname + '/public/uploaded_images/groups';
const storage = multer.diskStorage({
  destination: destPath,
  filename: (req, file, cb) => {
    cb(null, 'group_' + file.originalname);
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

// @route GET api/my-groups
// @desc Get current user's groups
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    let mygroupList = await splitwisedb.getGroupsList(req.user.key);

    if (!mygroupList.length) {
      return res.status(400).json({
        errors: [
          {
            msg: `Whoops! You dont belong to any groups yet!`,
          },
        ],
      });
    }
    res.json(mygroupList);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
  // res.send('Profile route');
});

// @route POST api/me
// @desc Update profile information
// @access Private

// router.post(
//   '/',
//   [
//     upload.single('selectedFile'),
//     auth,
//     [
//       check('userName', "First name can't be blank").not().isEmpty(),
//       check('userEmail', 'Enter a valid email').isEmail(),
//     ],
//   ],
//   async (req, res) => {
//     console.log(req.body);
//     let filepath;

//     const {
//       userName: name,
//       userEmail: email,
//       userPhone: phno,
//       userCurrency: currency,
//       userTimezone: TZ,
//       userLanguage: lang,
//       userPicture: pic,
//     } = req.body;
//     if (req.file) {
//       filepath = req.file.filename;
//     } else {
//       filepath = pic;
//     }

//     const errors = validationResult(req);
//     let validPhone;
//     let userValidPhone;
//     if (phno) {
//       validPhone = phone(phno);
//       userValidPhone = validPhone[0];
//       if (!validPhone.length) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: `${phno} not a valid phone number` }] });
//       }
//     }
//     if (!validPhone) {
//       userValidPhone = '';
//     }
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       let user = await splitwisedb.getUserbyId(req.user.id);

//       if (user.length > 0) {
//         // console.log(JSON.stringify(user[0]));
//         let profile = await splitwisedb.updateProfile(
//           user[0].idUser,
//           name,
//           email,
//           userValidPhone,
//           currency,
//           TZ,
//           lang,
//           filepath
//         );
//         let updatedProfile = await splitwisedb.profileInfo(req.user.id);
//         return res.json(updatedProfile);
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//     }
//   }
// );
