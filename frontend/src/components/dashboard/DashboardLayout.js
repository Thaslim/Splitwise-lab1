/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAcceptedGroups } from '../../actions/dashboard';
import capitalize from '../../utils/capitalize';
import Spinner from '../landingPage/Spinner';

const DashboardLayout = ({
  dashboard: { acceptedGroups, loading },
  user,
  getAcceptedGroups,
  isAuthenticated,
}) => {
  const [accList, setAccList] = useState([]);
  const [accFriends, setAccFriends] = useState([]);

  useEffect(() => {
    if (isAuthenticated && !acceptedGroups) getAcceptedGroups();
    if (acceptedGroups) {
      setAccList(acceptedGroups.mygroupList);
      setAccFriends(acceptedGroups.acceptedMembers);
    }
  }, [getAcceptedGroups, acceptedGroups, loading, isAuthenticated]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='side_bar'>
      <div className='row'>
        <div className='col-sm'>
          <div id='left_sidebar'>
            <NavLink
              exact
              activeClassName='color-change'
              to='/dashboard'
              className='left_sidebar'
            >
              <img
                src='/favicon.ico'
                alt='logo'
                style={{ paddingBottom: '5px', opacity: '0.5' }}
              />
              &nbsp;Dashboard
            </NavLink>
            <NavLink
              exact
              activeClassName='color-change'
              to='/activity'
              id='notifications_link'
              className='left_sidebar'
            >
              <i className='fab fa-font-awesome-flag' /> Recent activity
            </NavLink>
            <div>
              <div className='header' style={{ textTransform: 'uppercase' }}>
                Groups &emsp;
                <NavLink
                  exact
                  activeClassName='color-change'
                  to='/new-group'
                  className='left_sidebar hlink'
                >
                  <i className='fas fa-plus' /> Add
                </NavLink>
              </div>

              {!accList.length && (
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
                        <NavLink
                          exact
                          activeClassName='color-change'
                          style={{ fontSize: '0.85rem' }}
                          className='left_sidebar'
                          to={`/groups/${group.groupID}`}
                        >
                          <i className='fas fa-tag' /> &nbsp;
                          {group.groupName}
                          &emsp;
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div>
              <div className='header' style={{ textTransform: 'uppercase' }}>
                Friends &emsp;
                <NavLink
                  exact
                  activeClassName='color-change'
                  to='/new-group'
                  className='left_sidebar hlink'
                >
                  <i className='fas fa-plus' /> Add
                </NavLink>
              </div>
              {!accFriends.length && (
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
                            <NavLink
                              exact
                              activeClassName='color-change'
                              style={{ fontSize: '0.85rem' }}
                              className='left_sidebar'
                              to={`/groups/friends/${mem.idGroupMembers}`}
                            >
                              <i className='fas fa-user' /> &nbsp;
                              {capitalize(mem.memberName)}
                            </NavLink>
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
