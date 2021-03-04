/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import getUserProfile from '../../actions/profile';
// import { Link } from 'react-router-dom';

const Profile = ({ getUserProfile, auth, profile }) => {
  useEffect(() => getUserProfile(), []);
  return <div>dashboard</div>;
};
Profile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserProfile })(Profile);
