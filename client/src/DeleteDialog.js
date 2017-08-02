import React from 'react';

const DeleteDialog = ({...props}) => {

    const backdropStyle = {
      position: 'fixed',
      width: "100%",
      height: "100%",
      top: 100,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.3)'
    };

    const dialogStyle = {
      backgroundColor: '#FFF',
      borderRadius: 5,
      maxWidth: 300,
      minHeight: 150,
      margin: '0 auto',
      padding: 20
    };

    if (!props.isVisible) {
      return null;
    }

    return(
      <div className="dialogBackdrop" style={backdropStyle}>
        <div className="dialogBody" style={dialogStyle}>
          <h4>Confirm action</h4>
          <p>{props.text}</p>

          <div className="dialogFooter">
            <button onClick={props.onPositive}>
              Yes
            </button>
            <button onClick={props.onNegative}>
              No
            </button>
          </div>
        </div>
      </div>
    );

}

export default DeleteDialog;
