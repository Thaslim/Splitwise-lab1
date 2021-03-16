/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';
import AddBillPopUp from '../expenses/AddBillPopUp';
import { addExpense, getDashBoardSummary } from '../../actions/dashboard';
import { roundToTwo, reducedSum } from '../../utils/calc';
import findInArray from '../../utils/findInArray';
import ListBalance from './ListBalance';
import Spinner from '../landingPage/Spinner';
import profilePic from '../user/profile-pic.png';

const Dashboard = ({
  dashboard: { summary, loading },
  acceptedGroups,
  user,
  addExpense,
  getDashBoardSummary,
  isAuthenticated,
}) => {
  const [billPopUp, setBillPopUp] = useState(false);
  const [cSymbol, setCSymbol] = useState('');
  const [getBack, setGetBack] = useState();
  const [owe, setOwe] = useState();
  const [oweNames, setOweNames] = useState([]);
  const [getBackNames, setgetBackNames] = useState([]);

  const [expenseDetails, setExpenseDetails] = useState({
    groupID: '',
    desc: '',
    amount: '',
    date: '',
  });
  useEffect(() => {
    if (isAuthenticated && user) {
      setCSymbol(getSymbolFromCurrency(user[0].userCurrency));
      getDashBoardSummary();
    }
    if (!loading && summary) {
      const getBacks = summary.summary.map((val) => {
        if (Object.values(val)[0] > 0) {
          const memName = findInArray(
            acceptedGroups.acceptedMembers,
            Object.keys(val)[0]
          );
          setgetBackNames((getBackNames) => [
            ...getBackNames,
            {
              name: memName.memberName,
              bal: Object.values(val)[0],
              pic: memName.userPicture,
            },
          ]);
          return Object.values(val)[0];
        }
        return 0;
      });
      const owes = summary.summary.map((val) => {
        if (Object.values(val)[0] < 0) {
          const memName = findInArray(
            acceptedGroups.acceptedMembers,
            Object.keys(val)[0]
          );
          setOweNames((oweNames) => [
            ...oweNames,
            {
              name: memName.memberName,
              bal: Object.values(val)[0],
              pic: memName.userPicture,
            },
          ]);
          return Object.values(val)[0];
        }
        return 0;
      });
      setGetBack(roundToTwo(reducedSum(getBacks)));
      setOwe(roundToTwo(reducedSum(owes)));
    }
  }, [getDashBoardSummary, isAuthenticated, loading]);

  const onInputChange = (e) => {
    setExpenseDetails({ ...expenseDetails, [e.target.name]: e.target.value });
  };

  const { groupID, description, amount, date } = expenseDetails;

  const onSave = async (e) => {
    e.preventDefault();
    addExpense({
      groupID,
      description,
      amount,
      date,
    });
  };

  return summary === null ? (
    <Spinner />
  ) : (
    <div className='dashboard'>
      <div className='topbar'>
        <h1>Dashboard</h1>
        <div className='actions' style={{ float: 'right' }}>
          <button
            type='button'
            className='btn btn-large text-white btn-orange'
            data-toggle='modal'
            data-target='billmodal'
            onClick={() => {
              setBillPopUp(true);
            }}
          >
            Add an expense
          </button>
          &emsp;
          <button
            type='button'
            className='btn btn-large bg-teal text-white'
            to='/settle_up'
          >
            Settle up
          </button>
          &emsp;
        </div>
      </div>

      <div className='total_balances'>
        {!acceptedGroups && (
          <>
            <h3>Welcome to Splitwise!</h3>{' '}
            <h5>
              Splitwise helps you split bills with friends. Create a group and
              add some friends
            </h5>
          </>
        )}
        {!summary && (
          <>
            <h3>Welcome to Splitwise!</h3>{' '}
            <h5>Add an expense to get started!</h5>
          </>
        )}
        <div className='row'>
          <div className='col block'>
            <div className='title'>total balance</div>

            {summary && summary.totalBalance > 0 && (
              <span className='positive'>
                <strong>
                  + {cSymbol}
                  {roundToTwo(summary.totalBalance)}
                </strong>
              </span>
            )}
            {summary && summary.totalBalance < 0 && (
              <span className='negative'>
                <strong>
                  - {cSymbol}
                  {roundToTwo(-summary.totalBalance)}
                </strong>
              </span>
            )}
          </div>
          <div className='col block '>
            <div className='title'>you owe</div>

            {summary && !owe && (
              <span className='neutral'>
                {cSymbol}
                {owe}
              </span>
            )}
            {summary && owe < 0 && (
              <span className='negative'>
                -{cSymbol}
                {-owe}
              </span>
            )}
          </div>
          <div className='col block'>
            <div className='title'>you are owed</div>
            {summary && getBack > 0 && (
              <span className='positive'>
                <strong>
                  {cSymbol}
                  {getBack}
                </strong>
              </span>
            )}
            {summary && !getBack && (
              <span className='neutral'>
                {cSymbol}
                {getBack}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <h2
            style={{ textAlign: 'left', padding: '2% 5px' }}
            className='col negatives'
          >
            you owe
          </h2>
          <h2 className='col' style={{ textAlign: 'right', padding: '2% 5px' }}>
            you are owed
          </h2>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col negatives'>
            {!owe && <>You do not owe anything</>}
            <ul>
              {owe !== 0 &&
                oweNames.map((val) => (
                  <li key={Math.random()}>
                    <ListBalance
                      name={val.name}
                      cls='negative'
                      amount={roundToTwo(val.bal)}
                      csymbol={cSymbol}
                      txt='you owe'
                      imgSrc={
                        (val.pic &&
                          `/static/uploaded_images/users/${val.pic}`) ||
                        profilePic
                      }
                    />
                  </li>
                ))}
            </ul>
          </div>

          <div className='col'>
            {!getBack && <>You are not owed anything</>}
            <ul>
              {getBack !== 0 &&
                getBackNames.map((val) => (
                  <li key={Math.random()}>
                    <ListBalance
                      name={val.name}
                      cls='positive'
                      amount={roundToTwo(val.bal)}
                      csymbol={cSymbol}
                      txt='owes you'
                      imgSrc={
                        (val.pic &&
                          `/static/uploaded_images/users/${val.pic}`) ||
                        profilePic
                      }
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      {billPopUp && (
        <>
          <AddBillPopUp
            billPopUp={billPopUp}
            setBillPopUp={setBillPopUp}
            expenseDetails={expenseDetails}
            setExpenseDetails={setExpenseDetails}
            mygroups={acceptedGroups && acceptedGroups.mygroupList}
            onInputChange={onInputChange}
            currency={cSymbol}
            onSave={onSave}
          />
        </>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  acceptedGroups: PropTypes.object.isRequired,
  user: PropTypes.array,
  addExpense: PropTypes.func.isRequired,
  getDashBoardSummary: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

Dashboard.defaultProps = {
  user: null,
  isAuthenticated: false,
};
const mapStateToProps = (state) => ({
  acceptedGroups: state.dashboard.acceptedGroups,
  user: state.auth.user,
  dashboard: state.dashboard,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { addExpense, getDashBoardSummary })(
  Dashboard
);
