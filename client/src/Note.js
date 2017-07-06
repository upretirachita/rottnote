import React, { Component } from 'react';

class Note extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <div>
        {this.props.note.text}
        <button type="button" onClick={this.props.onModify}>Delete</button>
      </div>
    );
  }
}

export default Note;
