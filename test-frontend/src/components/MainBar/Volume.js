import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: '8rem',
  },
  container: {
    alignItems: 'center',
  },
  slider: {
    color: '#d8dee9',
  },
});

const VolumeSlider = () => {
  const classes = useStyles();
  const [value, setValue] = useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.container} spacing={1}>
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <Slider
            className={classes.slider}
            value={value}
            onChange={handleChange}
            aria-labelledby='volume-slider'
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default VolumeSlider;
