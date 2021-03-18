import express from 'express';
import { createRequire } from 'module';
import path from 'path';
export const router = express.Router();
import auth from '../../../middleware/auth.js';
import { splitwisedb } from '../../../config/database.js';
const __dirname = path.resolve(path.dirname(''));

const AggregateBalance = (arr) => {
  const merged = [].concat.apply([], arr);
  const eachBalance = merged.map((e) => {
    return e.balance;
  });

  const balanceTotal = reduce_sum(eachBalance);
  return balanceTotal;
};

const reduce_sum = (arr) => {
  // get sum of msgCount prop across all objects in array
  const balanceTotal = arr.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
  return balanceTotal;
};

// @route GET api/dashboard
// @desc Get current user's groups
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const myGroups = await splitwisedb.getAcceptedGroups(req.user.key);

    // const unresolvedPromises = myGroups.map(async (val) => {
    //   return await splitwisedb.getAcceptedGroupMemberID(
    //     val.groupID,
    //     req.user.key
    //   );
    // });
    // const userGroupMemberIds = await Promise.all(unresolvedPromises);

    const unresolvedMembers = myGroups.map(async (val) => {
      return await splitwisedb.getAcceptedMembersEmail(val.groupID);
    });
    const accMembers = await Promise.all(unresolvedMembers);
    // get sum of balance across all objects in array
    const mergedAccMembers = [].concat.apply([], accMembers);
    const uniqueMembers = [
      ...new Set(mergedAccMembers.map((item) => item.memberEmail)),
    ];
    const membersExceptMe = uniqueMembers.filter((mem) => {
      return mem != req.user.key;
    });

    const unresBalancePromises = membersExceptMe.map(async (val) => {
      return await splitwisedb.getMemberBalanceAgainstCurrentUser(
        req.user.key,
        val
      );
    });
    const owedToMeBalance = await Promise.all(unresBalancePromises);

    const owedToMe = owedToMeBalance.map((val, i) => ({
      [membersExceptMe[i]]: AggregateBalance(val),
    }));

    const myUnresBalancePromises = membersExceptMe.map(async (val) => {
      return await splitwisedb.getMemberBalanceAgainstCurrentUser(
        val,
        req.user.key
      );
    });
    const moneyIOwe = await Promise.all(myUnresBalancePromises);

    const iOwe = moneyIOwe.map((val, i) => ({
      [membersExceptMe[i]]: AggregateBalance(val),
    }));

    const owedToMeArr = owedToMe.map((val) => {
      return Object.values(val);
    });

    const iOweArr = iOwe.map((val) => {
      return Object.values(val);
    });

    let balanceSummary = owedToMeArr.map((el, i) => ({
      [membersExceptMe[i]]: el[0] - iOweArr[i][0],
    }));

    const mergedOwedToMeArr = [].concat.apply([], owedToMeArr);
    const mergedIOweArr = [].concat.apply([], iOweArr);
    const totalBalance =
      reduce_sum(mergedOwedToMeArr) - reduce_sum(mergedIOweArr);

    res.json({ summary: balanceSummary, totalBalance: totalBalance });
  } catch (error) {
    res.status(500).send('Server error');
  }
});
