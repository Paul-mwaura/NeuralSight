/* eslint-disable no-shadow */
import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { getMessage } from '../utils/api';
import { isAuthenticated } from '../utils';

// Navbar Design
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';

// icons
import RoomIcon from '@material-ui/icons/Room'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        padding: 15,
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
    footer: {
        width: '100%',
        position: "relative",
        bottom: 0,
        backgroudColor: "red !important",
    },
    sectionLinks: {
        margin: '30px auto',
    }
}));

export const Footer: FC = () => {
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
      <div style={{ width: '100%', backgroundColor: "black"}}>
      <AppBar style={{ background: '#2E3B55' }} className={classes.footer}>
        <Toolbar>
            <Container>
                <Grid sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        p: 1,
                        m: 1,
                      }}>
                    <Grid item > 
                        <Typography variant="h6" className={classes.title}>
                            <Link className={classes.link} color="inherit"  href="/" style={{ textDecoration: 'none' }}>
                                    Neural Lab Africa
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
                 
                <Grid sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 1,
                        m: 1,
                      }}
                    >
                    <Grid item>
                        <Link className={classes.link} color="inherit" href="#" style={{ textDecoration: 'none' }}>
                            <RoomIcon /> Nairobi, Kenya
                        </Link>
                            
                        <Link className={classes.link} color="inherit" href="https://www.instagram.com/neurallabsafrica/" style={{ textDecoration: 'none' }}>
                            <InstagramIcon />
                        </Link>
                            
                        <Link className={classes.link} color="inherit" href="https://www.facebook.com/neurallabsafrica?_rdc=1&_rdr" style={{ textDecoration: 'none' }}>
                            <FacebookIcon />
                        </Link>
                            
                        <Link className={classes.link} color="inherit" href="https://twitter.com/neurallabsafrica" style={{ textDecoration: 'none' }}>
                            <TwitterIcon />
                        </Link>
                    </Grid>
                </Grid>
                      
                <Grid alignItems="flex-center" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                }}>
                <Grid item  >
                    <Typography variant="h3" component="h3">
                        NeuralSight
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                        TM
                    </Typography>
                </Grid>
                </Grid>
            </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;