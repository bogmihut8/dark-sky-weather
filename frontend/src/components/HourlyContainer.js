import React from "react";
import Hourly from "./Hourly";

const HourlyContainer = (list) => list.map(el => {
  const { time, icon, temperature } = el;
  
  return (
    <Hourly date={time} icon={icon} temperature={temperature} key={time}/>
  );
});

export default HourlyContainer;
