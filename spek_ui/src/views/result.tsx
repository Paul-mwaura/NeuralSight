/* eslint-disable no-shadow */
import React, { FC, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { getMessage } from '../utils/api';
import { isAuthenticated } from '../utils';

import { orange, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// load context API
import { ImageContext } from '../contextManagers/imagesContext';


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


// image Library
import Image from 'material-ui-image'

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  }
});


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

export const Result: FC = () => {
  const classes = useStyles();
  const { image, addImage } = useContext(ImageContext);
  
  return (
    <Container>

        <Grid alignItems="center">
            <Grid item  >
                <Typography variant="h3" component="h3" className={classes.headerStyle}>
                    Result Of Prediction
                </Typography>
                <Typography variant="subtitle1" component="div">
                    The prediction made by the AI model regarding the submieted image is as follows
                </Typography>
            </Grid>
        </Grid>

      {/* grid system */}         
      <Grid container justifyContent="center" spacing={3} p={5}
        md={12} xs={12} sm={10}
        sx={{
          bgcolor: 'rgb(31, 31, 30)',
          borderRadius: 10,
          marginTop: "10px",
          marginBottom: "30px",
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
      
          <Grid item md={12} xs={12} sm={12}>
              <Paper style={{ height: '30%', width: '100%' }}>
                  <Image
                    src={ image[0][0].full_image }
                  />
              </Paper>
          </Grid>
              
      </Grid>
      
      <Grid container justifyContent="center" spacing={3} p={5}
        md={12} xs={12} sm={10}
        sx={{
          bgcolor: 'rgb(31, 31, 30)',
          borderRadius: 10,
          marginTop: "10px",
          marginBottom: "30px",
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>

          <Grid item md={12} xs={12} sm={12}>
              <Paper style={{ height: '30%', width: '100%' }}>
                  <Image
                    src={ image[0][0].crop_image }
                  />
              </Paper>
          </Grid>
              
        </Grid>
    </Container>
  );
};

export default Result;
