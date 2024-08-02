import React from "react";

import CurrentWeather from "../weathercomponents/CurrentWeather";
import TodayForecast from "../weathercomponents/TodayForecast";
import AirCondition from "../weathercomponents/AirCondition";
import UpcomingForecast from "../weathercomponents/UpcomingForecast";

export default function WeatherDashboard({ weather, unit }) {
  return (
    <>
      <h1 className="lg:text-4xl text-2xl text-center mt-4">
        Weather Description
      </h1>

      <div className="min-h-screen  lg:flex lg:space-x-10 justify-center lg:p-6 ">
        <div>
          <CurrentWeather weather={weather} unit={unit} />
          <TodayForecast weather={weather} unit={unit} />
          <AirCondition weather={weather} unit={unit} />
        </div>
        <UpcomingForecast weather={weather} unit={unit} />
      </div>
    </>
  );
}
