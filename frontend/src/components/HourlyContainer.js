import React from "react";
import Hourly from "./Hourly";

const HourlyContainer = (list, offset) => list.map(el => {
  const { time, icon, temperature } = el;
  
  return (
    <Hourly date={time} icon={icon} temperature={temperature} offset={offset} key={time}/>
  );
});

export default HourlyContainer;
