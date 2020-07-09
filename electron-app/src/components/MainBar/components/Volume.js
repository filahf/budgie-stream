import React, {
  useState,
  createRef,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ClientContext } from '../../../utils/ClientContext';
//import { setVolume } from '../../../utils/useSonos';
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

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const VolumeSlider = () => {
  const classes = useStyles();

  const [state, setState] = useContext(ClientContext);
  const devices = state.devices.filter((device) => device.selected === true);
  // Only control the volume if any devices are selected
  const disabled = !!!devices.length;

  const prevMasterValue = usePreviousValue(state.masterVol);
  const [masterValue, setMasterValue] = useState(state.masterVol);

  const [anchorEl, setAnchorEl] = useState(null);
  const ref = createRef();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const avgVol = devices.reduce(
      (totalCalories, device) => totalCalories + device.vol,
      0
    );
    console.log('avgVol', avgVol);
  }, [devices]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getMasterVol = () => {
    console.log(state.masterVol);
    return state.masterVol;
  };

  const handleMasterVol = (newMasterValue) => {
    // Toggle multiple devices control
    if (devices.length > 1) {
      setAnchorEl(ref.current);
    }

    setState((prevState) => ({
      ...prevState,
      masterVol: newMasterValue,
    }));
    const adjustVol = newMasterValue - prevMasterValue;
    handleVolChange(null, null, adjustVol);
  };

  const handleVolChange = (deviceName, newValue, adjust = false) => {
    let newState = [...state.devices];
    if (!adjust) {
      const deviceIndex = state.devices.findIndex(
        (device) => device.name === deviceName
      );

      newState[deviceIndex] = { ...newState[deviceIndex], vol: newValue };
    } else {
      newState.map((x) => (x.selected ? (x.vol = x.vol + adjust) : x));
    }

    setState((prevState) => ({
      ...prevState,
      devices: newState,
    }));
  };

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
              value={masterValue}
              disabled={disabled}
              onChange={(event, value) => handleMasterVol(value)}
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
        <DevicesVolume devices={devices} handleChange={handleVolChange} />
      </Popover>
    </>
  );
};

export default VolumeSlider;
