import axios from 'axios';
import setAlert from './alert';

import { GET_GROUPS, GET_GROUPS_ERROR } from './types';

// Get users active groups list
const getAcceptedGroups = () => async (dispatch) => {
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

export default getAcceptedGroups;
