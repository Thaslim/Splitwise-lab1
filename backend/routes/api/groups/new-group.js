import express from 'express';
import path from 'path';
export const router = express.Router();
import auth from '../../../middleware/auth.js';
import { splitwisedb } from '../../../config/database.js';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const __dirname = path.resolve(path.dirname(''));
const { check, validationResult } = require('express-validator/');
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

// @route POST api/new-groups
// @desc Create new group
// @access Private

router.post(
  '/',
  [
    upload.single('selectedFile'),
    auth,
    [check('groupName', "First name can't be blank").not().isEmpty()],
  ],
  async (req, res) => {
    console.log(req.body);
    let groupPicture;

    const { groupName: name, groupMembers: members } = req.body;
    if (req.file) {
      groupPicture = req.file.filename;
    } else {
      groupPicture = 'splitwiseLogo.jpg';
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userID = req.user.id;

    try {
      let checkUniqueGroupName = await splitwisedb.checkGroupName(name, userID);
      if (checkUniqueGroupName.length > 0) {
        return res.status(400).json({
          errors: [
            {
              msg: `Whoops! ${name} group already exists`,
            },
          ],
        });
      }
      const insertedGroup = await splitwisedb.insertGroup(
        name,
        groupPicture,
        userID
      );

      const currGroupID = insertedGroup.insertId;
      const currUserName = await splitwisedb.getUserName(req.user.id);
      const primaryMember = await splitwisedb.addGroupMembers(
        currGroupID,
        currUserName[0].userName,
        req.user.key,
        true
      );
      if (members.length) {
        const insertMembers = await members.map(async (x) => {
          return await splitwisedb.addGroupMembers(
            currGroupID,
            x.memberName,
            x.memberEmail,
            x.status
          );
        });
      }

      res
        .status(200)
        .json({ message: 'Successfully created group!', groupID: currGroupID });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);
