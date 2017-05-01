import React, { Component } from 'react';
import InputApp from './input-area/input-area';
import CodePreview from './code-preview/code-preview';
import Options from './options/options';

class App extends Component {
  render() {
    return (
      <div className="App" style={{"marginTop": "50px"}}>
        <h1 className="head" style={{"marginBottom": "50px", "textAlign": "center"}}>ASS Drawing Parse Int</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <InputApp input={this.props.input} />
              {this.props.input}
            </div>
            <div className="col-md-2">
              <Options type={this.props.type} />
              {this.props.type}
            </div>
            <div className="col-md-5">
              <CodePreview output={this.props.output} />
              {this.props.output}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
