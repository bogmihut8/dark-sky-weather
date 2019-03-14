const rootReducer = (state = {}, action) => {

   switch (action.type) {
    case 'FETCHED_DATA':
      const formated = new Date(action.data.currently.time * 1000);
      return {
        ...state,
        isLoading: false,
        time: action.data.currently.time,
        formated: formated,
        timezone: action.data.timezone,
        location: action.data.location,
        countryCode: action.data.countryCode,
        offset: action.data.offset,
        daily: {
            temperatureMax: action.data.daily.data[0].temperatureMax,
            temperatureMin: action.data.daily.data[0].temperatureMin,
            summary: action.data.daily.data[0].summary,
            icon: action.data.daily.data[0].icon,
            precipProbability: action.data.daily.data[0].precipProbability,
            windSpeed: action.data.daily.data[0].windSpeed,
            humidity: action.data.daily.data[0].humidity,
            sunriseTime: action.data.daily.data[0].sunriseTime,
            sunsetTime: action.data.daily.data[0].sunsetTime
        },
        hourly : {
          ...action.data.hourly
        }
      };
     case 'START_LOADING':
       return {
         ...state,
          isLoading: true,
          daily : null
       }
     case 'SET_DATE':
       const formatDate = new Date(action.data * 1000);
       return {
         ...state,
         date: action.data,
         formated: formatDate
       }
     case 'SET_LOCATION':
       return {
         ...state,
         ...action.data
       }
     case 'ERROR_OCC':
       return {
         ...state,
         isLoading: false,
         daily: null,
         err: action.data.err
       }
    default:
      return state;
  }
};

export default rootReducer;