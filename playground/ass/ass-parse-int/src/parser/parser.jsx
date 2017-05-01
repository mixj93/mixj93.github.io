import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './parse.css';

class Parser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: '',
      type: 'round'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.generate = this.generate.bind(this);
  }

  handleTextAreaChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleInputChange(event) {
    const value = event.target.value;

    this.setState({
      type: value
    });
  }

  generate() {
    const reDrawing = /^(((m|n|l|b|s|p|c)\s)((-?\d+(\.\d+)?)\s?)+)+$/;
    const reInt = /^-?\d+$/;
    const reFloat = /^-?\d+\.\d+$/
    
    if (!reDrawing.test(this.state.input)) {
      alert("输入的 ASS Drawing 格式不正确，请检查后重试。");
      return;
    }

    const arr = this.state.input.split(" ");

    for (var i = 0; i < arr.length; i ++) {
      if (reInt.test(arr[i]) || reFloat.test(arr[i])) {
        if (this.state.type === 'round') {
          arr[i] = Math.round(arr[i]);
        } else if (this.state.type === 'round10') {
          arr[i] = Math.round(arr[i]*10);
        } else if (this.state.type === 'round100') {
          arr[i] = Math.round(arr[i]*100);
        }
      }
    }

    this.setState({
      output: arr.join(" ")
    })
  }

  render() {
    return (
      <div className="Parser" style={{"marginTop": "50px"}}>
        <h1 className="head" style={{"marginBottom": "50px", "textAlign": "center"}}>ASS Drawing Parse Int</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="InputArea">
                <textarea value={this.state.input} name="input-textarea" className="form-control" onChange={this.handleTextAreaChange}></textarea>
              </div>
            </div>
            <div className="col-md-2">
              <div className="Options">
                <label><input name="type" type="radio" onChange={this.handleInputChange} value="round" checked={this.state.type === 'round'} /> 直接四舍五入</label>
                <label><input name="type" type="radio" onChange={this.handleInputChange} value="round10" checked={this.state.type === 'round10'} /> 四舍五入（误差1/10）</label>
                <label><input name="type" type="radio" onChange={this.handleInputChange} value="round100" checked={this.state.type === 'round100'} /> 四舍五入（误差1/100）</label>
                <button type="button" className="btn btn-info" onClick={this.generate}>生成</button>
              </div>
            </div>
            <div className="col-md-5">
              <div className="CodePreview">
                <pre>{this.state.output}</pre>
                <CopyToClipboard text={this.state.output}
                  onCopy={() => alert("代码已复制至剪贴板")}>
                  <button id="copyBtn" className="btn btn-success copy-btn">复制</button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Parser;
