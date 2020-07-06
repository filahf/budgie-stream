import React, { useContext, useState } from 'react';
import { ClientContext } from '../../utils/ClientContext';
import Button from '@material-ui/core/Button';
import Dialog from './components/Dialog';

const SelectDevices = () => {
  // eslint-disable-next-line
  const [state, setState] = useContext(ClientContext);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        disabled={state.playing}
        variant='contained'
        color='secondary'
        size='large'
        onClick={() => setOpen(true)}
        style={{ color: '#d8dee9' }}
      >
        Select Devices
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SelectDevices;
