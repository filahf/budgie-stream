import React, { useContext, useState } from "react";
import { ClientContext } from "../../utils/ClientContext";
import { Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "center",
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const SelectSource = () => {
  const classes = useStyles();
  const { playback } = useContext(ClientContext);
  const [state, setState] = playback;
  const [source, setSource] = useState(0);

  const handleChange = (event) => {
    setSource(event.target.value);
  };
  return (
    <div>
      <div className={classes.formControl}>
        <Select
          disabled={state.playing}
          value={source}
          name="Source"
          onChange={handleChange}
          className={classes.selectEmpty}
          style={{ fontSize: "0.9rem" }}
        >
          <option value={0}>System Output</option>
          <option value={1}>Mic/AUX</option>
        </Select>
      </div>
    </div>
  );
};

export default SelectSource;
