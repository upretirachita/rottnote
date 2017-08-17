import React, { Component } from 'react';
import AutoLinkText from 'react-autolink-text';

class Note extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);

    this.state = { text: this.props.note.text };
  }

  render() {
    if (this.props.modify)
      return (
        <div>
          <input 
            type="text"
            value={this.state.text}
            onChange={event => this.setState({ text: event.target.value })}
          />
          <button
            type="button"
            onClick={() => this.props.onSave(this.props.index, this.state.text)}
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ text: this.props.note.text }); // discard changes
              this.props.onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      );
    else
      return (
        <div>
          <AutoLinkText text={this.props.note.text} />
          <button
            type="button"
            disabled={this.props.modifyDisabled}
            onClick={() => this.props.onModify(this.props.index)}
          >
            Modify
          </button>
          <button
            type="button"
            onClick={() => this.props.onDelete(this.props.index)}
          >
            Delete
          </button>
          Important?
          <input
            type="checkbox"
            checked={!!this.props.note.isImportant}
            onChange={() => this.props.onMarkAsImportant(this.props.index)} />
        </div>
      );
  }
}

export default Note;
