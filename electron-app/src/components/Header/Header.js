import React, { useState } from 'react';
import { Grid, IconButton, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SettingsDialog from './SettingsDialog';
import BmcDialog from './BmcDialog';

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
          <Button aria-label='coffe' onClick={(e) => setShowBmc(true)}>
            Donate
          </Button>
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
