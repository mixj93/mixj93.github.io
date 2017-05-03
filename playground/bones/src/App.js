import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.getRandomEp = this.getRandomEp.bind(this);

    this.getRandomEp();
  }

  getRandomEp(season) {
    if(self.fetch) {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer keyV7hmX233PkZJwM');

      var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
      };

      var myRequest = new Request('https://api.airtable.com/v0/apptC71YD1lJupWlG/Bones');

      fetch(myRequest,myInit).then(function(response) {
        return response.json();
      }).then(function(response){
        console.log(response);
      });
    } else {
      alert("浏览器版本过低，推荐使用 Chrome 浏览器。");
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://mixj93.com/images/bones-logo.jpg" className="App-logo" alt="logo" />
          <h2>Random Bones Episode!</h2>
        </div>
      </div>
    );
  }
}

export default App;
