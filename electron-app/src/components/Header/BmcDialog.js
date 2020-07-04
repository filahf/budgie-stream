import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  List,
  Chip,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      marginTop: 0,
    },
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const compare = (a, b) => {
  if (a.value < b.value) {
    return 1;
  }
  if (a.value > b.value) {
    return -1;
  }
  return 0;
};

export default function CustomizedDialogs(props) {
  const { close } = props;
  const classes = useStyles();
  const [supporters, setSupporters] = useState(null);

  const loadSupporters = async () => {
    const response = await fetch(
      'https://filahf.github.io/budgie-stream-supporters/supporters.json'
    );
    const data = await response.json();
    setSupporters(data.supporters);
    console.log(data.supporters);
  };

  useEffect(() => {
    loadSupporters();
  }, []);

  return (
    <div>
      <Dialog
        onClose={close}
        aria-labelledby='customized-dialog-title'
        open={props.open}
        scroll='paper'
        maxWidth='sm'
      >
        <DialogTitle
          id='customized-dialog-title'
          onClose={close}
          style={{ textAlign: 'center', marginBottom: 0, paddingBottom: 0 }}
        >
          Supporters
        </DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <List dense>
              {supporters &&
                supporters.sort(compare).map((supporter, id) => (
                  <ListItem key={id}>
                    <ListItemIcon>
                      <LocalCafeIcon />
                      &nbsp;x{supporter.value}
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ variant: 'subtitle2' }}
                      primary={supporter.name}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
        </DialogContent>
        <MuiDialogActions className={classes.action}>
          <Button
            variant='contained'
            color='secondary'
            style={{ textTransform: 'none' }}
          >
            Support with a coffee
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
