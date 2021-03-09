/* eslint-disable indent */
import { CREATE_GROUP, CREATE_GROUP_ERROR } from '../actions/types';

const initialState = { groupCreated: null, error: {} };

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
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}

export default groupReducer;
