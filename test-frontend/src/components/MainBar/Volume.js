import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Slider, Popover } from '@material-ui/core';
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
    console.log(event.currentTar);
    setAnchorEl(event.currentTarget);
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {};

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.container} spacing={1}>
          <Grid item id='volume-icon'>
            <VolumeUp />
          </Grid>
          <Grid item xs>
            <Slider
              aria-describedby={id}
              className={classes.slider}
              value={value}
              onChange={handleChange}
              aria-labelledby='volume-slider'
            />
          </Grid>
        </Grid>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        The content of the Popover.
      </Popover>
    </>
  );
};

export default VolumeSlider;
