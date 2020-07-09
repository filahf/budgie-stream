import React, { useEffect, useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
const { shell } = window.require('electron');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 0,
  },
}));
// Sort supporters Desc
const compare = (a, b) => {
  if (a.value < b.value) {
    return 1;
  }
  if (a.value > b.value) {
    return -1;
  }
  return 0;
};

const handleClick = (e) => {
  e.preventDefault();
  shell.openExternal('https://buymeacoff.ee/budgie');
};

export default function BmcDialog(props) {
  const { close } = props;
  const classes = useStyles();
  const [supporters, setSupporters] = useState({});

  const loadSupporters = async () => {
    const response = await fetch(
      'https://filahf.github.io/budgie-stream-supporters/supporters.json'
    );
    const data = await response.json();
    setSupporters(data.supporters);
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
        maxWidth='xs'
      >
        <DialogTitle
          id='customized-dialog-title'
          style={{ textAlign: 'center', marginBottom: 0, paddingBottom: 0 }}
        >
          Sponsors & Supporters
        </DialogTitle>
        <DialogContent>
          <Typography>
            This project is open source and free to use. If you would like to
            support the development of Budgie Stream, consider buying me a
            coffee.
          </Typography>
          <div className={classes.action}>
            <Typography style={{ marginTop: '1.5rem' }} variant='subtitle2'>
              Supporters
            </Typography>
          </div>
          <div className={classes.root}>
            {Object.entries(supporters).length === 0 ? (
              <Chip variant='outlined' label='No supporters yet' />
            ) : (
              supporters.sort(compare).map((supporter, id) => (
                <Tooltip
                  key={id}
                  title={'Bought ' + supporter.value + ' coffee(s)!'}
                  placement='top'
                  arrow
                >
                  <Chip
                    icon={<FavoriteIcon style={{ color: '#bf616a' }} />}
                    variant='outlined'
                    label={supporter.name}
                  />
                </Tooltip>
              ))
            )}
          </div>
        </DialogContent>
        <MuiDialogActions className={classes.action}>
          <Button
            variant='contained'
            color='secondary'
            style={{ textTransform: 'none' }}
            onClick={handleClick}
          >
            Buy me a coffee
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
