import axios from 'axios';

export const fetchData = (data) => {
  return (dispatch, getState) => {
    // make async call to database
    const state = getState();
    axios
      .get(`/data`, {params: {location: state.location, date: state.date}})
      .then(res => {
        dispatch({ type: 'FETCHED_DATA', data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    ;
  }
};