import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getActivitySuggestions = (forecast) => {
  const activities = [];
  forecast.forEach((hourly) => {
    const { title, temp, icon } = hourly;
    if (temp > 25) activities.push({ text: `Perfect weather for hiking at ${title}`, icon: "🥾", bgColor: "bg-green-100" });
    else if (temp > 20) activities.push({ text: `Great for a bike ride at ${title}`, icon: "🚴", bgColor: "bg-yellow-100" });
    else if (temp > 15) activities.push({ text: `Nice day for a run at ${title}`, icon: "🏃", bgColor: "bg-blue-100" });
    else activities.push({ text: `Consider indoor activities at ${title}`, icon: "🏠", bgColor: "bg-gray-100" });
  });
  return activities;
};

export default function Chart({ weather, setActivities }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (weather && weather.hourly) {
      setForecast(weather.hourly);
      setActivities(getActivitySuggestions(weather.hourly));
    }
  }, [weather, setActivities]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-2 rounded shadow-lg">
          <p className="text-gray-800 font-semibold">{label}</p>
          <p className="text-gray-600">{`Temperature: ${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={forecast.map(hourly => ({
          time: hourly.title,
          temperature: hourly.temp
        }))}>
          <defs>
            <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/>
          <XAxis dataKey="time" stroke="#8884d8"/>
          <YAxis stroke="#8884d8"/>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="url(#colorTemperature)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
