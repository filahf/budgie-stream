import React from 'react';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Dialog from './components/Dialog';

const SelectDevices = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant='subtitle1'>Selected: {selectedValue}</Typography>
      <br />
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <Dialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
};

export default SelectDevices;
