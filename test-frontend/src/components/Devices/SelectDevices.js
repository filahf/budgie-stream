import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from './components/Dialog';

const SelectDevices = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button variant='outlined' color='primary' onClick={() => setOpen(true)}>
        Select Devices
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SelectDevices;
