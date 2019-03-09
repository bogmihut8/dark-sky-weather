import axios from 'axios';

export const fetchData = () => {
  return (dispatch, getState) => {
    // make async call to database
    const state = getState();
    axios
      .get(`/data`, {params: {location: state.location, countryCode: state.countryCode, date: state.date}})
      .then(res => {
        dispatch({ type: 'FETCHED_DATA', data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    ;
  }
};

export const currentLocationData = (lat, long, date) => {
  return (dispatch, getState) => {
    // make async call to database
    axios
      .get(`/currentLocation`, {params: {lat: lat, long: long, date: date}})
      .then(res => {
        dispatch({ type: 'FETCHED_DATA', data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    ;
  }
};