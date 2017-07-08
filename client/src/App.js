import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import RestApi from './RestApi';
import Note from './Note';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: null,
      userEmail: null,
      notes: [],
      modifyIndex: -1,
      saveIndex: -1,
      deleteIndex: -1
    };
  }

  successGoogle = (response) => {
    console.log(response);
    let userName = response.profileObj.name;
    let userEmail = response.profileObj.email;
    this.setState({ userName, userEmail });
    RestApi.fetchNotes(userEmail, this.notesFetched);
  }

  failureGoogle = (response) => {
    console.log(response);
  }


  render() {
    if(this.state.userEmail) {
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
                modify={index == this.state.modifyIndex}

                // save-line
                onSave={this.saveClicked}
                index={index}
                note={note}
                save={index == this.state.saveIndex}

				// eslint-disable-next-line
                onDelete={this.deleteClicked}

                index={index}
                note={note}
                delete={index == this.state.deleteIndex}
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
    RestApi.postNotes(newState);
  }

  modifyClicked = (index) => {
    this.setState({ modifyIndex: index });
    console.log(index);
  }
   saveClicked = (index) => {
    this.setState({ saveIndex: index });
    console.log(index);
  }

  deleteClicked = (index) => {
    var array = this.state.notes.slice();
    array.splice(index, 1);
    this.setState({ notes: array });

    const newState = {
      userEmail: this.state.userEmail,
      notes: array
    };
    RestApi.postNotes(newState);
  }

  notesFetched = notes => this.setState({ notes });
}

export default App;
