import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListSubheader,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Toolbar,
  Typography,
  Tooltip,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Store from "../../utils/userConfig";
import { ClientContext } from "../../utils/ClientContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
    width: "20ch",
  },
  formControl: {
    minWidth: "20ch",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SettingsDialog = (props) => {
  const { app } = useContext(ClientContext);
  const [appInfo] = app;
  const [sampleRate, setSampleRate] = useState(Store.get("samplerate"));
  const { close } = props;

  const classes = useStyles();

  const handleSampleChange = (e) => {
    setSampleRate(e.target.value);
  };

  const handleOnClose = () => {
    Store.set("samplerate", sampleRate);
    close();
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SETTINGS
          </Typography>
          <Button autoFocus color="inherit" onClick={handleOnClose}>
            SAVE
          </Button>
        </Toolbar>
      </AppBar>

      <List>
        <ListSubheader>App Info</ListSubheader>
        <ListItem>
          <ListItemText
            primary="Budgie Version"
            secondary={appInfo.appVersion}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Local IP" secondary={appInfo.ip} />
        </ListItem>
        <Divider />
        <ListSubheader>Settings</ListSubheader>
        <ListItem>
          <TextField
            label="Sample Rate (hz)"
            type="number"
            className={classes.textField}
            value={sampleRate || 48000}
            onChange={handleSampleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </ListItem>
        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel>Source</InputLabel>
            <Tooltip title="Source selection is under development">
              <Select disabled>
                <MenuItem>Source 1</MenuItem>
                <MenuItem>Source 2</MenuItem>
              </Select>
            </Tooltip>
          </FormControl>
        </ListItem>
      </List>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SettingsDialog;
