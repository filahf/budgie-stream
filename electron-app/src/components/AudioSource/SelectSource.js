import { FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: 'center',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const SelectSource = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [source, setSource] = React.useState(0);

  const handleChange = (event) => {
    setSource(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={source}
          name='Source'
          onChange={handleChange}
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'age' }}
          style={{ fontSize: '0.9rem' }}
        >
          <option value={0}>System Output</option>
          <option value={1}>Mic/AUX</option>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSource;
