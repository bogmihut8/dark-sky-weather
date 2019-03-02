import axios from 'axios';

export const fetchData = (data) => {
  return (dispatch, getState) => {
    // make async call to database
    axios
      .get(`/data`)
      .then(res => {
        dispatch({ type: 'FETCHED_DATA', data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    ;
  }
};