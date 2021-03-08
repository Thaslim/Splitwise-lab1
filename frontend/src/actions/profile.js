import axios from 'axios';
import setAlert from './alert';

import {
  GET_USER_PROFILE,
  USER_PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
} from './types';

// Get current user profile
export const getUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/me');
    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Update Profile
export const updateUserProfile = (profileData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const res = await axios.post('api/me', profileData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Profile updated'));
  } catch (error) {
    const { errors } = error.response.data;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
