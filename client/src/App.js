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
      nextId: 1,
      notes: null,
      modifyIndex: -1
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
          {this.state.notes ? <p className="App-intro">
            <input type="text" />
            <button type="button" onClick={this.addNote}>Add note</button>
          </p> : "Loading..."}
          {this.state.notes ? this.state.notes.map((note, index) => {
            return(
              <Note
                onModify={this.modifyClicked}
                key={note.id}
                index={index}
                note={note}
                // eslint-disable-next-line
                modify={index == this.state.modifyIndex}

                // save-line
                onSave={this.saveClicked}
                onCancel={this.cancelClicked}
                // eslint-disable-next-line
                save={index == this.state.saveIndex}

                onDelete={this.deleteClicked}
              />
            );
          }) : "" }
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
    let id = this.state.nextId;
    let nextId = this.state.nextId;
    nextId++;
    const newNote = { id, text };
    const newNotes = this.state.notes.concat(newNote);
    this.setState({ nextId: nextId, notes: newNotes });
    const newState = {
      userEmail: this.state.userEmail,
      nextId: nextId,
      notes: newNotes
    };
    RestApi.postNotes(newState);
  }

  modifyClicked = (index) => {
    this.setState({ modifyIndex: index });
    console.log(index);
  }

  saveClicked = (index, text) => {
    let array = this.state.notes.slice();
    array[index] = text;
    this.setState({ notes: array, modifyIndex: -1 });
    console.log(index);
    const newState = {
      userEmail: this.state.userEmail,
      notes: array
    };
    RestApi.postNotes(newState);
  }

  cancelClicked = () => {
    this.setState({ modifyIndex: -1 });
  }

  deleteClicked = (index) => {
    var array = this.state.notes.slice();
    array.splice(index, 1);
    if (index < this.state.modifyIndex) {
      // the note under modification moves up as a note above it got deleted
      const modifyIndex = this.state.modifyIndex - 1;
      this.setState({ notes: array, modifyIndex });
    } else {
      this.setState({ notes: array });
    }

    const newState = {
      userEmail: this.state.userEmail,
      notes: array
    };
    RestApi.postNotes(newState);
  }

  notesFetched = ({ nextId = 1, notes = [] }) => {
    console.log("notesFetched() called");
    this.setState({ nextId, notes });
  }
}

export default App;
