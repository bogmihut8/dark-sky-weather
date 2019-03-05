import React, { Component } from 'react';
import WeatherWidget from './components/WeatherWidget'
import { connect } from 'react-redux'
import {fetchData} from './store/actions/dataAction'

class App extends Component { 
  state = {
    location: "Cluj-Napoca",
    date: ""
  }
  
  handleChange = (e) => {
   this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchData(this.state); 
  }
  
  componentWillMount(){
    this.props.fetchData(this.state);  
  }

  render() {
    const {data} = this.props;
    
    return (
      <div className="App">
        <h1>Dark Sky API Weather Implementation</h1>
        <p>Please select your desired location and optionally the date:</p>
        <form onSubmit={this.handleSubmit} className="params">
          <input type="text" id="location" onChange={this.handleChange} className="location" placeholder="New York, Bucharest etc" />
          <input type="date" id="date" onChange={this.handleChange} className="date" />
          <input type="submit" value="Submit" id="submit" />
        </form>
        <p>The date can be from the past (observed) or from the future (forcasted)</p>
        <WeatherWidget data={data}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => dispatch(fetchData(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
