/* eslint-disable operator-linebreak */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  FormControl,
  DialogContentText,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import Spinner from '../landingPage/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    typography: {
      // In Japanese the characters are usually larger.
      fontSize: 8,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SettleUp = ({
  billPopUp,
  setBillPopUp,
  expenseDetails,

  defaultCurrency,
  mygroups,
  onInputChange,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={billPopUp}
        onClose={() => {
          setBillPopUp(false);
        }}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle style={{ background: '#1cc29f' }} id='form-dialog-title'>
          Add an expense
        </DialogTitle>
        <DialogContentText>
          Select a group to settle up expenses.
        </DialogContentText>
        {!mygroups && <DialogContent>Please create a Group </DialogContent>}
        <DialogContent>
          <FormControl required className={classes.root}>
            <InputLabel>Group</InputLabel>
            <Select
              id='demo-simple-select-required'
              value={expenseDetails.groupID}
              onChange={(e) => onInputChange(e)}
              className={classes.selectEmpty}
              name='groupID'
            >
              {mygroups &&
                mygroups.map((val) => (
                  <MenuItem key={val.groupID} value={val.groupID}>
                    {val.groupName}
                  </MenuItem>
                ))}
            </Select>

            <TextField
              required
              label='Description'
              value={expenseDetails.description}
              name='description'
            />
            <TextField
              required
              type='number'
              label={`Amount ${defaultCurrency}`}
              value={expenseDetails.amount}
              name='amount'
            />
            <TextField
              required
              type='date'
              value={expenseDetails.date}
              name='date'
            />
            <FormHelperText>* Required</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setBillPopUp(false);
            }}
            color='primary'
          >
            Cancel
          </Button>
          <Button background='#1cc29f' color='secondary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SettleUp.propTypes = {};
export default SettleUp;
