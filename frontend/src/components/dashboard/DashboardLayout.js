/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAcceptedGroups } from '../../actions/dashboard';
import Dashboard from './Dashboard';
import capitalize from '../../utils/capitalize';
import Spinner from '../landingPage/Spinner';

const DashboardLayout = ({
  dashboard: { acceptedGroups, loading },
  user,
  getAcceptedGroups,
  isAuthenticated,
}) => {
  const [centerDisplay, setCenterDisplay] = useState('Dashboard');
  const [accList, setAccList] = useState([]);
  const [accFriends, setAccFriends] = useState([]);
  useEffect(() => {
    if (isAuthenticated) getAcceptedGroups();
    if (!loading && acceptedGroups) {
      setAccList(acceptedGroups.mygroupList);
      setAccFriends(acceptedGroups.acceptedMembers);
    }
  }, [isAuthenticated, loading]);

  return loading && acceptedGroups === null ? (
    <Spinner />
  ) : (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm'>
          <div id='left_sidebar'>
            <Link
              to='/dashboard'
              id='dashboard_link'
              className='left_sidebar'
              onClick={() => setCenterDisplay('Dashboard')}
            >
              <img
                src='/favicon.ico'
                alt='logo'
                style={{ paddingBottom: '5px' }}
              />
              &nbsp;Dashboard
            </Link>
            <Link
              to='/activity'
              id='notifications_link'
              className='left_sidebar'
              onClick={() => setCenterDisplay('RecentActivity')}
            >
              <i className='fab fa-font-awesome-flag' /> Recent activity
            </Link>
            <div>
              <div className='header '>
                Groups &emsp; &emsp;
                <Link to='/new-group' className='left_sidebar hlink'>
                  <i className='fas fa-plus' /> Add
                </Link>
              </div>

              {!accList && (
                <>
                  <div className='no-groups'>
                    You do not have any groups yet.&nbsp;
                  </div>
                </>
              )}

              {accList && (
                <>
                  <ul>
                    {accList.map((group) => (
                      <li key={group.groupID}>
                        <Link
                          style={{ fontSize: '0.85rem' }}
                          className='left_sidebar'
                          to={`/groups/group/${group.groupID}`}
                        >
                          <i className='fas fa-tag' /> &nbsp;
                          {group.groupName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div>
              <div className='header '>
                Friends &emsp; &emsp;
                <Link
                  to='/new-group'
                  className='left_sidebar hlink'
                  onClick={() => setCenterDisplay('Friends')}
                >
                  <i className='fas fa-plus' /> Add
                </Link>
              </div>
              {!accFriends && (
                <>
                  <div className='no-groups'>
                    You have not added any friends yet.&nbsp;
                  </div>
                </>
              )}
              {accFriends && user && (
                <>
                  <ul>
                    {accFriends.map((mem) => {
                      if (user[0].userEmail !== mem.memberEmail) {
                        return (
                          <li key={mem.memberEmail}>
                            <Link
                              style={{ fontSize: '0.85rem' }}
                              className='left_sidebar'
                              to={`/groups/friends/${mem.idGroupMembers}`}
                            >
                              <i className='fas fa-user' /> &nbsp;
                              {mem.memberName}
                            </Link>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='col-8  center-bars '>
          {centerDisplay === 'Dashboard' && <Dashboard />}
        </div>

        <div className='col' />
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  dashboard: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  getAcceptedGroups: PropTypes.func.isRequired,
  user: PropTypes.array,
};
DashboardLayout.defaultProps = {
  user: null,
  isAuthenticated: false,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getAcceptedGroups })(DashboardLayout);
