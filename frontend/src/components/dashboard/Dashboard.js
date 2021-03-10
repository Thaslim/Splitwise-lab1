import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Dashboard = () => {
  const [state, setstate] = useState('');
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-4'>
          <div id='left_sidebar'>
            <Link to='/dashboard' id='dashboard_link' className='left_sidebar'>
              <img src='/favicon.ico' alt='logo' />
              Dashboard
            </Link>
            <Link
              to='/activity'
              id='notifications_link'
              className='left_sidebar'
            >
              <i className='fab fa-font-awesome-flag' /> Recent activity
            </Link>

            <div className='header '>
              Groups
              <Link to='/new-group' className='left_sidebar hlink'>
                <i className='fas fa-plus' /> Add
              </Link>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='dashboard header'>
            <div className='topbar'>
              <h1>Dashboard</h1>
              <div className='actions'>
                <a
                  className='btn btn-large btn-orange'
                  data-toggle='modal'
                  href='#add_bill'
                >
                  Add an expense
                </a>
                <a
                  className='btn btn-large btn-mint'
                  data-toggle='modal'
                  href='#settle_up_form'
                >
                  Settle up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
