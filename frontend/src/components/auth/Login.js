import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import splitwiselogo from '../landingPage/splitwise.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // register({ name, email, password });
  };
  return (
    <div className='container-fluid'>
      <div className='center-form'>
        <div className='img-class'>
          <Link className='brand-image' to='/'>
            <img
              style={{ width: '200px', height: '200px' }}
              src={splitwiselogo}
              alt='logo'
            />
          </Link>
        </div>

        <div className='form-content'>
          <h2>Welcome to splitwise</h2>

          <form id='new_user' onSubmit={onSubmit}>
            Email address
            <br />
            <input
              className='form-control'
              type='email'
              name='email'
              value={email}
              onChange={onInputChange}
              id='user_email'
            />
            Password
            <br />
            <input
              className='form-control'
              type='password'
              name='password'
              value={password}
              onChange={onInputChange}
              id='user_password'
            />
            <input
              type='submit'
              className='btn btn-lg btn-danger'
              value='Log in'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
