import React from 'react';

import { ClientProvider } from './utils/ClientContext';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MainBar from './components/MainBar/MainBar';
import Header from './components/Header/Header';
import SelectDevices from './components/Devices/SelectDevices';
import Welcome from './components/Welcome/Welcome';

function App() {
  const classes = useStyles();
  return (
    <ClientProvider>
      <div className={classes.root}>
        <Header />
        <Container component='main' className={classes.main}>
          <Welcome>
            <SelectDevices />
          </Welcome>
        </Container>
        <div className={classes.footer}>
          <MainBar />
        </div>
      </div>
    </ClientProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
  footer: {
    marginTop: 'auto',
    bottom: 0,
  },
}));

export default App;
