import React, { Component } from 'react';
import './notes.css';

function NoteInput(props) {
  return (
      <div className="section group">
        <div>
          <input type="text" placeholder="Title" id="noteTitle" />
        </div>
        <div>
          <input type="text" placeholder="Note" id="noteText" />
        </div>
        <div>
          <button type="button" onClick={props.onClick}>
            {props.btnText}
          </button>
        </div>
      </div>
  );
}

class NoticeBoard extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      numNotes: 0,
    };
  }

  handleClick() {
    let noteTitle = document.getElementById('noteTitle').value;
    let noteText = document.getElementById('noteText').value;
    if (noteText === '') {
      return;
    }
    const notes = this.state.notes.slice();
    notes.unshift({title: noteTitle, text: noteText});
    this.setState({
      notes: notes,
      numNotes: notes.length,
    });
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteText').value = '';
  }

  render() {
    return (
      <div className="noticeBoard">
        <div className="logo-header">
          <h1>Rottnotes</h1>
        </div>
        <div className="wrapper">
          <div className="section group">
            <NoteInput
              btnText={"Add Note"}
              onClick={() => this.handleClick()}
            />
          </div>
        </div>
        <div className="note-wrapper">
          {this.state.notes.map(note => {
            return <div key={this.state.notes.indexOf(note)} className="note"><h2>{note.title}</h2><p>{note.text}</p></div>
          })}
        </div>
      </div>
    );
  }
}

export default NoticeBoard;
