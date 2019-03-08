import React, { Component } from 'react';
import WeatherWidget from './components/WeatherWidget'
import { connect } from 'react-redux'
import {fetchData} from './store/actions/dataAction'
import Autocomplete from "./components/Autocomplete";

class App extends Component { 
  
  handleDateChange = (param) => {
    this.props.startLoading();
    this.props.setDate(param.target.value);
    this.props.fetchData();
  }

  handleLocationSubmit = (param) => {
    this.props.startLoading();
    this.props.setLocation(param.name)
    this.props.fetchData();
  }

  render() {
    const {data} = this.props;

    return (
      <div className="App">
        <h1>Dark Sky API Weather Implementation</h1>
        <p>Please select your desired location and optionally the date:</p>
        <div className="params">
          <Autocomplete onPlaceChanged={this.handleLocationSubmit.bind(this)} />
          <input type="date" id="date" onChange={this.handleDateChange.bind(this)} className="date" />
        </div>
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
    fetchData: (data) => dispatch(fetchData()),
    startLoading: () => dispatch({ type: 'START_LOADING', data: {} }),
    setDate: (date) => dispatch({ type: 'SET_DATE', data: date }),
    setLocation: (location) => dispatch({ type: 'SET_LOCATION', data: location })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
