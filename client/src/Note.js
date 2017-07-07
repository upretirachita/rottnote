import React, { Component } from 'react';

class Note extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }


  render() {
    if(this.props.modify)
      return(
        <div>
          <input type="text" value={this.props.note.text}/>
          <button
            type="button"
            onClick={() => this.props.onModify(this.props.index)}
            >Modify</button>
        </div>
      );
    else
      return(
        <div>
          {this.props.note.text}
          <button
            type="button"
            onClick={() => this.props.onModify(this.props.index)}
            >Modify</button>
          <button type="button"
            onClick={() => this.props.onDelete(this.props.index)}
            >Delete</button>
        </div>
      );
  }
}

export default Note;
