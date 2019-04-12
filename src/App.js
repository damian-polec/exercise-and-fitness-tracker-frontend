import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import SignUp from './pages/Auth/SignUp/SignUp';
import SignIn from './pages/Auth/SignIn/SignIn';
import ExerciseTracker from './pages/ExerciseTracker/ExerciseTracker';
import './App.scss';

class App extends Component {
  state = {

    isAuth: false,
    token: null,
    userId: null
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
    fetch('http://localhost:8080/auth/signup', {
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
      this.setState({isAuth: false});
      this.props.history.replace('/');
    }).catch(err => console.log(err));
  };

  onLoginHandler = (event, formData) => {
    event.preventDefault();
    fetch('http://localhost:8080/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => {
      return res.json()
    }).then(json => {
      this.setState({
        isAuth: true,
        token: json.token,
        userId: json.userId
      });
      localStorage.setItem('token', json.token);
      localStorage.setItem('userId', json.userId);
    }).catch(err => console.log(err));
  };

  render() {
    let routes = (
      <Auth>
        <Switch>
          <Route
            path='/'
            exact
            render={props => (
              <SignIn 
                {...props}
                onLogin={this.onLoginHandler}
              />
            )}
          />
          <Route
            path='/signup'
            exact
            render={props => (
              <SignUp
                {...props}
                onSignUp={this.onSignUpHandler} 
              /> 
            )} 
          />
          <Redirect to='/' />
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
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
