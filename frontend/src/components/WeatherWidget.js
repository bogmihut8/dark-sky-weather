import React from 'react'

const WeatherWidget = ({data}) => {
  return (
      <div className="widget">
				<h3 className="city">{data.city}</h3>
        <h4 className="country lighter">{data.country} &nbsp;&nbsp;|&nbsp;&nbsp; {data.date}</h4>
        <h1 className="lighter temp">{data.temp} °C</h1>
        <p className="summary">{data.summary}</p>
      </div>
  );
};

export default WeatherWidget;