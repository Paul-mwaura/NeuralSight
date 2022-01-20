/* eslint-disable no-shadow */
import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { getMessage } from '../utils/api';
import { isAuthenticated } from '../utils';

import { orange, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';


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

export const Home: FC = () => {
  const classes = useStyles();
  return (
    <Container>

      <Grid alignItems="center">
        <Grid item  >
          <Typography variant="h3" component="h3" className={classes.headerStyle}>
            Welcome To Neural Lab Africa
          </Typography>
          <Typography variant="subtitle1" component="div">
            Impacting Healthcare Using AI
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary" href="/signup"
            className={classes.buttonStyles}
            size='large'
          >
            Get Started
          </Button>
        </Grid>

         <Grid item>
          <Typography className={classes.buttonStyles}>
            AI Power Pathogen Prediction System
          </Typography>
        </Grid>
      </Grid>

      {/* grid system */}         
      <Grid container justifyContent="center" spacing={3} p={5}>
          <Grid item md={4} xs={12} sm={4}>
          <Paper style={{ height: '30%', width: '100%' }}>
            <Image
              src={ image1 }
            />
            <Paper >
              <Typography className={classes.captions}>
                Hello world Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum iure officia natus, dolor dolore maxime corporis nostrum harum excepturi similique maiores repellat, minus libero. Sunt laborum ipsam, accusamus eos dolor repellat asperiores eum odit error fuga! Labore numquam sequi neque iusto rem dolorem at, expedita corporis quos accusamus delectus?
              </Typography>
            </Paper>
          </Paper>
          </Grid>

          <Grid item md={4} sm={4}  xs={12}>
            <Paper style={{ height: '30%', width: '100%' }}>
            <Image
              src={ image2 }
            />
            <Paper >
              <Typography className={classes.captions}>
                Hello world Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum iure officia natus, dolor dolore maxime corporis nostrum harum excepturi similique maiores repellat, minus libero. Sunt laborum ipsam, accusamus eos dolor repellat asperiores eum odit error fuga! Labore numquam sequi neque iusto rem dolorem at, expedita corporis quos accusamus delectus?
              </Typography>
            </Paper>
          </Paper>
          </Grid>

          <Grid item md={4} sm={4} xs={12}>
            <Paper style={{ height: '30%', width: '100%' }}>
            <Image
              src={ image3 }
            />
            <Paper >
              <Typography className={classes.captions}>
                Hello world Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum iure officia natus, dolor dolore maxime corporis nostrum harum excepturi similique maiores repellat, minus libero. Sunt laborum ipsam, accusamus eos dolor repellat asperiores eum odit error fuga! Labore numquam sequi neque iusto rem dolorem at, expedita corporis quos accusamus delectus?
              </Typography>
            </Paper>
          </Paper>
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

        <Grid item >
          <Typography variant="h3" component="h3" className={classes.headerStyles2}>
            How It All Works
          </Typography>
          <Typography variant="subtitle1" component="div">
            Users are simply required to submit an X-ray image, the AI will the make predictions from the submitted data. Affected Areas of the X-ray are indicated for further analysis. The images below give a breif description of the process.
          </Typography>
        </Grid>

        
        <Grid item md={4} xs={12} sm={4}>
          <Paper style={{ height: '30%', width: '100%' }}>
            <Image
              src={ image1 }
            />
            <Paper >
              <Typography className={classes.captions}>
                Submitted X-ray Image For Classification For The Listed Conditions
              </Typography>
            </Paper>
          </Paper>
        </Grid>
      
          <Grid item md={4} xs={12} sm={4}>
            <Paper style={{ height: '30%', width: '100%' }}>
              <Image
                src={ image1 }
              />
              <Paper >
                <Typography className={classes.captions}>
                  Image Classified And Affected Areas Indicated
                </Typography>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
    </Container>
  );
};

export default Home;
