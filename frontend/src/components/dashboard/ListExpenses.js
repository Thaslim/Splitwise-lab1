import React from 'react';
import PropTypes from 'prop-types';

const ListExpenses = ({
  decription,
  paidAmount,
  lentAmount,
  paidby,
  lent,
  date,
}) => {
  // const month = date.getMonth();
  console.log(date, new Date(date).getDate());
  return (
    <div className='summary'>
      <div className='expense summary involved'>
        <div className='main-block'>
          <div className='date'>
            {}
            <div className='number'>{new Date(date).getDate()}</div>
          </div>
          <i className='fas fa-receipt' />
          <div className='header'>
            <span className='description '>Expense Name</span>
          </div>
        </div>
        <div className='cost'>
          you paid
          <br />
          <span className='number'>$200.00</span>
        </div>
        <div className='you '>
          you lent T.
          <br />
          <span className='positive'>$100.00</span>
        </div>
      </div>
    </div>
  );
};

ListExpenses.propTypes = {
  decription: PropTypes.string.isRequired,
  paidAmount: PropTypes.number.isRequired,
  lentAmount: PropTypes.number.isRequired,
  paidby: PropTypes.string.isRequired,
  lent: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ListExpenses;
