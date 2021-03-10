import axios from 'axios';
import setAlert from './alert';

import {
  CREATE_GROUP,
  CREATE_GROUP_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
} from './types';

// Get registered user list
export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('api/new-group');
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: GET_ALL_USERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Get current user profile
// eslint-disable-next-line import/prefer-default-export
export const createNewGroup = (groupData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const res = await axios.post('api/new-group', groupData, config);
    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
    dispatch(setAlert('Group created', 'success'));
    setTimeout(() => {
      history.push('/dashboard');
    }, 1000);
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: CREATE_GROUP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
