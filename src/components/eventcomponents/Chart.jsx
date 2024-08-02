import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getRandomTask, warmWeatherTasks, mildWeatherTasks,coolWeatherTasks } from "./randomTask";

const getActivitySuggestions = (forecast) => {
  const activities = [];

  forecast.forEach((hourly) => {
    const { title, temp, date, icon } = hourly;
    let task;

    if (temp > 20) {
      task = getRandomTask(warmWeatherTasks);
      activities.push({
        text: `Perfect weather for ${task} at ${title}. Enjoy the sunshine!`,
        icon: icon,
        bgColor: "bg-green-100",
      });
    } else if (temp > 15) {
      task = getRandomTask(mildWeatherTasks);
      activities.push({
        text: `Ideal conditions for ${task} at ${title}. Embrace the mild breeze!`,
        icon: icon,
        bgColor: "bg-blue-100",
      });
    } else {
      task = getRandomTask(coolWeatherTasks);
      activities.push({
        text: ` ${task} at ${title}. Stay indoor Stay warm!`,
        icon: icon,
        bgColor: "bg-violet-100",
      });
    }
  });

  return activities;
};


export default function Chart({ weather, setActivities }) {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    if (weather) {
      if (weather.hourly) {
        setHourlyData(weather.hourly);
        setActivities(getActivitySuggestions(weather.hourly));
      }
    }
  }, [weather]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, icon, title } = payload[0].payload;
      const formattedDate = new Date(date).toLocaleString();
      return (
        <div className="bg-white border border-gray-200 p-2 rounded shadow-lg">
          <p className="text-gray-800 font-semibold">{formattedDate}</p>
          <div className="flex items-center">
            <img src={icon} alt="weather icon" className="w-8 h-8 mr-2" />
            <p className="text-gray-600">{title}</p>
          </div>
          <p className="text-gray-600">{`Temperature: ${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={hourlyData.map((hourly) => ({
              time: hourly.title,
              temperature: hourly.temp,
              date: hourly.date,
              icon: hourly.icon,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="time" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#8884d8"
              strokeWidth={3}
              dot={{ r: 6, fill: "#8884d8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
