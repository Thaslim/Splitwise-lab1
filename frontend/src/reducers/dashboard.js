/* eslint-disable indent */
import { GET_GROUPS, GET_GROUPS_ERROR, CLEAR_GROUPS } from '../actions/types';

const initialState = { acceptedGroups: null, error: {}, loading: true };

function dashboardReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUPS:
      return {
        ...state,
        acceptedGroups: payload,
        loading: false,
      };

    case GET_GROUPS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_GROUPS:
      return {
        ...state,
        acceptedGroups: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
