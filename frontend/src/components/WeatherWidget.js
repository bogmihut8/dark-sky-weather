import React from 'react'
import WeatherIcon from 'react-icons-weather';

const WeatherWidget = ({data}) => {
  if(data.city) {
    return (
      <div className="widget">
				<h3 className="city">{data.city}</h3>
        <h4 className="country lighter">{data.timezone} &nbsp;&nbsp;|&nbsp;&nbsp; {new Date(data.currently.time * 1000).toLocaleDateString()}</h4>
        <h1 className="lighter temp"><WeatherIcon name="darksky" iconId={data.currently.icon}/>&nbsp;{parseInt(data.currently.temperature)}°C</h1>
        <p className="summary">{data.currently.summary}</p>
        <h4 className="country lighter">Precipitation: <b>{parseFloat(data.currently.precipProbability) * 100}%</b> &nbsp;&nbsp;|&nbsp;&nbsp; Humidity: <b>{parseFloat(data.currently.humidity) * 100}%</b> &nbsp;&nbsp;|&nbsp;&nbsp; Wind: <b>{data.currently.windSpeed} km/h</b> </h4>
      </div>
    );
  }
  else {
    return (
      <div className="widget">
        <p>No city selected :(</p>
      </div>
    );
  }
};

export default WeatherWidget;