const rootReducer = (state = {}, action) => {
   switch (action.type) {
    case 'FETCHED_DATA':
      return {
        ...state,
        isLoading: false,
        time: action.data.currently.time,
        timezone: action.data.timezone,
        location: action.data.location,
        countryCode: action.data.countryCode,
        daily: {
            temperatureMax: action.data.daily.data[0].temperatureMax,
            temperatureMin: action.data.daily.data[0].temperatureMin,
            summary: action.data.daily.data[0].summary,
            icon: action.data.daily.data[0].icon,
            precipProbability: action.data.daily.data[0].precipProbability,
            windSpeed: action.data.daily.data[0].windSpeed,
            humidity: action.data.daily.data[0].humidity
          
        }
      };
     case 'START_LOADING':
       return {
         ...state,
          isLoading: true,
          daily : null
       }
     case 'SET_DATE':
       return {
         ...state,
         date: action.data
       }
     case 'SET_LOCATION':
       return {
         ...state,
         ...action.data
       }
    default:
      return state;
  }
};

export default rootReducer;