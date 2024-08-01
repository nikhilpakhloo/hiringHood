import React from "react";

export default function CurrentWeather({ weather, unit }) {
  
  const convertTemperature = (temp, unit) => {
    if (unit === "metric") {
      return temp - 273.15; 
    } else if (unit === "imperial") {
      return ((temp - 273.15) * 9/5) + 32; 
    } else {
      return temp; 
    }
  };

  const currentTemp = weather ? convertTemperature(weather.temp, unit) : null;

  return (
    <div className="mt-4 w-full max-w-4xl p-6 bg-white shadow-lg rounded-2xl">
      <div className="w-full flex justify-between">
        <div className="space-y-10">
          <div className="space-y-3">
            <h1 className="text-2xl">
              {weather?.name}, {weather?.country}
            </h1>
            <p>{weather?.formattedLocalTime}</p>
          </div>

          <p className="text-5xl">
            {currentTemp !== null ? `${Math.floor(currentTemp)}°${unit === "metric" ? "C" : "F"}` : "N/A"}
          </p>
        </div>
        <div>
          <img
            src={weather?.icon}
            alt="weather icon"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      </div>
    </div>
  );
}
