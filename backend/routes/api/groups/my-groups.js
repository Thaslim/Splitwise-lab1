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
});

// @route GET api/my-groups/acc-groups
// @desc Get current user's groups
// @access Private
router.get('/acc-groups', auth, async (req, res) => {
  try {
    const mygroupList = await splitwisedb.getAcceptedGroups(req.user.key);

    if (!mygroupList.length) {
      return res.status(400).json({
        errors: [
          {
            msg: `Whoops! You dont belong to any groups yet!`,
          },
        ],
      });
    }
    const stringifyGroupList = JSON.stringify(mygroupList);
    const jsonGroupList = JSON.parse(stringifyGroupList);

    const unresolvedPromises = jsonGroupList.map(async (val) => {
      return await splitwisedb.getAcceptedMembers(val.groupID);
    });
    const acceptedMembers = await Promise.all(unresolvedPromises);
    res.json({ mygroupList: jsonGroupList, acceptedMembers: acceptedMembers });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/my-groups/get-group/:group_id
// @desc Get current user's groups
// @access Private
router.get('/get-group/:group_id', auth, async (req, res) => {
  try {
    let mygroupList = await splitwisedb.getGroupInfo(req.params.group_id);

    if (!mygroupList.length) {
      return res.status(400).json({
        errors: [
          {
            msg: `Whoops! No group with the given ID!`,
          },
        ],
      });
    }
    res.json(mygroupList);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/my-groups/update-group/:group_id
// @desc Update group information
// @access Private

router.post(
  '/update-group/:group_id',
  [
    upload.single('selectedFile'),
    auth,
    [check('groupName', "First name can't be blank").not().isEmpty()],
  ],
  async (req, res) => {
    console.log(req.body);
    let filepath;
    const userID = req.user.id;

    const { groupName: name, groupMembers: members } = req.body;
    if (req.file) {
      filepath = req.file.filename;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      let updatedGroup = await splitwisedb.updateGroup(req.params.group_id);

      return res.json(updatedGroup);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);
