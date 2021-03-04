import axios from 'axios';
import profileReducer from '../reducers/profile';
import setAlert from './alert';

import { GET_USER_PROFILE, USER_PROFILE_ERROR } from './types';

// Get current user profile
const getUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');
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

export default getUserProfile;
