import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import SignIn from './pages/Auth/SignIn/SignIn';
import SignUp from './pages/Auth/SignUp/SignUp';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import ExerciseTracker from './pages/ExerciseTracker/ExerciseTracker';
import Nav from './components/Nav/Nav';
import './App.scss';

const URI ='https://exercise-and-fitness-tracker.herokuapp.com/';

class App extends Component {
  state = {
    error: null,
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if(!token) {
      return;
    }
    const userId = localStorage.getItem('userId');
    this.setState({isAuth: true, token: token, userId: userId});
  }

  onSignUpHandler = (event, formData) => {
    event.preventDefault();
    this.setState({ authLoading: true })
    fetch(`${URI}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => {
      return res.json()
    }).then(json => {
      if(json.errors) {
        throw new Error('User creation failed');
      }
      this.setState({
        isAuth: false,
        authLoading: false
      });
      this.props.history.replace('/login');
    }).catch(err =>{
      this.setState({
        authLoading: false,
        isAuth: false,
        error: err
      })
    });
  };

  onLoginHandler = (event, formData) => {
    event.preventDefault();
    this.setState({ authLoading: true })
    fetch(`${URI}auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => {
      return res.json()
    }).then(json => {
      if(json.errors && json.errors.statusCode === 422) {
        throw new Error(
          'Validation Failed. User doesn\'t exist'
        );
      }
      if(json.errors && json.errors.statusCode === 401) {
        throw new Error(
          'Incorrect password'
        )
      }
      localStorage.setItem('token', json.token);
      localStorage.setItem('userId', json.userId);
      this.setState({
        authLoading: false,
        isAuth: true,
        token: json.token,
        userId: json.userId
      });
    }).catch(err => {
      this.setState({
        authLoading: false,
        isAuth: false,
        error: err
      })
    });
  };

  onLogoutHandler = () => {
    this.setState({ isAuth: false, token: null, userId: null})
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  errorHandler = () => {
    this.setState({ error: null})
  }

  render() {
    let routes = (
      <Auth>
        <Switch>
          <Route
            path='/signup'
            exact
            render={props => (
              <SignUp 
                {...props}
                isLoading={this.state.authLoading}
                onSignUp={this.onSignUpHandler} 
              />
            )}
          />
          <Route
            path='/login'
            exact
            render={props => (
              <SignIn
                {...props}
                isLoading={this.state.authLoading}
                onLogin={this.onLoginHandler} 
              /> 
            )} 
          />
          <Redirect to='/login' />
        </Switch>
      </Auth>
    );

    if(this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path='/'
            exact
            render={props => (
              <ExerciseTracker
                noteHandler={this.onNoteHandler}
                logoutHandler={this.onLogoutHandler}
                {...props}
              />
            )} 
          />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Nav 
          isAuth={this.state.isAuth}
          onLogout={this.onLogoutHandler}/>
        <ErrorHandler
          error={this.state.error}
          onHandle={this.errorHandler} />
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
