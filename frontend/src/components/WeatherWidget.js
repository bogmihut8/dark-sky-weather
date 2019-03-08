import React from 'react'
import WeatherIcon from 'react-icons-weather';

const WeatherWidget = ({data}) => {
  if(data.daily) {
    return (
      <div className="widget">
				<h3 className="city">{data.location}</h3>
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
           <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      );
    }
    else {
      return (
      <div></div>
      )
    }
  }
};

export default WeatherWidget;