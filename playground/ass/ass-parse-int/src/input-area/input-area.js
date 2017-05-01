import React, { Component } from 'react';
import './input-area.css';

class InputArea extends Component {
  render() {
    return (
      <div className="InputArea">
        <textarea name="input-textarea" className="form-control" rows="5"></textarea>
      </div>
    );
  }
}

export default InputArea;
