/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../../actions/profile';
import Currency from './Currency';
import Spinner from '../landingPage/Spinner';
import TimeZone from './TimeZone';
import Language from './Language';

const Profile = ({ getUserProfile, auth, profile: { profile, loading } }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    userCurrency: '',
    userTimezone: '',
    userLanguage: '',
  });

  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    getUserProfile();

    // setFormData({
    //   userName: loading || !profile.userName ? '' : profile.userName,
    //   userPhone: loading || !profile.userPhone ? '' : profile.userPhone,
    //   userCurrency:
    //     loading || !profile.userCurrency ? '' : profile.userCurrency,
    //   userTimezone:
    //     loading || !profile.userTimezone ? '' : profile.userTimezone,
    //   userLanguage:
    //     loading || !profile.userLanguage ? '' : profile.userLanguage,
    // });
  }, []);

  const {
    userName,
    userPhone,
    userPrimaryEmail,
    userCurrency,
    userTimezone,
    userLanguage,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     updateUserProfile(formData);
  //     // eslint-disable-next-line react/jsx-indent
  //     // <Redirect to='/dashboard' />;
  //   };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='container-fluid'>
      <h1>Your account</h1>
      <br />
      <form>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='row'>
              <div className='col-lg-6'>
                <img
                  className='picture-frame'
                  src={profile[0].userPicture}
                  style={{ width: '200px' }}
                  alt='userPicture'
                />
                <div style={{ margin: '10px 0 5px' }}>Change your avatar</div>
                <input
                  id='user_pic'
                  name='userPicture'
                  style={{ maxWidth: '200px' }}
                  size='10'
                  type='file'
                />
              </div>

              <div className='col-lg-6'>
                <div>
                  <span>Your name </span>
                  <strong>{profile[0].userName}</strong>
                  {!showName && (
                    <button
                      type='button'
                      className='btn edit-link'
                      onClick={(e) => setShowName(true)}
                    >
                      {' '}
                      <i className='fas fa-pencil-alt' />
                      Edit
                    </button>
                  )}

                  {showName && (
                    <input
                      autoComplete='off'
                      spellCheck='false'
                      type='text'
                      value={userName}
                      name='userName'
                      onChange={onChange}
                      id='user_name'
                    />
                  )}
                </div>

                <div>
                  <span>Your email address</span>
                  <strong>{profile[0].userPrimaryEmail}</strong>
                  {!showEmail && (
                    <button
                      type='button'
                      className='btn edit-link'
                      onClick={(e) => setShowEmail(true)}
                    >
                      {' '}
                      <i className='fas fa-pencil-alt' />
                      Edit
                    </button>
                  )}

                  {showEmail && (
                    <input
                      autoComplete='off'
                      spellCheck='false'
                      type='email'
                      value={userPrimaryEmail}
                      name='userEmail'
                      onChange={onChange}
                      id='user_email'
                    />
                  )}
                </div>

                <div>
                  <span>Your phone number </span>
                  <strong>
                    {!profile[0].userPhone ? 'None' : profile[0].userPhone}
                  </strong>
                  {!showPhone && (
                    <button
                      type='button'
                      className='btn edit-link'
                      onClick={(e) => setShowPhone(true)}
                    >
                      {' '}
                      <i className='fas fa-pencil-alt' />
                      Edit
                    </button>
                  )}

                  {showPhone && (
                    <input
                      autoComplete='off'
                      spellCheck='false'
                      type='text'
                      value={userPhone}
                      name='userPhone'
                      onChange={onChange}
                      id='user_phone'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='row'>
              <div className='col-lg-6'>
                <span>Your default currency</span>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#999',
                    margin: '-6px 0 5px',
                  }}
                >
                  (for new expenses)
                </div>
                <Currency />
                <span>Your time zone</span>
                <TimeZone />
                <span>Language</span>
                <Language />
              </div>
            </div>
          </div>
        </div>
        <input
          type='submit'
          name='commit'
          className='btn btn-lg btn-orange'
          value='Save'
          style={{ marginLeft: '80%' }}
        />
      </form>
    </div>
  );
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
