import axios from 'axios';
import setAlert from './alert';

import {
  CREATE_GROUP,
  CREATE_GROUP_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_GROUP_ACTIVITY,
  GET_GROUP_ACTIVITY_ERROR,
  EDIT_GROUP_INFO,
  EDIT_GROUP_INFO_ERROR,
  CLEAR_GROUP_ACTIVITY,
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
// Create New Group
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

// Get Group Activity
export const getGroupActivity = (groupID) => async (dispatch) => {
  dispatch({ type: CLEAR_GROUP_ACTIVITY });
  try {
    const res = await axios.get(`/api/groups/${groupID}`);
    dispatch({
      type: GET_GROUP_ACTIVITY,
      payload: res.data,
    });
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: GET_GROUP_ACTIVITY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get group info based on id
export const editGroupInfo = (groupID, groupData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const res = await axios.post(
      `/api/my-groups/update-group/${groupID}`,
      groupData,
      config
    );
    dispatch({
      type: EDIT_GROUP_INFO,
      payload: res.data,
    });
    dispatch(setAlert('GroupInfo updated', 'success'));
    setTimeout(() => {
      history.goBack();
    }, 500);
  } catch (error) {
    dispatch({
      type: EDIT_GROUP_INFO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
