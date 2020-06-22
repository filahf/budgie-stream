import React from 'react';
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

Store.set('unicorn', 'hello');
console.log(Store.get('unicorn'));

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
        <ListItem>
          <ListItemText primary='Budgie Version' secondary='0.0.1' />
        </ListItem>
        <ListItem>
          <ListItemText primary='Local IP' secondary='192.168.0.174' />
        </ListItem>
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
      </List>
    </Dialog>
  );
};

export default SettingsDialog;
