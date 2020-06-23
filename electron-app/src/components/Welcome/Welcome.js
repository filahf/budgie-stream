import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BudgieLogo from '../../assets/budgieLogo';

const useStyles = makeStyles(() => ({
  container: {
    flex: '1',
    marginTop: '0',
    paddingLeft: '4rem',
    paddingBottom: '4rem',
  },
}));

const Welcome = (props) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        className={classes.container}
        direction='row'
        justify='flex-start'
        alignItems='center'
        spacing={0}
      >
        <Grid item style={{ marginTop: '2rem' }}>
          <Typography color='primary' variant='h4' component='h1'>
            Budgie Stream
          </Typography>
          <Typography
            color='primary'
            variant='body1'
            component='h2'
            gutterBottom
          >
            {'Stream What You Hear To Sonos'}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <BudgieLogo style={{ height: 250, width: 'auto' }} />
        </Grid>
      </Grid>
      <Grid container direction='row' justify='center' alignItems='center'>
        {props.children}
      </Grid>
    </>
  );
};

export default Welcome;
