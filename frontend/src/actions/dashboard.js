/* eslint-disable object-curly-newline */
import axios from 'axios';
import setAlert from './alert';

import {
  GET_GROUPS,
  GET_GROUPS_ERROR,
  ADD_EXPENSE,
  ADD_EXPENSE_ERROR,
  GET_DASHBOARD,
  DASHBOARD_ERROR,
} from './types';

// Get users active groups list
export const getAcceptedGroups = () => async (dispatch) => {
  try {
    const res = await axios.get('api/my-groups/acc-groups');
    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: GET_GROUPS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// get dashboard Summary
export const getDashBoardSummary = () => async (dispatch) => {
  try {
    const res = await axios.get('api/dashboard');
    dispatch({
      type: GET_DASHBOARD,
      payload: res.data,
    });
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: DASHBOARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add expense
export const addExpense = ({ groupID, description, amount, date }) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'Content-type': 'application/json' },
    };
    const body = JSON.stringify({ groupID, description, amount, date });
    const res = await axios.post(`/api/groups/:${groupID}`, body, config);
    dispatch({
      type: ADD_EXPENSE,
      payload: res.data,
    });
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: ADD_EXPENSE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
