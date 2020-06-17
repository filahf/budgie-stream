import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core/';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';

const devices = [
  { name: 'Bedroom', ip: '192.168.0.1', selected: false },
  { name: 'Kitchen', ip: '192.168.0.2', selected: false },
  { name: 'Living Room', ip: '192.168.0.3', selected: false },
];

const SimpleDialog = (props) => {
  const { onClose, open } = props;

  const [state, setState] = useState(devices);

  const handleChange = (deviceIp) => {
    const deviceIndex = state.findIndex((device) => device.ip === deviceIp);
    state[deviceIndex].selected = !state[deviceIndex].selected;
    setState([...state]);
    console.log(state);
  };

  return (
    <Dialog
      onClose={onClose}
      fullWidth='true'
      maxWidth='xs'
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogTitle id='simple-dialog-title'>Select Devices</DialogTitle>
      <DialogContent>
        <List>
          {devices.map((device) => (
            <ListItem
              button
              onClick={() => handleChange(device.ip)}
              key={device.ip}
            >
              <ListItemIcon>
                <SpeakerGroupIcon />
              </ListItemIcon>
              <ListItemText id='switch-list-label-wifi' primary={device.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={device.selected}
                  name={device.ip}
                  onClick={() => handleChange(device.ip)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button onClick={onClose} color='primary' autoFocus>
            SAVE
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SimpleDialog;
