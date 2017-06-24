import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import RestApi from './RestApi';

let authenticated = false;
let noteArray = [];

class App extends Component {

  successGoogle = (response) => {
    console.log(response);
    authenticated = true;
    this.forceUpdate();
  }

  failureGoogle = (response) => {
    console.log(response);
  }


  render() {
    if(authenticated) {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            <input type="text" />
            <button type="button" onClick={addNote}>Add note</button>
          </p>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <h1>rottnote</h1>
            <GoogleLogin
              clientId="481779456855-ruamb5psvnjva1auqp6q3f7a0u9qatam.apps.googleusercontent.com"
              onSuccess={this.successGoogle}
              onFailure={this.failureGoogle}
            >
              <span>Login with Google</span>
            </GoogleLogin>
          </div>
        );
    }
  }
}

function addNote() {
  let text = document.querySelector("input").value;
  const newNote = { text };
  noteArray.push(newNote);
  RestApi.postNewNote(newNote);
};

export default App;
