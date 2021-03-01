// import api from '../utils/api';
import axios from 'axios';
import setAlert from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// // Load User
// export const loadUser = () => async (dispatch) => {
//   try {
//     const res = await api.get('/auth');

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };

// Register User
const signup = ({ userName, userEmail, userPassword }) => async (dispatch) => {
  const config = {
    headers: { 'Content-type': 'application/json' },
  };
  const body = JSON.stringify({ userName, userEmail, userPassword });
  try {
    const res = await axios.post('api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// // Login User
// export const login = (email, password) => async (dispatch) => {
//   const body = { email, password };

//   try {
//     const res = await api.post('/auth', body);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data,
//     });

//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: LOGIN_FAIL,
//     });
//   }
// };

// // Logout
// export const logout = () => ({ type: LOGOUT });

export default signup;
