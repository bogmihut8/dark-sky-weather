const initState = {
  city: "",
  country: "",
  temp: 0,
  summary: '',
  date: ''
}

const rootReducer = (state = initState, action) => {
   switch (action.type) {
    case 'FETCHED_DATA':
      console.log("data fetched", {...state, ...action.data});
      return {...state, ...action.data};
    default:
      return state;
  }
};

export default rootReducer;