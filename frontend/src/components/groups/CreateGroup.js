/* eslint-disable comma-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import path from 'path';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import splitwiselogo from '../landingPage/splitwise.svg';
import AddMember from './AddMember';

import { createNewGroup } from '../../actions/group';

const CreateGroup = ({ createNewGroup, groupCreated, user }) => {
  const [visibility, setvisibility] = useState('hidden');
  const [maxHeight, setmaxHeight] = useState('0');
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([
    { index: Math.random(), memeberName: '', memberEmail: '' },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [groupPicture, setGroupPicture] = useState();

  useEffect(() => {
    if (user) {
      setFilePath(
        path.join('/static/uploaded_images/users', user[0].userPicture)
      );
    }
  }, [user, createNewGroup]);

  // const handleChange = (e) => {
  //   if (['memberName', 'memberEmail'].includes(e.target.name)) {
  //     const memberList = [...groupMembers];
  //     memberList[e.target.dataset.id][e.target.name] = e.target.value;
  //   }
  // };

  const addNewRow = () => {
    setGroupMembers([
      ...groupMembers,
      { index: Math.random(), memberName: '', memberEmail: '' },
    ]);
  };

  const clickOnDelete = (record) => {
    setGroupMembers([...groupMembers.filter((r) => r !== record)]);
  };

  const secondaryFields = () => {
    setvisibility('visible');
    setmaxHeight('none');
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const groupData = new FormData();
    groupData.append('groupName', groupName);
    groupData.append('groupPicture', groupPicture);
    groupData.append('groupMembers', groupMembers);
    groupData.append('selectedFile', selectedFile);
    createNewGroup(groupData);
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

        <input
          id='group_pic'
          name='groupPicture'
          style={{ maxWidth: '250px' }}
          size='10'
          type='file'
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        <div className='form-content'>
          <h2>START A NEW GROUP</h2>
          <br />
          <form id='new_group' onSubmit={onSubmit}>
            <p style={{ fontSize: '24px' }}>My group shall be called…</p>
            <input
              className='form-control'
              autoComplete='off'
              style={{
                fontSize: '32px',
                height: '42px',
              }}
              onChange={secondaryFields}
              onKeyUp={secondaryFields}
              type='text'
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              name='groupName'
              id='group_name'
            />

            <div className='secondaryFields' style={{ visibility, maxHeight }}>
              <h2>GROUP MEMBERS</h2>

              <div className='groupMembers'>
                <p style={{ float: 'left' }}>
                  <img src={filePath} alt='profilePic' />
                  {user && user[0].userName} (
                  <em>{user && user[0].userEmail}</em>)
                </p>
              </div>

              <table className='table'>
                <tbody>
                  <AddMember
                    add={addNewRow}
                    delete={clickOnDelete}
                    member={groupMembers}
                  />
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan='4'>
                      <button
                        onClick={addNewRow}
                        type='button'
                        className='btn btn-primary text-center'
                      >
                        <i className='fa fa-plus-circle' aria-hidden='true' />
                        Add Person
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <input
              type='submit'
              className='btn btn-lg btn-danger'
              value='Save'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

CreateGroup.propTypes = {
  createNewGroup: PropTypes.func.isRequired,
  groupCreated: PropTypes.object,
  user: PropTypes.arrayOf(object),
};
CreateGroup.defaultProps = {
  user: null,
  groupCreated: null,
};

const mapStateToProps = (state) => ({
  groupCreated: state.group.groupCreated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { createNewGroup })(CreateGroup);
