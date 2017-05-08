import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      record: {},
      episode: 0,
      season: "all",
    };

    this.getEpisode = this.getEpisode.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.getRandom();
  }

  getEpisode() {
    if(self.fetch) {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer keyV7hmX233PkZJwM');

      var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
      };

      this.setState({loading: true});
      var myRequest = new Request('https://api.airtable.com/v0/appqnI0EdKMw2xNrN/bones?filterByFormula=%7Bindex%7D%20%3D%20' + this.state.episode);
      var that = this
      fetch(myRequest,myInit).then(function(response) {
        return response.json();
      }).then(function(response){
        that.setState({record: response.records[0], loading: false});
      });
    } else {
      alert("浏览器版本过低，推荐使用 Chrome 浏览器。");
    }
  }

  getRandom() {
    var min;
    var max;
    var seasonArr = [22, 21, 15, 26, 22, 23, 13, 24, 24, 22, 22, 12];

    if (this.state.season === "all") {
      min = 1;
      max = 246;
    } else {
      var season = parseInt(this.state.season, 10);
      max = 0;
      for (var i = 0; i < season; i++) {
        max += seasonArr[i];
      }
      min = max - seasonArr[season - 1] + 1
    }

    var randomEp = Math.floor(Math.random() * (max - min)) + min;

    this.setState({episode: randomEp}, function() {
      this.getEpisode();
    });
  }

  handleSelectChange(event) {
    this.setState({season: event.target.value}, function() {
      this.getRandom();
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://mixj93.com/images/bones-logo.jpg" className="App-logo" alt="logo" />
          <h2>Random Bones Episode!</h2>
          <label>
            Choose season: 
            <select value={this.state.season} onChange={this.handleSelectChange}>
              <option value="all">All Seasons</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </label>
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
              Season {this.state.record.fields.season} Episode {this.state.record.fields.episode}
              <i className="date">{this.state.record.fields.date}</i>
            </h3>
            <h2>{this.state.record.fields.title}</h2>
            <img src={this.state.record.fields.thumbnail} alt={this.state.record.fields.title} />
            <p style={{maxWidth: "600px", margin: "20px auto"}}>{this.state.record.fields.description}</p>
            <button className="refresh-btn" onClick={this.getRandom}>Refresh</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
