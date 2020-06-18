import React, { useState, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ClientContext } from '../../../utils/ClientContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import { Stop, PlayArrow } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(0),
    position: 'relative',
  },
  fabProgress: {
    color: '#81a1c1',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [state, setState] = useContext(ClientContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      //setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(!success);
        setLoading(false);
      }, 2000);
    }
  };
  const devices = state.devices.filter((device) => device.selected === true);
  const disabled = !!!devices.length;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          disabled={disabled}
          aria-label='save'
          style={{ color: '#5e81ac' }}
          onClick={handleButtonClick}
        >
          {success ? <Stop /> : <PlayArrow />}
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
    </div>
  );
}
