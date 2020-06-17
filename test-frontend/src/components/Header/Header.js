import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const Header = (props) => {
  return (
    <Grid
      container
      direction='row'
      style={{ padding: '1rem' }}
      justify='flex-end'
      alignItems='center'
    >
      <Grid item>
        <IconButton aria-label='settings'>
          <SettingsIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
