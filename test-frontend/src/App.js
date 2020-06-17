import React from 'react';
import { ClientProvider } from './utils/ClientContext';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MainBar from './components/MainBar/MainBar';
import Header from './components/Header/Header';
import SelectDevices from './components/Devices/SelectDevices';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    paddingLeft: '5rem',
  },
  footer: {
    marginTop: 'auto',
    bottom: 0,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ClientProvider>
      <div className={classes.root}>
        <Header />
        <Container component='main' className={classes.main}>
          <Typography color='primary' variant='h2' component='h1'>
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
          <SelectDevices />
        </Container>
        <div className={classes.footer}>
          <MainBar />
        </div>
      </div>
    </ClientProvider>
  );
}

export default App;
