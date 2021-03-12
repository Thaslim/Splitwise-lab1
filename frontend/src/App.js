import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Landing from './components/landingPage/Landing';
import Navbar from './components/landingPage/Navbar';
import Profile from './components/user/Profile';
import CreateGroup from './components/groups/CreateGroup';
import PrivateRoute from './components/routing/PrivateRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
// Redux
import store from './store';
import Alert from './components/landingPage/Alert';
import { loadUser } from './actions/auth';
import setToken from './utils/setToken';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={Landing} />

          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute exact path='/me' component={Profile} />
            <PrivateRoute exact path='/new-group' component={CreateGroup} />
            <PrivateRoute exact path='/dashboard' component={DashboardLayout} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
