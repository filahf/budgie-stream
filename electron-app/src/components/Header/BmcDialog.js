import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Chip,
  Badge,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

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
      >
        <DialogTitle id='customized-dialog-title' onClose={close}>
          Supporters of Budgie Stream
        </DialogTitle>
        <DialogContent>
          {supporters &&
            supporters.map((supporter, id) => (
              <Typography>{supporter.name}</Typography>
            ))}
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <div className={classes.root}>
            <Chip
              label='Filip'
              color='secondary'
              style={{ backgroundColor: '#a3be8c', color: 'black' }}
            />
          </div>
        </DialogContent>
        <MuiDialogActions>
          <Button
            variant='contained'
            color='secondary'
            style={{ textTransform: 'none' }}
            endIcon={<LocalCafeIcon />}
          >
            Buy me a coffee
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
