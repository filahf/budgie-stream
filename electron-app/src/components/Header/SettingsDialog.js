import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  ListSubheader,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.close}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={props.close}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Settings
          </Typography>
          <Button autoFocus color='inherit' onClick={props.close}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListSubheader>Environment Details </ListSubheader>
        <ListItem>
          <ListItemText primary='Budgie Version' secondary='0.0.1' />
        </ListItem>
        <ListItem>
          <ListItemText primary='Local IP' secondary='192.168.0.174' />
        </ListItem>
        <Divider />
        <ListSubheader>Stream Config </ListSubheader>
        <ListItem>
          <ListItemText
            primary='Sample rate'
            secondary={
              <React.Fragment>
                <TextField
                  id='standard-number'
                  label='kHz'
                  type='number'
                  value={48000}
                  //   onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText primary='Source' secondary='Screen 1' />
        </ListItem>
        <Divider />
      </List>
    </Dialog>
  );
};

export default SettingsDialog;
