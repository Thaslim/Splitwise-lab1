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
  Input,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import Spinner from '../landingPage/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddBillPopUp = ({
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

AddBillPopUp.propTypes = {
  billPopUp: PropTypes.bool.isRequired,
  setBillPopUp: PropTypes.func.isRequired,
  expenseDetails: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  defaultCurrency: PropTypes.string.isRequired,
  mygroups: PropTypes.array.isRequired,
};
export default AddBillPopUp;
