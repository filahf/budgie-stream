import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Store from '../../utils/userConfig';

const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const SettingsDialog = (props) => {
  const { close } = props;
  const classes = useStyles();
  const [ip, setIp] = useState('');
  const [appVersion, setAppVersion] = useState(null);
  const [sampleRate, setSampleRate] = useState(Store.get('samplerate'));

  const handleSampleChange = (e) => {
    setSampleRate(e.target.value);
  };

  const handleOnClose = () => {
    Store.set('samplerate', sampleRate);
    close();
  };

  const fetchInfo = () => {
    ipcRenderer.send('appInfo', null);
    ipcRenderer.on('appInfo', (event, arg) => {
      ipcRenderer.removeAllListeners('appInfo');
      const { appVersion, ip } = arg;
      setAppVersion(appVersion);
      setIp(ip);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={close}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            SETTINGS
          </Typography>
          <Button autoFocus color='inherit' onClick={handleOnClose}>
            SAVE
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemText primary='Budgie Version' secondary={appVersion} />
        </ListItem>
        <ListItem>
          <ListItemText primary='Local IP' secondary={ip} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Sample Rate in Hz'
            secondary={
              <>
                <TextField
                  type='number'
                  value={sampleRate || 48000}
                  onChange={handleSampleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            }
          />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default SettingsDialog;
