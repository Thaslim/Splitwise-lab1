/* eslint-disable indent */
import {
  CREATE_GROUP,
  CREATE_GROUP_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
} from '../actions/types';

const initialState = { groupCreated: null, registeredUsersList: [], error: {} };

function groupReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_GROUP:
      return {
        ...state,
        groupCreated: payload,
        loading: false,
      };

    case CREATE_GROUP_ERROR:
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        registeredUsersList: payload,
      };

    default:
      return state;
  }
}

export default groupReducer;
