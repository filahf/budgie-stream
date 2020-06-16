import React from 'react';
import { AppBar, Badge, Tooltip, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SpeakerIcon from '@material-ui/icons/Speaker';

//components
import StartButton from './StartButton';
import VolumeSlider from './Volume';

const useStyles = makeStyles(() => ({
  barItems: { padding: '1.5rem' },
}));

const MainBar = (props) => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Grid
        className={classes.barItems}
        container
        direction='row'
        alignItems='center'
      >
        <Grid
          container
          direction='row'
          justify='flex-start'
          alignItems='center'
          xs
        >
          <Tooltip title='Connected Devices' aria-label='Devices'>
            <Badge color='secondary' badgeContent={2}>
              <SpeakerIcon />
            </Badge>
          </Tooltip>
        </Grid>
        <Grid container xs={6} alignItems='center' justify='center'>
          <StartButton />
        </Grid>
        <Grid container alignItems='flex-end' justify='flex-end' xs>
          <VolumeSlider />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default MainBar;
