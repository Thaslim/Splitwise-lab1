/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const MemberInputs = ({
  idx,
  members,
  handleInputChange,
  vals,
  clickDelete,
  suggest,
  suggestSelected,
  txt,
  imgSrc,
  selectedEmail,
}) => {
  const RenderSuggestions = () => {
    // console.log(suggest);
    if (suggest) {
      if (suggest.length > 0) {
        return (
          <ul>
            {suggest.map((item) => (
              <li onClick={() => suggestSelected(item)} key={Math.random()}>
                {item}
              </li>
            ))}
          </ul>
        );
      }
    }
    return null;
  };

  const memName = `memberName-${idx}`;
  const memEmail = `memberEmail-${idx}`;
  return (
    <div className='groupMembers' key={`cat-${idx}`}>
      <img src={imgSrc} alt='profilePic' />
      <input
        type='text'
        name={memName}
        data-idx={idx}
        id={memName}
        className='memberName'
        placeholder='Name'
        value={txt}
        onChange={handleInputChange}
      />
      &nbsp;
      <input
        type='email'
        name={memEmail}
        data-idx={idx}
        id={memEmail}
        className='memberEmail'
        placeholder='Email(Optional)'
        value={selectedEmail}
        onChange={handleInputChange}
      />
      &nbsp;
      <i
        onClick={() => clickDelete(vals)}
        className='fas fa-times'
        aria-hidden='true'
      />
      <RenderSuggestions />
    </div>
  );
};

MemberInputs.propTypes = {
  idx: PropTypes.number.isRequired,
  members: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
  suggest: PropTypes.array.isRequired,
  suggestSelected: PropTypes.func.isRequired,
  txt: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  selectedEmail: PropTypes.string.isRequired,
};

export default MemberInputs;
