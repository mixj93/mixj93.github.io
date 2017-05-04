import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      episodes: [],
      episode: 0,
    };

    this.getEpisodes = this.getEpisodes.bind(this);
    this.getRandom = this.getRandom.bind(this);

    this.getEpisodes();
  }

  getEpisodes() {
    if(self.fetch) {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer keyV7hmX233PkZJwM');

      var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
      };

      var myRequest = new Request('https://api.airtable.com/v0/appqnI0EdKMw2xNrN/bones');
      var that = this
      fetch(myRequest,myInit).then(function(response) {
        return response.json();
      }).then(function(response){
        that.setState({episodes: response.records});
        that.getRandom();
        that.setState({loading: false});
      });
    } else {
      alert("浏览器版本过低，推荐使用 Chrome 浏览器。");
    }
  }

  getRandom() {
    var len = this.state.episodes.length;
    this.setState({episode: Math.floor(Math.random() * len)});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://mixj93.com/images/bones-logo.jpg" className="App-logo" alt="logo" />
          <h2>Random Bones Episode!</h2>
        </div>
        {this.state.loading &&
          <div className="loading">
            <div className="blob blob-0"></div>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
            <div className="blob blob-4"></div>
            <div className="blob blob-5"></div>
          </div>
        }
        {!this.state.loading &&
          <div style={{textAlign: "center"}}>
            <h3>
              Season {this.state.episodes[this.state.episode].fields.season} Episode {this.state.episodes[this.state.episode].fields.episode}
              <i className="date">{this.state.episodes[this.state.episode].fields.date}</i>
            </h3>
            <h2>{this.state.episodes[this.state.episode].fields.title}</h2>
            <img src={this.state.episodes[this.state.episode].fields.thumbnail} alt={this.state.episodes[this.state.episode].fields.title} />
            <p style={{maxWidth: "600px", margin: "20px auto"}}>{this.state.episodes[this.state.episode].fields.description}</p>
            <button className="refresh-btn" onClick={this.getRandom}>Refresh</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
