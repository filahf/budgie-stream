import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from './components/Dialog';

const SelectDevices = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        size='large'
        onClick={() => setOpen(true)}
        style={{ marginTop: '2rem', color: '#d8dee9' }}
      >
        Select Devices
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SelectDevices;
