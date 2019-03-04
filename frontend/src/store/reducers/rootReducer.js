const initState = {
  city: "",
  summary: '',
  date: '',
  currently: {
    temperature: 0,
    summary: ''
  }
}

const rootReducer = (state = initState, action) => {
   switch (action.type) {
    case 'FETCHED_DATA':
      console.log("data fetched", {...state, ...action.data});
      return {...action.data};
    default:
      return state;
  }
};

export default rootReducer;