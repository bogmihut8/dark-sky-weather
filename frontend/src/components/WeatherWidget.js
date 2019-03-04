import React from 'react'

const WeatherWidget = ({data}) => {
  return (
      <div className="widget">
				<h3 className="city">{data.city}</h3>
        <h4 className="country lighter">{data.timezone} &nbsp;&nbsp;|&nbsp;&nbsp; {new Date(data.currently.time * 1000).toLocaleDateString()}</h4>
        <h1 className="lighter temp">{parseInt(data.currently.temperature)} °C</h1>
        <p className="summary">{data.currently.summary}</p>
      </div>
  );
};

export default WeatherWidget;