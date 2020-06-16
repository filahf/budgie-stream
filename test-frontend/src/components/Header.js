import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded';
import { makeStyles } from '@material-ui/styles';

//components
import StartButton from './StartButton';

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
  playBar: {
    height: '6rem',
    alignItems: 'center',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.playBar}>
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          Stream to sonos
        </Typography>
        <StartButton />
        <AcUnitRoundedIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
