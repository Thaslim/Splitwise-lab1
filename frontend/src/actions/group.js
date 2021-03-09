import axios from 'axios';
import setAlert from './alert';

import { CREATE_GROUP, CREATE_GROUP_ERROR } from './types';

// Get current user profile
export const createNewGroup = (groupData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const res = await axios.post('api/new-group', groupData, config);
    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
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

export const getMyGroups = () => async (dispatch) => {
  try {
    const res = await axios.post('api/new-group');
    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
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
