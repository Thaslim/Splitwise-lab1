/* eslint-disable indent */
import { GET_DASHBOARD, DASHBOARD_ERROR } from '../actions/types';

const initialState = { dashboard: null, error: {} };

function dashboardReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DASHBOARD:
      return {
        ...state,
        groupCreated: payload,
        loading: false,
      };

    case DASHBOARD_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}

export default dashboardReducer;
