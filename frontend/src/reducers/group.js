/* eslint-disable indent */
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
} from '../actions/types';

const initialState = {
  groupCreated: null,
  registeredUsersList: [],
  error: {},
  groupActivity: null,
  groupInfo: null,
};

function groupReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_GROUP:
      return {
        ...state,
        groupCreated: payload,
      };

    case CREATE_GROUP_ERROR:
    case GET_ALL_USERS_ERROR:
    case GET_GROUP_ACTIVITY_ERROR:
    case EDIT_GROUP_INFO_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        registeredUsersList: payload,
      };
    case GET_GROUP_ACTIVITY:
      return {
        ...state,
        groupActivity: payload,
      };
    case EDIT_GROUP_INFO:
      return {
        ...state,
        groupInfo: payload,
      };
    case CLEAR_GROUP_ACTIVITY:
      return {
        ...state,
        groupActivity: null,
      };

    default:
      return state;
  }
}

export default groupReducer;
