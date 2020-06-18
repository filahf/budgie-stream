import React, { useState } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsDialog from './SettingsDialog';

const Header = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        direction='row'
        style={{ padding: '1rem' }}
        justify='flex-end'
        alignItems='center'
      >
        <Grid item>
          <IconButton onClick={handleClickOpen} aria-label='settings'>
            <SettingsIcon />
          </IconButton>
        </Grid>
      </Grid>
      <SettingsDialog close={handleClose} open={open} />
    </>
  );
};

export default Header;
