import React, { Component } from 'react';
import WeatherWidget from './components/WeatherWidget'
import { connect } from 'react-redux'
import {fetchData} from './store/actions/dataAction'

class App extends Component { 
  state = {
    location: "Cluj-Napoca"
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
        <form onSubmit={this.handleSubmit} className="col s12 m8 offset-m2 white">
          <input type="text" id="location" onChange={this.handleChange} className="location" placeholder="New York, Bucharest etc" />
        </form>
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
