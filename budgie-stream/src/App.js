import React from "react";

import { ClientProvider } from "./utils/ClientContext";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import MainBar from "./components/BottomBar/MainBar";
import Header from "./components/Header/Header";
import SelectDevices from "./components/Devices/SelectDevices";
//import SelectSource from './components/AudioSource/SelectSource';
import Welcome from "./components/Welcome/Welcome";

function App() {
  const classes = useStyles();
  return (
    <ClientProvider>
      <div className={classes.root}>
        <Header />
        <Container component="main">
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
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  footer: {
    marginTop: "auto",
    bottom: 0,
  },
}));

export default App;
