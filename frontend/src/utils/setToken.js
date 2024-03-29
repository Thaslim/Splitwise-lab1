import axios from 'axios';

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common['my-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['my-auth-token'];
  }
};

export default setToken;
