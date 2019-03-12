import React from 'react'
import PropTypes from 'prop-types';
import WeatherIcon from 'react-icons-weather';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import HourlyContainer from "./HourlyContainer";
import Arrow from "./Arrow";

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const WeatherWidget = ({data}) => {

  if(data.daily) {
    const hourly = HourlyContainer(data.hourly.data);
    return (
      <div className="widget">
				<h3 className="city">{data.location}, {data.countryCode}</h3>
        <h4 className="country lighter">
          <span>Timezone: <b>{data.timezone}</b></span>
          <span>Date: <b>{new Date(data.time * 1000).toLocaleDateString()}</b></span>
        </h4>
        <h1 className="lighter temp">
          <WeatherIcon name="darksky" iconId={data.daily.icon}/>
          <span>Max: <b>{parseInt(data.daily.temperatureMax)}°C</b></span>
          <span>Min: <b>{parseInt(data.daily.temperatureMin)}°C</b></span>
        </h1>
        <p className="summary">{data.daily.summary}</p>
        <h4 className="country lighter">
          <span>Precipitation: <b>{data.daily.precipProbability ? parseInt(data.daily.precipProbability * 100) : '0'}%</b></span>
          <span>Humidity: <b>{parseInt(data.daily.humidity * 100)}%</b></span>
          <span>Wind: <b>{data.daily.windSpeed} km/h</b></span>
        </h4>
        
        <div className="weather-hourly">
          <div className="weather-hourly-scroll">
            <ScrollMenu
              data={hourly}
              arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
            />
           </div>
        </div>
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