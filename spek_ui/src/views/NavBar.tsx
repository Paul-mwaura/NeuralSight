/* eslint-disable no-shadow */
import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { getMessage } from '../utils/api';
import { isAuthenticated } from '../utils';

// Navbar Design
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@mui/material/Link'
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: '15px !important',
        "&:hover": {
            color: 'rgb(191, 191, 191)'
        }
    },
    menuButton: {
        marginRight: 4,
    },
    title: {
        cursor: "pointer",
        flexGrow: 1,
  },
  mainNav: {
      marginBottom: "10% !important"
    }
}));

export const NavBar: FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<any | null>('');
  const classes = useStyles();
  const queryBackend = async () => {
    try {
      const message = await getMessage();
      setMessage(message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <AppBar className={classes.mainNav}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} color="inherit"  href="/" style={{ textDecoration: 'none' }}>
                    Neural Lab Africa
            </Link>
          </Typography>
          {isAuthenticated() ? (
            <>
              <Link className={classes.link} color="inherit"  href="/logout" style={{ textDecoration: 'none' }}>
                Logout
              </Link>

              <Link className={classes.link} color="inherit"  href="/makeprediction" style={{ textDecoration: 'none' }}>
                Make Prediction
              </Link>
            </>
          ) : (
            <>
              <Link className={classes.link} color="inherit" href="/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
                
              <Link className={classes.link} color="inherit" href="/signup" style={{ textDecoration: 'none' }}>
                Sign Up
              </Link>
                
              <Link className={classes.link} color="inherit" href="/admin" style={{ textDecoration: 'none' }}>
                Admin Dashboard
              </Link>
            </>
          )}
      </Toolbar>
      </AppBar>
    </>
  );
};
export default NavBar;