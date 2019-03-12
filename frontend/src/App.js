import React, { Component } from 'react';
import WeatherWidget from './components/WeatherWidget'
import { connect } from 'react-redux'
import {fetchData, currentLocationData} from './store/actions/dataAction'
import Autocomplete from "./components/Autocomplete";

class App extends Component { 
  
  handleDateChange = (param) => {
    this.props.startLoading();
    if(!param.target.value) {
      this.props.setDate(this.unixDateToday());
      this.props.fetchData();
    }
    else if(this.restrictPastDate() <= new Date(param.target.value).toISOString().slice(0,10)) {
      this.props.setDate(parseInt(new Date(param.target.value).getTime() / 1000));
      this.props.fetchData();
    }
    else {
      this.props.dispatchError();
    }
  }

  handleLocationSubmit = (param) => {
    let countryCode;
    if(param.address_components) {
      for (var value of param.address_components) {
        if (value.types.includes('country')) {
          countryCode = value.short_name;
        }
      }
      this.props.startLoading();
      this.props.setLocation(param.name, countryCode)
      this.props.fetchData();
    }
  }
  
  restrictPastDate() {
    const priordate = new Date();
    priordate.setDate(new Date().getDate()-30);
    return priordate.toISOString().slice(0,10);
  }

  unixDateToday() {
    return parseInt(new Date().getTime() / 1000);
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
    (position) => {
       const date = this.unixDateToday();
       this.props.startLoading();
       this.props.currentLocationData(position.coords.latitude, position.coords.longitude, date);
     }
    )
  }

  render() {
    const {data} = this.props;

    return (
      <div className="App">
        <h1>Dark Sky API Weather Implementation</h1>
        <p>Please select your desired location and optionally the date:</p>
        <div className="params">
          <Autocomplete onPlaceChanged={this.handleLocationSubmit.bind(this)} />
          <input type="date" placeholder="Date" id="date" onChange={this.handleDateChange.bind(this)} className="date" min={this.restrictPastDate()}/>
        </div>
        <p>The date can be from the past 30 days (observed) or from the future (forcasted)</p>
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
    fetchData: () => dispatch(fetchData()),
    currentLocationData: (lat, long, date) => dispatch(currentLocationData(lat, long, date)),
    startLoading: () => dispatch({ type: 'START_LOADING', data: {} }),
    setDate: (date) => dispatch({ type: 'SET_DATE', data: date }),
    setLocation: (location, countryCode) => dispatch({ type: 'SET_LOCATION', data: {location: location, countryCode: countryCode} }),
    dispatchError: () => dispatch({ type: 'ERROR_OCC', data: {err: 'Something went wrong. Selected date might be too old.'} })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
