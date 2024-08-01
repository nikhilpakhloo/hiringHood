import React from "react";
import {
  FaCloud,
  FaWind,
  FaTachometerAlt,
  FaCloudRain,
  FaEye,
} from "react-icons/fa";

const weatherData = [
  { label: "Real Feel", icon: FaCloud, key: "feels_like", convert: true },
  { label: "Wind", icon: FaWind, key: "speed", convert: false },
  { label: "Pressure", icon: FaTachometerAlt, key: "pressure", convert: false },
  { label: "Humidity", icon: FaCloudRain, key: "humidity", convert: false },
  { label: "Visibility", icon: FaEye, key: "visibility", convert: false },
];

export default function WeatherDetails({ weather, unit }) {
  const getValue = (key, convert) => {
    const value = weather ? weather[key] : null;
    if (convert && key === "feels_like") {
      return convertTemperature(value, unit);
    }
    if (convert && key === "temp") {
      return convertTemperature(value, unit);
    }
    return value;
  };

  const convertTemperature = (temp, unit) => {
    if (unit === "metric") {
      return (temp - 273.15).toFixed(1); 
    } else if (unit === "imperial") {
      return (((temp - 273.15) * 9) / 5 + 32).toFixed(1);
    } else {
      return temp; 
    }
  };

  return (
    <div className="mt-4 w-full max-w-4xl p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="lg:text-2xl text-xl mb-4 text-center">Weather Details</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weatherData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-3 p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-2">
              <data.icon size={24} />
              <span>{data.label}</span>
            </div>
            <p>
              {data.key === "visibility"
                ? `${Math.round(getValue(data.key, data.convert) / 1000)} km`
                : getValue(data.key, data.convert)}
              {data.key === "feels_like" || data.key === "temp" ? `°${unit === "metric" ? "C" : "F"}` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
