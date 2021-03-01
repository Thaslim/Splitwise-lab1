import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Landing from './components/landingPage/Landing';
import Navbar from './components/landingPage/Navbar';

// Redux
import store from './store';
import Alert from './components/landingPage/Alert';

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <Route exact path='/' component={Landing} />

        <Alert />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </>
    </Router>
  </Provider>
);

export default App;
