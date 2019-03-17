import React from 'react'
import PropTypes from 'prop-types';
import WeatherIcon from 'react-icons-weather';

const Hourly = ({ date, icon, temperature, offset }) => {
  return (
    <div className="hourly">
				<p className="hour">{new Date((date + ((offset - 2) * 3600)) * 1000).getHours() + ":00"}</p>
        <WeatherIcon name="darksky" iconId={icon}/>
        <p className="temperature"><b>{parseInt(temperature)}°C</b></p>
      </div>
  );
};
  
Hourly.propTypes = {
  date: PropTypes.number,
  icon: PropTypes.string,
  temperature: PropTypes.number,
  offset: PropTypes.number
}

export default Hourly;