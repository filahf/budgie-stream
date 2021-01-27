import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ClientContext } from "../../../utils/ClientContext";

import { Fab } from "@material-ui/core";
import { Stop, PlayArrow } from "@material-ui/icons";
import { togglePlay } from "../../../utils/useSonos";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function StartButton() {
  const classes = useStyles();
  const { playback } = useContext(ClientContext);
  const [state, setState] = playback;

  const devices = state.devices.filter((device) => device.selected === true);
  const disabled = !!!devices.length;

  const handleButtonClick = () => {
    togglePlay(devices, !state.playing);
    setState((prevState) => ({
      ...prevState,
      playing: !prevState.playing,
    }));
  };

  return (
    <div className={classes.root}>
      <Fab
        disabled={disabled}
        style={{ color: "#5e81ac" }}
        onClick={handleButtonClick}
      >
        {state.playing ? <Stop /> : <PlayArrow />}
      </Fab>
    </div>
  );
}
