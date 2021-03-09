import React from 'react';

const AddMember = (props) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  props.member.map((val, idx) => (
    <tr key={val.index}>
      <td>
        <input
          type='text'
          name='memberName'
          data-id={idx}
          className='form-control'
          placeholder='Name'
        />
      </td>
      <td>
        <input
          type='email'
          name='memberEmail'
          data-id={idx}
          className='form-control'
          placeholder='Email address(optional)'
        />
      </td>

      <td>
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => props.delete(val)}
        >
          <i className='fa fa-minus' aria-hidden='true' />
        </button>
      </td>
    </tr>
  ));
export default AddMember;
