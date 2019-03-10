import React from 'react'
import PropTypes from 'prop-types';
import WeatherIcon from 'react-icons-weather';

const WeatherWidget = ({data}) => {
  if(data.daily) {
    return (
      <div className="widget">
				<h3 className="city">{data.location}, {data.countryCode}</h3>
        <h4 className="country lighter">Timezone: <b>{data.timezone}</b> &nbsp;&nbsp;|&nbsp;&nbsp; Date: <b>{new Date(data.time * 1000).toLocaleDateString()}</b></h4>
        <h1 className="lighter temp"><WeatherIcon name="darksky" iconId={data.daily.icon}/>&nbsp;Max: <b>{parseInt(data.daily.temperatureMax)}°C</b>&nbsp;Min: <b>{parseInt(data.daily.temperatureMin)}°C</b></h1>
        <p className="summary">{data.daily.summary}</p>
        <h4 className="country lighter">Precipitation: <b>{data.daily.precipProbability ? parseInt(data.daily.precipProbability * 100) : '0'}%</b> &nbsp;&nbsp;|&nbsp;&nbsp; Humidity: <b>{parseInt(data.daily.humidity * 100)}%</b> &nbsp;&nbsp;|&nbsp;&nbsp; Wind: <b>{data.daily.windSpeed} km/h</b> </h4>
      </div>
    );
  }
  else {
    if(data.isLoading) {
      return (
        <div className="loader">
           <div className="lds-ripple"><div></div><div></div></div>
        </div>
      );
    }
    else if(data.err){
      return (
      <div className="widget error"><span className="red">&#9888;</span> {data.err} <span className="red">&#9888;</span></div>
      )
    }
    else {
      return (
      <div></div>
      )
    }
  }
};

WeatherWidget.propTypes = {
  data: PropTypes.shape({
      location: PropTypes.string,
      countryCode: PropTypes.string,
      timezone: PropTypes.string,
      time: PropTypes.number,
      daily: PropTypes.shape({
        icon: PropTypes.string,
        temperatureMax: PropTypes.number,
        temperatureMin: PropTypes.number,
        summary: PropTypes.string,
        precipProbability: PropTypes.number,
        humidity: PropTypes.number,
        windSpeed: PropTypes.number
      })
    })
}

export default WeatherWidget;