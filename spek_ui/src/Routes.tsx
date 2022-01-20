import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import { Home, Login, SignUp, NLabs, PrivateRoute, NavBar, Footer, MakePrediction, Result } from './views';
import { Admin } from './admin';
import { logout } from './utils/auth';
import { ImageProvider } from './contextManagers/imagesContext';

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // centerContent: {}
   
}));

export const Routes: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>

        <div className={classes.app}>
          <header className={classes.header}>
            <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route
                path="/logout"
                render={() => {
                  logout();
                  history.push('/');
                  return null;
                }}
              />
            <PrivateRoute path="/nlabs" component={NLabs} />
            <ImageProvider>
              <PrivateRoute path="/makeprediction" component={MakePrediction} />
              <PrivateRoute path="/result" component={Result} />
            </ImageProvider>
          </header>
        </div>
      </Switch>
      <Footer />
    </>
  );
};
