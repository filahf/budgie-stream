import React from 'react';
import { Grid, Tooltip, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

const Header = (props) => {
  return (
    <Grid
      container
      direction='row'
      style={{ padding: '1rem' }}
      justify='space-between'
      alignItems='center'
    >
      <Grid item>
        <Tooltip title='Support this project' aria-label='Buy me a Coffee'>
          <IconButton aria-label='coffee'>
            <LocalCafeIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <IconButton aria-label='settings'>
          <SettingsIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
