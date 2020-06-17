import { AppBar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Devices from './Devices';
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
          <Devices />
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
