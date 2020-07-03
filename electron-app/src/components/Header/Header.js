import React, { useState } from 'react';
import { Grid, IconButton, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import SettingsDialog from './SettingsDialog';
import BmcDialog from './Bmc';

const Header = (props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showBmc, setShowBmc] = useState(false);

  return (
    <>
      <Grid
        container
        direction='row'
        style={{ padding: '1rem' }}
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <IconButton aria-label='coffe' onClick={(e) => setShowBmc(true)}>
            <FreeBreakfastIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={(e) => setShowSettings(true)}
            aria-label='settings'
          >
            <SettingsIcon />
          </IconButton>
        </Grid>
      </Grid>
      <SettingsDialog
        close={(e) => setShowSettings(false)}
        open={showSettings}
      />
      <BmcDialog close={(e) => setShowBmc(false)} open={showBmc} />
    </>
  );
};

export default Header;
