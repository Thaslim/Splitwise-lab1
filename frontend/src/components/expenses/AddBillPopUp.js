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
} from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
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
  onSave,
  currency,
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
        <form onSubmit={(e) => onSave(e)}>
          <DialogContent>
            <FormControl className={classes.root}>
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
                onChange={(e) => onInputChange(e)}
              />
              <CurrencyTextField
                required
                label='Amount'
                value={expenseDetails.amount}
                name='amount'
                // minimumValue='0'
                decimalCharacter='.'
                digitGroupSeparator=','
                currencySymbol={currency}
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                required
                type='date'
                value={expenseDetails.date}
                name='date'
                onChange={(e) => onInputChange(e)}
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
            <Button type='submit' background='#1cc29f' color='secondary'>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

AddBillPopUp.propTypes = {
  billPopUp: PropTypes.bool.isRequired,
  setBillPopUp: PropTypes.func.isRequired,
  expenseDetails: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  mygroups: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
};
export default AddBillPopUp;
