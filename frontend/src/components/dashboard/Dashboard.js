/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddBillPopUp from '../expenses/AddBillPopUp';

const Dashboard = ({ acceptedGroups, user }) => {
  const [state, setState] = useState('');
  const [billPopUp, setBillPopUp] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState({
    groupID: '',
    desc: '',
    amount: '',
    date: '',
  });

  const onInputChange = (e) => {
    setExpenseDetails({ ...expenseDetails, [e.target.name]: e.target.value });
  };
  return (
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
          &nbsp;
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
        <div className='row'>
          <div className='col block'>
            <div className='title'>total balance</div>

            <span className='positive'>+ $20.00</span>
          </div>
          <div className='col block '>
            <div className='title'>you owe</div>
            <span className='neutral'>$0.00</span>
          </div>
          <div className='col block'>
            <div className='title'>you are owed</div>
            <span className='positive'>$20.00</span>
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
            <div
              style={{
                textAlign: 'left',
                color: '#999',
                fontSize: '16px',
                marginTop: '6px',
              }}
            >
              You do not owe anything
            </div>
          </div>

          <div className='col positives'>
            <ul>
              <li className='relationship'>
                <a href='#/friends/38379544'>
                  <img src='' alt='Avatar' />
                  <span className='name'>fewrew</span>
                  <br />
                  <span className='balance owes_me'>
                    owes you
                    <span className='amount'>$12.50</span>
                  </span>

                  <ul className='balance_details'>
                    <li>
                      fewrew owes you <span className='positive'>$5.00</span>{' '}
                      for “Trip”
                    </li>

                    <li>
                      fewrew owes you <span className='positive'>$7.50</span>{' '}
                      for “as”
                    </li>
                  </ul>
                </a>
              </li>
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
            defaultCurrency={user && user[0].userCurrency}
          />
        </>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  acceptedGroups: PropTypes.object.isRequired,
  user: PropTypes.object,
};

Dashboard.defaultProps = {
  user: null,
};
const mapStateToProps = (state) => ({
  acceptedGroups: state.dashboard.acceptedGroups,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(Dashboard);
