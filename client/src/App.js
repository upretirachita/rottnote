import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import RestApi from './RestApi';
import Note from './Note';

let authenticated = false;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: null,
      userEmail: null,
      notes: [],
      modifyIndex: -1
    };
  }

  successGoogle = (response) => {
    console.log(response);
    authenticated = true;
    this.setState({ userName: response.profileObj.name,
      userEmail: response.profileObj.email });
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
            <h2>Welcome to rottnote, {this.state.userName}!</h2>
          </div>
          <p className="App-intro">
            <input type="text" />
            <button type="button" onClick={this.addNote}>Add note</button>
          </p>
          {this.state.notes.map((note, index) => {
            return(
              <Note
                onModify={this.modifyClicked}
                index={index}
                note={note}
                // eslint-disable-next-line
                modify={index == this.state.modifyIndex}
              />
            );
          })}
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
  addNote = () => {
    let text = document.querySelector("input").value;
    const newNote = { text };
    const newNotes = this.state.notes.concat(newNote);
    this.setState({ notes: newNotes });
    const newState = {
      userEmail: this.state.userEmail,
      notes: newNotes
    };
    RestApi.postNewNote(newState);
  }

  modifyClicked = (index) => {
    this.setState({ modifyIndex: index });
    console.log(index);
  }
}

export default App;
