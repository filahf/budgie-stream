import React, { useState, createRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ClientContext } from '../../../utils/ClientContext';
import { setVolume } from '../../../utils/useSonos';
import { Grid, Slider, Popover } from '@material-ui/core';
import VolumeUp from '@material-ui/icons/VolumeUp';

import DevicesVolume from './DevicesVolume';

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
  popover: {
    '& .MuiPaper-root': {
      backgroundColor: '#2e3440',
    },
  },
});

const VolumeSlider = () => {
  const classes = useStyles();
  const [value, setValue] = useState({ master: 30 });
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = createRef();
  const open = Boolean(anchorEl);
  // eslint-disable-next-line
  const [state, setState] = useContext(ClientContext);
  const devices = state.devices.filter((device) => device.selected === true);

  const handleChange = (device, newValue) => {
    //console.log(device, newValue);
    if (devices.length > 1) {
      setAnchorEl(ref.current);
    }
    setValue((prevState) => ({
      ...prevState,
      [device]: newValue,
    }));
    console.log(value);
    //setVolume(device, newValue);
  };

  const getValue = () => {
    return 30;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Only control the volume if any devices are selected
  const disabled = !!!devices.length;

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.container} spacing={1}>
          <Grid item id='volume-icon'>
            <VolumeUp />
          </Grid>
          <Grid item ref={ref} xs>
            <Slider
              className={classes.slider}
              value={value.master}
              disabled={disabled}
              onChange={(event, value) => handleChange('master', value)}
              aria-labelledby='volume-slider'
            />
          </Grid>
        </Grid>
      </div>
      <Popover
        className={classes.popover}
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
        <DevicesVolume
          devices={devices}
          handleChange={handleChange}
          getValue={value}
        />
      </Popover>
    </>
  );
};

export default VolumeSlider;
