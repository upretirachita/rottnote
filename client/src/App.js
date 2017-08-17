import React, { Component } from 'react';
import logo from './logo1.png';
import './App.css';
import GoogleLogin from 'react-google-login';
import RestApi from './RestApi';
import Note from './Note';
import DeleteDialog from './DeleteDialog';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      userEmail: null,
      nextId: 1,
      notes: null,
      modifyId: null,
      isDeleteDialogVisible: false,
      deleteDialogText: '',
      deleteDialogIndex: null
    };
  }

  successGoogle = response => {
    let userName = response.profileObj.name;
    let userEmail = response.profileObj.email;
    this.setState({ userName, userEmail });
    RestApi.fetchNotes(userEmail, this.notesFetched);
  };

  failureGoogle = response => {
    console.log(response);
  };

  render() {
    if (this.state.userEmail) {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>
              Welcome to rottnote, {this.state.userName}!
            </h2>
          </div>
          <DeleteDialog
            isVisible={this.state.isDeleteDialogVisible}
            text={this.state.deleteDialogText}
            onPositive={this.deleteConfirmed}
            onNegative={this.onDeleteDialogNegative}
          />
          {this.state.notes
            ? <p className="App-intro">
                <input type="text" placeholder="Type your note here!"/>
                <button type="button" onClick={this.addNote}>
                  Add note
                </button>
              </p>
            : 'Loading...'}
          {this.state.notes
            ? this.state.notes.map((note, index) => {
                return (
                  <Note
                    key={note.id}
                    index={index}
                    note={note}
                    modify={note.id === this.state.modifyId}
                    modifyDisabled={this.state.modifyId !== null}
                    onModify={this.modifyClicked}
                    onSave={this.saveClicked}
                    onCancel={this.cancelClicked}
                    onDelete={this.deleteClicked}
                    onMarkAsImportant={this.markNoteAsImportantClicked}
                  />
                );
              })
            : ''}
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>rottnote</h1>
<<<<<<< HEAD
			
            <GoogleLogin
              clientId="481779456855-ruamb5psvnjva1auqp6q3f7a0u9qatam.apps.googleusercontent.com" className="googleLogin"
              onSuccess={this.successGoogle}
              onFailure={this.failureGoogle}
            >
              <span >Login with Google</span>
            </GoogleLogin>
          </div>
         
        );
=======
          <GoogleLogin
            clientId="481779456855-ruamb5psvnjva1auqp6q3f7a0u9qatam.apps.googleusercontent.com"
            onSuccess={this.successGoogle}
            onFailure={this.failureGoogle}
          >
            <span>Login with Google</span>
          </GoogleLogin>
        </div>
      );
>>>>>>> 0c60806fb5c6b8400983a035b3a15b4ea2875886
    }
  }

  addNote = () => {
    let text = document.querySelector('input').value.trim();
    if (text.trim().length > 0) {
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
    document.querySelector('input').value ='';
  };

  testDialog = () => {
    this.setState({
      isDeleteDialogVisible: !this.state.isDeleteDialogVisible
    });
  };

  onDeleteDialogNegative = () => {
    this.setState({
      isDeleteDialogVisible: !this.state.isDeleteDialogVisible,
      deleteDialogText: '',
      deleteDialogIndex: null
    });
  };

  modifyClicked = index => {
    this.setState({ modifyId: this.state.notes[index].id });
  };

  saveClicked = (index, text) => {
    let array = this.state.notes.slice();
    array[index].text = text;
    this.setState({ notes: array, modifyId: null });

    const newState = {
      userEmail: this.state.userEmail,
      notes: array
    };
    RestApi.postNotes(newState);
  };

  cancelClicked = () => {
    this.setState({ modifyId: null });
  };

  deleteConfirmed = () => {
    const index = this.state.deleteDialogIndex;
    let array = this.state.notes.slice();
    array.splice(index, 1);
    this.setState({
      notes: array,
      isDeleteDialogVisible: !this.state.isDeleteDialogVisible,
      deleteDialogText: '',
      deleteDialogIndex: -1
    });

    const newState = {
      userEmail: this.state.userEmail,
      notes: array
    };
    RestApi.postNotes(newState);
  };

  deleteClicked = index => {
    const note = this.state.notes[index].text;
    this.setState({
      isDeleteDialogVisible: !this.state.isDeleteDialogVisible,
      deleteDialogText: note,
      deleteDialogIndex: index
    });
  };

  markNoteAsImportantClicked = index => {
    let array = this.state.notes.slice();
    if (array[index].isImportant === undefined) {
      array[index].isImportant = true;
    } else {
      array[index].isImportant = !array[index].isImportant;
    }
    array = this.sortNotes(array);
    this.setState({
      notes: array
    });
    const newState = {
      userEmail: this.state.userEmail,
      notes: array
    };
    RestApi.postNotes(newState);
  };

  sortNotes = notes => {
    notes.sort((a, b) => {
      if (a.isImportant && !b.isImportant) {
        return -1;
      } else if (b.isImportant && !a.isImportant) {
        return 1;
      } else {
        return a.id - b.id;
      }
    });
    return notes;
  };

  notesFetched = ({ nextId = 1, notes = [] }) => {
    this.setState({ nextId, notes });
  };
}

export default App;
