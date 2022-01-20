/* eslint-disable no-shadow */
import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';

import { isAuthenticated } from '../utils';

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'


import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@mui/material/Link'

// images
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

const useStyles = makeStyles(() => ({
  link: {
    margin: 4,
  },
  menuButton: {
    marginRight: 4,
  },
  title: {
    flexGrow: 1,
  },
  buttonStyles: {
    margin: '30px auto',
  },
  headerStyle: {
    margin: '10% auto 2% auto',
  },
  captions: {
    padding: 15
  },
  headerStyles2: {
    margin: '3% auto 2% auto',
  }
}));

export const NLabs: FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<any | null>('');
  const classes = useStyles();

  return (isAuthenticated() ? (
    <>
      {message && (
        <p>
          <code>{message}</code>
        </p>
      )}
      {error && (
        <p>
          Error: <code>{error}</code>
        </p>
      )}

      <Container>

        <Grid alignItems="center">
          <Grid item  >
            <Typography variant="h3" component="h3" className={classes.headerStyle}>
              Welcome to nlabs, modify this page and keep on building.
            </Typography>
            <Typography variant="subtitle1" component="div">
              AI Power Pathogen Prediction System
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              href="/admin"
              className={classes.buttonStyles}
              size='large'
            >
              Admin Dashboard
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={classes.buttonStyles}
              size='large'
              href="/makeprediction"
              style={{
                marginLeft: "10px"
              }}
            >
              Make Prediction
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
   ) : (
        <Redirect to="/login" />
      )
  );
};

export default NLabs;
