import React, { useContext } from 'react';
import { ClientContext } from '../../../utils/ClientContext';
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

const SimpleDialog = (props) => {
  const { onClose, open } = props;

  const [state, setState] = useContext(ClientContext);

  const handleChange = (deviceIp) => {
    const deviceIndex = state.devices.findIndex(
      (device) => device.ip === deviceIp
    );
    state.devices[deviceIndex].selected = !state.devices[deviceIndex].selected;
    setState({ ...state });
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
          {state.devices.map((device) => (
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
