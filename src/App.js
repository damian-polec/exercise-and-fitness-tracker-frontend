import React, { Component } from 'react';

import Auth from './pages/Auth/Auth';
import SignUp from './pages/Auth/SignUp/Signup';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Auth>
          <SignUp /> 
        </Auth>
      </div>
    );
  }
}

export default App;
