import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from './components/Dialog';

const SelectDevices = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        size='large'
        onClick={() => setOpen(true)}
        style={{ marginTop: '2rem' }}
      >
        Select Devices
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SelectDevices;
