import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
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
    );
  }
}

function addNote() {
  let noteText = document.querySelector("input").value;
  console.log(noteText);
  sendNoteToServer(noteText);
};

function sendNoteToServer(text) {
  const newNote = { text: text };
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
      if ((xhr.readyState === 4) && (xhr.status >= 500)) {
        console.log("Rottnote server error. Be sure to start the rottnote development environment by doing 'npm install' and 'npm start' at the TOP level! 'npm start' at TOP level will start webpack dev server to port 3000 and Node API backend to port 3001. NOTE: to avoid any CORS issues, the webpack dev server (at port 3000) is configured to proxy all requests to the '/notes' endpoint to the Node API backend (i.e. to port 3001)");
      }
  };
  xhr.open("POST", "notes", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(newNote));
};
export default App;
