import React from 'react';
import { Link } from 'react-router-dom';
import splitwiselogo from './splitwise.svg';

const Navbar = () => (
  <div className='container-fluid'>
    <nav className='navbar navbar-expand-md navbar-light bg-white'>
      <Link className='navbar-brand' to='/'>
        <img
          src={splitwiselogo}
          style={{ width: '50px', height: '50px' }}
          alt='logo'
        />
        Splitwise
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#navbarSupportedContent'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div
        className='collapse navbar-collapse justify-content-end'
        id='navbarSupportedContent'
      >
        <ul className='navbar-nav ms-auto'>
          <li className='nav-item'>
            <Link
              className='text-teal nav-link'
              aria-current='page'
              to='/login'
            >
              Log in
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className='bg-teal nav-link text-white rounded shadow btn btn-md'
              to='/signup'
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Navbar;
