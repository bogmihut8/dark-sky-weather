import axios from 'axios';

export const fetchData = (data) => {
  return (dispatch, getState) => {
    // make async call to database
    console.log("In action: " + data.location + " with date: " + data.date);
    axios
      .get(`/data`, {params: {location: data.location, date: data.date}})
      .then(res => {
        dispatch({ type: 'FETCHED_DATA', data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    ;
  }
};