import axios from 'axios';

export const fetchData = () => {
  return (dispatch, getState) => {
    const state = getState();

    axios
      .get(`/data`, {params: {location: state.location, countryCode: state.countryCode, date: state.date}})
      .then(res => {
        dispatch({ type: 'FETCHED_DATA', data: res.data });
      })
      .catch(err => {
        dispatch({ type: 'ERROR_OCC', data: {err: 'Something went wrong. Make sure the introduced values are valid.'} });
      });
    ;
  }
};

export const currentLocationData = (lat, long, date) => {
  return (dispatch, getState) => {
    axios
      .get(`/currentLocation`, {params: {lat: lat, long: long, date: date}})
      .then(res => {
        dispatch({ type: 'SET_DATE', data: date });
        dispatch({ type: 'SET_LOCATION', data: {location: res.data.location, countryCode: res.data.countryCode}});
        dispatch({ type: 'FETCHED_DATA', data: res.data });
      })
      .catch(err => {
        dispatch({ type: 'ERROR_OCC', data: {err: 'Something went wrong. Try again'} });
      });
    ;
  }
};