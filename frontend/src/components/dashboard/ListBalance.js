/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListBalance = ({ cls, name, amount, csymbol, imgSrc, txt }) => (
  <div className='groupMembers'>
    <img src={imgSrc} style={{ float: 'left' }} alt='Avatar' />

    <h6 style={{ fontSize: '0.85rem' }}>
      <strong
        style={{
          float: 'left',
          marginTop: '2%',
          paddingLeft: '2%',
        }}
      >
        {name}
      </strong>

      <span className={cls}>
        {txt}
        <br />
        {csymbol} {amount}
      </span>
    </h6>
  </div>
);

ListBalance.propTypes = {
  cls: PropTypes.string.isRequired,
  name: PropTypes.string,
  amount: PropTypes.number.isRequired,
  csymbol: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};
ListBalance.defaultProps = {
  name: '',
};
export default ListBalance;
